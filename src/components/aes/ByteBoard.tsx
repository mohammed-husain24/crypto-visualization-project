import type { AesStateMatrix } from "@/lib/crypto/aes";

type ByteBoardProps = {
  matrix: AesStateMatrix;
  label: string;
  highlight?: Array<[number, number]>;
};

export function ByteBoard({ matrix, label, highlight = [] }: ByteBoardProps) {
  const activeCells = new Set(highlight.map(([row, column]) => `${row}-${column}`));

  return (
    <div className="matrix-panel">
      <div className="matrix-panel__header">
        <strong>{label}</strong>
        <span>Rows shown as hexadecimal bytes</span>
      </div>
      <div className="byte-board" role="table" aria-label={label}>
        {matrix.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <span
              className={activeCells.has(`${rowIndex}-${columnIndex}`) ? "byte-cell byte-cell--active" : "byte-cell"}
              key={`${label}-${rowIndex}-${columnIndex}`}
            >
              {value}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
