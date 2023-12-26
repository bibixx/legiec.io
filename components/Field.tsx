import { useField } from "formik";
import { Input, InputProps } from "./ui/input";
import { Checkbox, CheckboxProps } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Tooltip } from "./ui/tooltip";

interface InputFieldProps extends InputProps {
  name: string;
  showErrorWhenTouched?: boolean;
  component?: React.FC<InputProps>;
}
export const InputField = ({
  name,
  className,
  component: Component = Input,
  showErrorWhenTouched = true,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(name);
  const shouldShowError = showErrorWhenTouched
    ? meta.error && meta.touched
    : meta.error;

  return (
    <div className="relative">
      <Component
        {...props}
        {...field}
        className={cn(className, {
          "pr-9": shouldShowError,
          "border-red-500": shouldShowError,
        })}
      />
      <Tooltip content={meta.error} delayDuration={0} sideOffset={-4}>
        <div
          className={cn(
            "absolute right-0 top-0 h-9 w-9 inline-flex items-center justify-center rounded-md transition-all text-red-500 cursor-help opacity-0 invisible",
            {
              "opacity-100 visible": shouldShowError,
            }
          )}
        >
          <AlertTriangle className="w-4 h-4" />
        </div>
      </Tooltip>
    </div>
  );
};

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
}
export const CheckboxField = ({ name, ...props }: CheckboxFieldProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Checkbox
      {...props}
      {...field}
      checked={field.value ?? false}
      onCheckedChange={(state: boolean) => helpers.setValue(state)}
    />
  );
};
