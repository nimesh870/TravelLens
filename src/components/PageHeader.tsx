import { motion } from "framer-motion";

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
  highlight?: string;
}

const PageHeader = ({ tag, title, subtitle, highlight }: PageHeaderProps) => {
  return (
    <div className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm tracking-widest text-primary uppercase mb-4 block"
        >
          {tag}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4"
        >
          {title}{" "}
          {highlight && <span className="italic text-gradient">{highlight}</span>}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default PageHeader;
