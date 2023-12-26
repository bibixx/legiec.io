import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const ClickableInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      {...props}
      className={cn(className, {
        "[&:not(:focus)]:cursor-pointer [&:not(:focus):not(:hover)]:border-transparent [&:not(:focus):not(:hover)]:shadow-none":
          props.value !== "",
      })}
    />
  )
);

ClickableInput.displayName = "ClickableInput";
