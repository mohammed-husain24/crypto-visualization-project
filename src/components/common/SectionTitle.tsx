type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  level?: "h1" | "h2";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  level = "h1"
}: SectionTitleProps) {
  const HeadingTag = level;

  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <HeadingTag>{title}</HeadingTag>
      <p>{description}</p>
    </div>
  );
}
