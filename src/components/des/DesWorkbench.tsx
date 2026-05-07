"use client";

import { useMemo, useState } from "react";

import { InfoNote } from "@/components/common/InfoNote";
import { SectionTitle } from "@/components/common/SectionTitle";
import { StepDeck } from "@/components/common/StepDeck";
import { FeistelTrack } from "@/components/des/FeistelTrack";
import { visualizeDes } from "@/lib/crypto/des";

const DEFAULT_INPUT = "0123456789ABCDEF";
const DEFAULT_KEY = "133457799BBCDFF1";

export function DesWorkbench() {
  const [plaintext, setPlaintext] = useState(DEFAULT_INPUT);
  const [key, setKey] = useState(DEFAULT_KEY);
  const [submittedPlaintext, setSubmittedPlaintext] = useState(DEFAULT_INPUT);
  const [submittedKey, setSubmittedKey] = useState(DEFAULT_KEY);

  const visualizationState = useMemo(() => {
    try {
      return {
        error: "",
        result: visualizeDes(submittedPlaintext, submittedKey)
      };
    } catch (nextError) {
      return {
        error: nextError instanceof Error ? nextError.message : "Unable to visualize DES.",
        result: null
      };
    }
  }, [submittedKey, submittedPlaintext]);

  const { error, result } = visualizationState;

  return (
    <div className="workbench-page">
      <SectionTitle
        eyebrow="DES"
        title="DES Feistel studio"
        description="The goal here is to make the left and right halves visible across the full 16-round flow, not to present DES as a recommended cipher."
      />

      <InfoNote label="Warning" tone="warn">
        DES is obsolete for real security. This page exists to explain the Feistel structure and the history of block cipher design.
      </InfoNote>

      <div className="panel-grid">
        <section className="panel">
          <h3>Input values</h3>
          <label className="field">
            <span>64-bit plaintext</span>
            <input
              onChange={(event) => setPlaintext(event.target.value.toUpperCase())}
              value={plaintext}
            />
          </label>
          <label className="field">
            <span>64-bit key</span>
            <input onChange={(event) => setKey(event.target.value.toUpperCase())} value={key} />
          </label>
          <button
            className="primary-button"
            onClick={() => {
              setSubmittedPlaintext(plaintext);
              setSubmittedKey(key);
            }}
            type="button"
          >
            Visualize DES
          </button>
          <p className="field-help">Expected format: 16 hex characters for the block and key.</p>
        </section>

        <section className="panel panel--accent">
          <h3>Result snapshot</h3>
          {result ? (
            <>
              <p>
                <strong>Initial permutation:</strong> <code>{result.initialPermutation}</code>
              </p>
              <p>
                <strong>Ciphertext:</strong> <code>{result.ciphertextHex}</code>
              </p>
              {result.notes.map((note) => (
                <InfoNote key={note} label="Context">
                  {note}
                </InfoNote>
              ))}
            </>
          ) : (
            <InfoNote label="Input problem" tone="warn">
              {error || "Enter a valid block and key to see the Feistel rounds."}
            </InfoNote>
          )}
        </section>
      </div>

      {result ? (
        <>
          <section className="panel">
            <h3>Round flow</h3>
            <div className="feistel-grid">
              {result.rounds.map((round) => (
                <FeistelTrack key={round.round} round={round} />
              ))}
            </div>
          </section>

          <section className="panel">
            <h3>Step-by-step reading guide</h3>
            <StepDeck
              steps={[
                {
                  id: "initial-permutation",
                  title: "Initial permutation reshuffles the incoming bits",
                  explanation:
                    "DES starts by reordering the 64-bit block according to a fixed table before splitting it into left and right halves.",
                  after: result.initialPermutation,
                  highlight: "Initial permutation",
                  defaultOpen: true
                },
                ...result.rounds.map((round) => ({
                  id: `round-${round.round}`,
                  title: round.title,
                  explanation: round.explanation,
                  formula: round.formula,
                  before: round.before,
                  after: round.after,
                  highlight: `Round ${round.round}`
                })),
                {
                  id: "final-permutation",
                  title: "Final permutation produces the ciphertext block",
                  explanation:
                    "After the last swap, DES applies a final fixed permutation to create the output block.",
                  after: result.finalPermutation,
                  highlight: "Final permutation"
                }
              ]}
            />
          </section>
        </>
      ) : null}
    </div>
  );
}
