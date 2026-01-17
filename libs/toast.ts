import { showToast, type ToastOptions } from "nextjs-toast-notify";

const toastOptions: ToastOptions = {
  duration: 3000,
  position: "top-right"
};

const toast = {
  success: (message: string) => showToast.success(message, toastOptions),
  error: (message: string) => showToast.error(message, toastOptions),
  info: (message: string) => showToast.info(message, toastOptions),
  warning: (message: string) => showToast.warning(message, toastOptions)
};

export default toast;
