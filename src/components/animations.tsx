import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// Reusable animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Scroll-triggered fade up section
export const FadeUpSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUp}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scroll-triggered stagger container for grids/lists
export const StaggerSection = ({
  children,
  className = "",
  slow = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={slow ? staggerContainerSlow : staggerContainer}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual stagger child item
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={fadeUp}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale-in item (good for cards)
export const ScaleItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={scaleIn}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Page transition wrapper
export const PageTransition = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);
