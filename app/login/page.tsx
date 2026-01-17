import LoginForm from "@/components/forms/LoginForm";
import * as motion from "motion/react-client";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center md:bg-primary">
      <motion.div
        initial={{ y: -10, opacity: 0, transitionDelay: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}
