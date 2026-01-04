"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog?.open) dialog?.showModal();
    return () => {
      if (dialog?.open) dialog?.close();
    };
  }, []);

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
        <dialog
          className="w-[80%] max-w-120 max-h-120 h-auto bg-white dark:bg-gray-900 relative flex flex-col items-center justify-center rounded-md shadow-md"
          onClose={onDismiss}
        >
          <button
            onClick={onDismiss}
            className="text-sm absolute top-4 right-4 hover:cursor-pointer"
          >
            X
          </button>
          {children}
        </dialog>
      </div>
    </>,
    document.getElementById("modal-root")!
  );
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4 w-full">{children}</div>;
}
