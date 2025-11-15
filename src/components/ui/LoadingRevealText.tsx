import { motion } from "framer-motion";

const LoadingRevealText = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className={`loading-text ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default LoadingRevealText;
