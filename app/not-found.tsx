import * as motion from "motion/react-client";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="container min-h-[calc(100vh-5rem)] flex items-center justify-center py-8 text-center">
        <div className="w-full max-w-md text-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto size-20 text-heading"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            ></path>
          </svg>

          <h2 className="mt-6 text-2xl font-bold text-heading">404 - Page Not Found</h2>

          <p className="mt-4 text-pretty text-gray-700">Oops! The page you&apos;re looking for doesn&apos; exist.</p>

          <Link
            href="/"
            className="inline-block rounded-sm border border-primary bg-primary text-sm shadow-sm font-medium text-white hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:pointer-events-none
            mt-6 px-8 py-3"
            title="Go back to home page"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
