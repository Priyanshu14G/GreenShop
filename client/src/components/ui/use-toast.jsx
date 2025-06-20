import React, { createContext, useContext, useState, useCallback } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
//import { cn } from "@/lib/utils";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [toastContent, setToastContent] = useState({ title: "", description: "" });

  const showToast = useCallback(({ title, description }) => {
    setToastContent({ title, description });
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <ToastPrimitive.Root open={open} onOpenChange={setOpen}>
          <div className="group pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-md border bg-white p-4 text-sm shadow-lg dark:bg-gray-900">
            <div className="space-y-1">
              {toastContent.title && <ToastPrimitive.Title className="font-semibold text-gray-900 dark:text-white">{toastContent.title}</ToastPrimitive.Title>}
              {toastContent.description && <ToastPrimitive.Description className="text-sm text-gray-500 dark:text-gray-300">{toastContent.description}</ToastPrimitive.Description>}
            </div>
            <ToastPrimitive.Close className="ml-4 rounded-md p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </div>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className="fixed top-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
