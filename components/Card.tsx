// Brand spec card: orange BOTTOM border, generous interior, no SaaS aesthetic.
// Variants: default white, warm cream surface for layered sections.

interface CardProps {
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
  variant?: "white" | "warm";
  children?: React.ReactNode;
}

export function Card({
  eyebrow,
  title,
  body,
  className = "",
  variant = "white",
  children,
}: CardProps) {
  const surface = variant === "warm" ? "card card--warm" : "card";
  return (
    <article className={`${surface} ${className}`}>
      {eyebrow && <p className="eyebrow mb-2.5">{eyebrow}</p>}
      <h3 className="font-sans text-bark text-lg leading-snug font-medium mb-2">
        {title}
      </h3>
      <p className="text-mid text-sm leading-relaxed">{body}</p>
      {children}
    </article>
  );
}
