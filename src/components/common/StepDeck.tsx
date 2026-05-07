import type { ReactNode } from "react";

type StepCard = {
  id: string;
  title: string;
  explanation: string;
  formula?: string;
  before?: string;
  after?: string;
  highlight?: string;
  extra?: ReactNode;
  defaultOpen?: boolean;
};

type StepDeckProps = {
  steps: StepCard[];
};

export function StepDeck({ steps }: StepDeckProps) {
  return (
    <div className="step-deck">
      {steps.map((step, index) => (
        <details
          className="step-card"
          key={step.id}
          open={step.defaultOpen ?? index === 0}
        >
          <summary>
            <span className="step-card__index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.explanation}</p>
            </div>
          </summary>
          <div className="step-card__body">
            {step.formula ? <code>{step.formula}</code> : null}
            {step.highlight ? (
              <p>
                <strong>Focus:</strong> {step.highlight}
              </p>
            ) : null}
            {step.before ? (
              <p>
                <strong>Before:</strong> {step.before}
              </p>
            ) : null}
            {step.after ? (
              <p>
                <strong>After:</strong> {step.after}
              </p>
            ) : null}
            {step.extra}
          </div>
        </details>
      ))}
    </div>
  );
}
