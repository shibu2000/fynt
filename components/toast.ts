// This is a global toast controller used by the App
type ToastType = "success" | "error" | "info";

type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
};

let showToastInternal: ((opts: ToastOptions) => void) | null = null;

// Provider will register this callback
export const registerToast = (cb: (opts: ToastOptions) => void) => {
  showToastInternal = cb;
};

export const toast = {
  show: (opts: ToastOptions) => {
    showToastInternal?.(opts);
  },
  success: (message: string, duration = 2000) => {
    showToastInternal?.({ message, type: "success", duration });
  },
  error: (message: string, duration = 2000) => {
    showToastInternal?.({ message, type: "error", duration });
  },
  info: (message: string, duration = 2000) => {
    showToastInternal?.({ message, type: "info", duration });
  },
};
