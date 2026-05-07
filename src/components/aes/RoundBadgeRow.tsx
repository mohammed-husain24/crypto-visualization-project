type RoundBadgeRowProps = {
  rounds: number[];
  activeRound: number;
  onSelect: (round: number) => void;
};

export function RoundBadgeRow({ rounds, activeRound, onSelect }: RoundBadgeRowProps) {
  return (
    <div className="round-badge-row" role="tablist" aria-label="AES rounds">
      {rounds.map((round) => (
        <button
          aria-pressed={round === activeRound}
          className={round === activeRound ? "round-pill round-pill--active" : "round-pill"}
          key={round}
          onClick={() => onSelect(round)}
          type="button"
        >
          {round === 0 ? "Round 0" : `Round ${round}`}
        </button>
      ))}
    </div>
  );
}
