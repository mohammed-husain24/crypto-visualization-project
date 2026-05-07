import type { ReactNode } from "react";

type InfoNoteProps = {
  label: string;
  tone?: "default" | "warn";
  children: ReactNode;
};

export function InfoNote({ label, tone = "default", children }: InfoNoteProps) {
  return (
    <aside className={`info-note info-note--${tone}`}>
      <span className="info-note__label">{label}</span>
      <p>{children}</p>
    </aside>
  );
}
