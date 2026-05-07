type HalfBlockViewProps = {
  label: string;
  value: string;
};

export function HalfBlockView({ label, value }: HalfBlockViewProps) {
  return (
    <div className="half-block">
      <span>{label}</span>
      <code>{value}</code>
    </div>
  );
}
