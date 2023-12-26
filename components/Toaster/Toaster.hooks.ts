import { createRef, MutableRefObject } from "react";
import { create } from "zustand";
import { ToastActionElement, ToastProps } from "../ui/toast";

export type ToastData = Omit<ToastProps, "forceMount"> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  nodeRef: MutableRefObject<HTMLElement | undefined>;
};

export type ArgumentToastData = Omit<ToastData, "id" | "nodeRef"> & {
  id?: string;
};

interface ToasterStore {
  toasts: ToastData[];
  openToast: (toast: ArgumentToastData) => string;
  closeToast: (toastId: string) => void;
}

export const useToasterState = create<ToasterStore>((set) => ({
  toasts: [],
  openToast: (toast) => {
    const toastId = toast.id ?? generateUID();

    set((state) => {
      const toasts = state.toasts;
      const alreadyExistingToastIndex = toasts.findIndex(
        ({ id }) => id === toastId
      );
      const newToast = {
        ...toast,
        id: toastId,
        nodeRef: createMutableRef<HTMLElement | undefined>(),
      };

      if (alreadyExistingToastIndex >= 0) {
        return {
          toasts: [
            ...toasts.slice(0, alreadyExistingToastIndex),
            newToast,
            ...toasts.slice(alreadyExistingToastIndex + 1),
          ],
        };
      }

      return { toasts: [...toasts, newToast] };
    });

    return toastId;
  },
  closeToast: (toastId) => {
    set((state) => ({
      toasts: state.toasts.filter(({ id }) => id !== toastId),
    }));
  },
}));

export const openToast = (toast: ArgumentToastData) =>
  useToasterState.getState().openToast(toast);
export const closeToast = (toastId: string) =>
  useToasterState.getState().closeToast(toastId);

function createMutableRef<T>() {
  return createRef<T>() as MutableRefObject<T>;
}

export function generateUID() {
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const firstPartString = ("000" + firstPart.toString(36)).slice(-3);
  const secondPartString = ("000" + secondPart.toString(36)).slice(-3);

  return firstPartString + secondPartString;
}
