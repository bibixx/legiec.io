"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { resetLinks } from "./serverActions";
import { Loader2 } from "lucide-react";

export const ResetButton = () => {
  const [isLoading, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      disabled={isLoading}
      onClick={() => {
        startTransition(async () => {
          await resetLinks({});
        });
      }}
    >
      Reset data
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};
