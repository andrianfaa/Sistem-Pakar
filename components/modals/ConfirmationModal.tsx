import * as motion from "motion/react-client";

type ConfirmationModalProps = {
  onClose?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  title?: string;
  text?: string;
  confirmButtonText?: string;
  confirmButtonStyle?: "danger" | "primary";
};

export default function ConfirmationModal({
  onClose,
  onConfirm,
  isLoading = false,
  title = "Are you sure?",
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  confirmButtonText = "Done",
  confirmButtonStyle = "primary"
}: ConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center-safe bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md md:w-md md:max-w-xl lg:w-xl rounded-lg bg-white p-6 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
              {title}
            </h2>
          </div>

          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">{text}</p>
        </div>

        <footer className="mt-2 flex justify-end gap-2">
          <button
            title="Cancel"
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
            onClick={onClose}
            disabled={isLoading}
            autoFocus
          >
            Cancel
          </button>

          <button
            title="Confirm"
            type="submit"
            className={`rounded px-4 py-2 text-sm font-medium text-white transition-colors ${
              confirmButtonStyle === "danger"
                ? "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300"
                : "bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary-dark"
            }`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmButtonText}
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
