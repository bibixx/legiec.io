import { Slot } from "@radix-ui/react-slot";
import { useFormikContext } from "formik";
import { ReactNode } from "react";

interface FakeFormProps {
  children: ReactNode;
}
export const FakeForm = ({ children }: FakeFormProps) => {
  const { handleReset, handleSubmit } = useFormikContext();

  return (
    <Slot
      onKeyDown={(e) => {
        const target = e.target;

        if (!(target instanceof HTMLElement)) {
          return;
        }

        const tagName = target.tagName.toUpperCase();
        const validTagNames = ["INPUT", "TEXTAREA", "SELECT"];
        if (
          validTagNames.includes(tagName) &&
          e.key === "Enter" &&
          !e.shiftKey
        ) {
          e.preventDefault();
          handleSubmit();
        }
      }}
      onClick={(e) => {
        if (!(e.target instanceof Element)) {
          return;
        }

        const target = e.target.closest("button");
        if (target == null) {
          return;
        }

        const tagType = target.type;
        if (tagType === "submit") {
          e.preventDefault();
          handleSubmit();
          return;
        }

        if (tagType === "reset") {
          e.preventDefault();
          handleReset();
          return;
        }
      }}
    >
      {children}
    </Slot>
  );
};
