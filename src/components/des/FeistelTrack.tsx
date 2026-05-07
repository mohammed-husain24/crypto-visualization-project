import { HalfBlockView } from "@/components/des/HalfBlockView";
import type { DesRoundStep } from "@/lib/crypto/des";

type FeistelTrackProps = {
  round: DesRoundStep;
};

export function FeistelTrack({ round }: FeistelTrackProps) {
  return (
    <div className="feistel-track">
      <div className="feistel-track__headline">
        <strong>{round.title}</strong>
        <span>{round.highlight}</span>
      </div>
      <div className="feistel-track__halves">
        <HalfBlockView label="Left half" value={round.left} />
        <HalfBlockView label="Right half" value={round.right} />
      </div>
      <div className="feistel-track__steps">
        <div>
          <span>Expanded right</span>
          <code>{round.expandedRight}</code>
        </div>
        <div>
          <span>Subkey</span>
          <code>{round.subKey}</code>
        </div>
        <div>
          <span>XOR result</span>
          <code>{round.xorWithKey}</code>
        </div>
        <div>
          <span>S-box output</span>
          <code>{round.sBoxOutput}</code>
        </div>
        <div>
          <span>P-box output</span>
          <code>{round.permutationOutput}</code>
        </div>
      </div>
    </div>
  );
}
