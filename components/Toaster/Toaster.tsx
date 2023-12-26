"use client";
import { ReactNode, useMemo, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Slot } from "@radix-ui/react-slot";
import { ToastData, useToasterState } from "./Toaster.hooks";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";
import { useElementHeight } from "@/lib/useElementHeight";
import { cn } from "@/lib/utils";

export const Toaster = () => {
  const { toasts, closeToast } = useToasterState();
  const [toastHeights, setToastHeights] = useState<
    Record<string, number | undefined>
  >({});
  const reversedToasts = useMemo(() => [...toasts].reverse(), [toasts]);

  return (
    <>
      <ToastProvider swipeDirection="right">
        <TransitionGroup component={null}>
          {reversedToasts
            .slice(0, 3)
            .map(
              (
                {
                  id,
                  nodeRef,
                  title,
                  description,
                  action,
                  onOpenChange,
                  className,
                  style,
                  ...toast
                },
                i
              ) => {
                const offsetY =
                  getPreviousHeights(reversedToasts, i, toastHeights) + i * 8;

                return (
                  <CSSTransition
                    key={id}
                    nodeRef={nodeRef}
                    unmountOnExit
                    addEndListener={(done: () => void) => {
                      nodeRef.current?.addEventListener(
                        "transitionend",
                        (e) => {
                          if (e.target === nodeRef.current) {
                            done();
                          }
                        },
                        false
                      );
                    }}
                    classNames={{
                      enter: cn("-translate-y-full"),
                      enterActive: cn(
                        "transition-all !translate-y-[--offset-y]"
                      ),
                      enterDone: cn("transition-all translate-y-[--offset-y]"),

                      exit: cn("translate-y-[--offset-y] opacity-100"),
                      exitActive: cn(
                        "transition-all translate-x-[calc(-50%+2rem)] !opacity-0"
                      ),
                    }}
                  >
                    <HeightObservedToast
                      onHeightChange={(height) => {
                        setToastHeights((heights) => ({
                          ...heights,
                          [id]: height,
                        }));
                      }}
                    >
                      <Toast
                        ref={(ref) => {
                          nodeRef.current = ref ?? undefined;
                        }}
                        style={cssVariable({
                          "--offset-y": `${16 + offsetY}px`,
                          ...style,
                        })}
                        className={cn(
                          "fixed top-0 left-1/2 z-[100] max-w-[420px]",
                          `-translate-x-1/2`,
                          className
                        )}
                        onOpenChange={(open) => {
                          onOpenChange?.(open);

                          if (!open) {
                            closeToast(id);
                          }
                        }}
                        forceMount
                        {...toast}
                      >
                        <div className="grid gap-1">
                          {title && <ToastTitle>{title}</ToastTitle>}
                          {description && (
                            <ToastDescription>{description}</ToastDescription>
                          )}
                        </div>
                        {action}
                        <ToastClose />
                      </Toast>
                    </HeightObservedToast>
                  </CSSTransition>
                );
              }
            )}
        </TransitionGroup>

        <ToastViewport />
      </ToastProvider>
    </>
  );
};

interface HeightObservedToastProps {
  children: ReactNode;
  onHeightChange: (height: number) => void;
}
const HeightObservedToast = ({
  children,
  onHeightChange,
}: HeightObservedToastProps) => {
  const ref = useRef<HTMLElement | null>(null);
  useElementHeight(onHeightChange, ref);

  return <Slot ref={ref}>{children}</Slot>;
};

function getPreviousHeights(
  toasts: ToastData[],
  i: number,
  toastHeights: Record<string, number | undefined>
) {
  return toasts
    .slice(0, i)
    .reduce((acc, t) => acc + (toastHeights[t.id] ?? 0), 0);
}

function cssVariable(styles: Record<string, any>) {
  return styles as React.CSSProperties;
}
