"use client";

import { useMemo, useState } from "react";

import { InfoNote } from "@/components/common/InfoNote";
import { SectionTitle } from "@/components/common/SectionTitle";
import { StepDeck } from "@/components/common/StepDeck";
import { ExchangeBoard } from "@/components/dh/ExchangeBoard";
import { visualizeDiffieHellman } from "@/lib/crypto/diffieHellman";

const DEFAULT_VALUES = {
  prime: 23,
  generator: 5,
  aliceSecret: 6,
  bobSecret: 15
};

export function DiffieHellmanWorkbench() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [submittedValues, setSubmittedValues] = useState(DEFAULT_VALUES);

  const visualizationState = useMemo(() => {
    try {
      return {
        error: "",
        result: visualizeDiffieHellman(submittedValues)
      };
    } catch (nextError) {
      return {
        error:
          nextError instanceof Error ? nextError.message : "Unable to visualize Diffie-Hellman.",
        result: null
      };
    }
  }, [submittedValues]);

  const { error, result } = visualizationState;

  return (
    <div className="workbench-page">
      <SectionTitle
        eyebrow="Diffie-Hellman"
        title="Shared secret exchange board"
        description="This page uses small values so the modular arithmetic stays readable. That is excellent for teaching and terrible for real security."
      />

      <InfoNote label="Warning" tone="warn">
        Small Diffie-Hellman numbers are only for learning. Real systems use very large groups and audited implementations.
      </InfoNote>

      <div className="panel-grid">
        <section className="panel">
          <h3>Learning inputs</h3>
          <div className="field-row">
            <label className="field">
              <span>Prime p</span>
              <input
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    prime: Number(event.target.value)
                  }))
                }
                type="number"
                value={values.prime}
              />
            </label>
            <label className="field">
              <span>Generator g</span>
              <input
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    generator: Number(event.target.value)
                  }))
                }
                type="number"
                value={values.generator}
              />
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <span>Alice private a</span>
              <input
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    aliceSecret: Number(event.target.value)
                  }))
                }
                type="number"
                value={values.aliceSecret}
              />
            </label>
            <label className="field">
              <span>Bob private b</span>
              <input
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    bobSecret: Number(event.target.value)
                  }))
                }
                type="number"
                value={values.bobSecret}
              />
            </label>
          </div>
          <button
            className="primary-button"
            onClick={() => setSubmittedValues(values)}
            type="button"
          >
            Visualize exchange
          </button>
        </section>

        <section className="panel panel--accent">
          <h3>Result snapshot</h3>
          {result ? (
            <>
              <p>
                <strong>Alice public value:</strong> <code>{result.alicePublic}</code>
              </p>
              <p>
                <strong>Bob public value:</strong> <code>{result.bobPublic}</code>
              </p>
              <p>
                <strong>Shared secret:</strong> <code>{result.sharedSecret}</code>
              </p>
              {result.notes.map((note) => (
                <InfoNote key={note} label="Context">
                  {note}
                </InfoNote>
              ))}
            </>
          ) : (
            <InfoNote label="Input problem" tone="warn">
              {error || "Enter valid integers to visualize the exchange."}
            </InfoNote>
          )}
        </section>
      </div>

      {result ? (
        <>
          <section className="panel">
            <h3>Two-party view</h3>
            <ExchangeBoard
              alicePublic={result.alicePublic}
              aliceSecret={result.input.aliceSecret}
              bobPublic={result.bobPublic}
              bobSecret={result.input.bobSecret}
              generator={result.input.generator}
              prime={result.input.prime}
              sharedSecret={result.sharedSecret}
            />
          </section>

          <section className="panel">
            <h3>Step-by-step explanation</h3>
            <StepDeck
              steps={result.steps.map((step) => ({
                id: step.id,
                title: step.title,
                explanation: step.explanation,
                formula: step.formula,
                before: step.before,
                after: step.after,
                highlight: step.highlight
              }))}
            />
          </section>
        </>
      ) : null}
    </div>
  );
}
