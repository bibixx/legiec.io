"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-slate-950 px-3 py-1.5 text-xs text-slate-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type TooltipProps = Omit<
  TooltipPrimitive.TooltipProps &
    Pick<
      TooltipPrimitive.TooltipContentProps,
      | "aria-label"
      | "onEscapeKeyDown"
      | "onPointerDownOutside"
      | "forceMount"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "avoidCollisions"
      | "collisionBoundary"
      | "collisionPadding"
      | "arrowPadding"
      | "sticky"
      | "hideWhenDetached"
    >,
  "asChild" | "children"
> & {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  allowSelect?: boolean;
};
const Tooltip = (props: TooltipProps) => {
  const rootProps = {
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
    delayDuration: props.delayDuration,
    disableHoverableContent: props.disableHoverableContent,
  };
  const contentProps = {
    ["aria-label"]: props["aria-label"],
    onEscapeKeyDown: props.onEscapeKeyDown,
    onPointerDownOutside: props.onPointerDownOutside,
    forceMount: props.forceMount,
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: props.avoidCollisions,
    collisionBoundary: props.collisionBoundary,
    collisionPadding: props.collisionPadding,
    arrowPadding: props.arrowPadding,
    sticky: props.sticky,
    hideWhenDetached: props.hideWhenDetached,
  };

  return (
    <TooltipRoot {...rootProps}>
      <TooltipContent
        {...contentProps}
        className={cn(props.className, { "select-none": !props.allowSelect })}
      >
        {props.content}
      </TooltipContent>
      <TooltipTrigger asChild>{props.children}</TooltipTrigger>
    </TooltipRoot>
  );
};

export { Tooltip, TooltipProvider };
