"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminDeleteButtonProps {
  label?: string;
  onConfirm?: () => void;
}

export function AdminDeleteButton({
  label = "Delete",
  onConfirm,
}: AdminDeleteButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-flex items-center gap-2">
      {open ? (
        <>
          <span className="text-xs text-muted">Sure?</span>
          <Button
            size="sm"
            variant="destructive"
            type="button"
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          size="sm"
          variant="outline"
          type="button"
          className="text-red-600 hover:bg-red-50"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="size-4" />
          <span className="ml-1">{label}</span>
        </Button>
      )}
    </div>
  );
}
