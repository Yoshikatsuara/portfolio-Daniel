interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-[0.875rem] font-mono font-medium tracking-[0.02em] uppercase text-text-muted border border-border rounded hover:border-accent hover:text-text-primary transition-colors duration-300 cursor-default ${className}`}>
      {children}
    </span>
  );
}
