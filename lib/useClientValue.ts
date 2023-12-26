import { useEffect, useMemo, useState } from "react";

export function useClientValue<T, U = T>(getValue: () => T, defaultValue: U) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [getValue]);

  return useMemo(
    () => (isClient ? getValue() : defaultValue),
    [defaultValue, getValue, isClient]
  );
}
