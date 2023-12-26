import { openToast } from "@/components/Toaster/Toaster.hooks";
import { useCallback, useTransition } from "react";
import { PromiseWithResolvers, Result } from "./utils";

export const useGracefulTransition = <U, T extends Result<U, string>>(): [
  boolean,
  (callback: () => T | Promise<T>) => Promise<T>
] => {
  const [isLoading, _startTransition] = useTransition();

  const startTransition = useCallback((callback: () => T | Promise<T>) => {
    const { promise, reject, resolve } = new PromiseWithResolvers<T>();

    const safeCallback = async () => {
      try {
        const result = await callback();

        if (result.ok) {
          resolve(result);
          return;
        }

        throw new Error(result.error);
      } catch (error) {
        const description = error instanceof Error ? error.message : undefined;

        openToast({
          title: `Oops! Something went wrong`,
          description,
          variant: "destructive",
        });
      }
    };

    _startTransition(safeCallback as any);

    return promise;
  }, []);

  return [isLoading, startTransition];
};
