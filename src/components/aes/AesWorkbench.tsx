"use client";

import { useMemo, useState } from "react";

import { ByteBoard } from "@/components/aes/ByteBoard";
import { RoundBadgeRow } from "@/components/aes/RoundBadgeRow";
import { InfoNote } from "@/components/common/InfoNote";
import { SectionTitle } from "@/components/common/SectionTitle";
import { StepDeck } from "@/components/common/StepDeck";
import type { AesStep } from "@/lib/crypto/aes";
import { visualizeAes } from "@/lib/crypto/aes";

const DEFAULT_PLAINTEXT = "00112233445566778899AABBCCDDEEFF";
const DEFAULT_KEY = "000102030405060708090A0B0C0D0E0F";

function buildRoundStepCards(steps: AesStep[]) {
  return steps.map((step) => ({
    id: step.id,
    title: step.title,
    explanation: step.explanation,
    formula: step.formula,
    highlight: step.phase,
    extra: (
      <div className="step-card__matrix-grid">
        {step.before ? (
          <ByteBoard label="Before" matrix={step.before} highlight={step.highlight} />
        ) : null}
        {step.after ? (
          <ByteBoard label="After" matrix={step.after} highlight={step.highlight} />
        ) : null}
        {step.keyState ? (
          <ByteBoard label="Round key" matrix={step.keyState} />
        ) : null}
      </div>
    )
  }));
}

export function AesWorkbench() {
  const [plaintext, setPlaintext] = useState(DEFAULT_PLAINTEXT);
  const [key, setKey] = useState(DEFAULT_KEY);
  const [submittedPlaintext, setSubmittedPlaintext] = useState(DEFAULT_PLAINTEXT);
  const [submittedKey, setSubmittedKey] = useState(DEFAULT_KEY);
  const [activeRound, setActiveRound] = useState(0);

  const visualizationState = useMemo(() => {
    try {
      return {
        error: "",
        result: visualizeAes(submittedPlaintext, submittedKey)
      };
    } catch (nextError) {
      return {
        error: nextError instanceof Error ? nextError.message : "Unable to visualize AES.",
        result: null
      };
    }
  }, [submittedKey, submittedPlaintext]);

  const { error, result } = visualizationState;
  const visibleSteps = result?.steps.filter((step) => step.round === activeRound) ?? [];
  const roundNumbers = result
    ? Array.from(new Set(result.steps.map((step) => step.round))).sort((left, right) => left - right)
    : [];

  return (
    <div className="workbench-page">
      <SectionTitle
        eyebrow="AES"
        title="AES-128 walkthrough"
        description="This view focuses on one 16-byte block so every round stays inspectable. Use the default sample or enter a 32-character hexadecimal block and key."
      />

      <div className="panel-grid">
        <section className="panel">
          <h3>Input block</h3>
          <label className="field">
            <span>Plaintext block</span>
            <input
              onChange={(event) => setPlaintext(event.target.value.toUpperCase())}
              value={plaintext}
            />
          </label>
          <label className="field">
            <span>AES-128 key</span>
            <input onChange={(event) => setKey(event.target.value.toUpperCase())} value={key} />
          </label>
          <button
            className="primary-button"
            onClick={() => {
              setSubmittedPlaintext(plaintext);
              setSubmittedKey(key);
              setActiveRound(0);
            }}
            type="button"
          >
            Visualize AES
          </button>
          <p className="field-help">Expected format: 32 hex characters for both fields.</p>
        </section>

        <section className="panel panel--accent">
          <h3>Result snapshot</h3>
          {result ? (
            <>
              <p>
                <strong>Ciphertext:</strong> <code>{result.ciphertextHex}</code>
              </p>
              <p>
                <strong>Rounds shown:</strong> 0 through 10
              </p>
              {result.notes.map((note) => (
                <InfoNote key={note} label="Note">
                  {note}
                </InfoNote>
              ))}
            </>
          ) : (
            <InfoNote label="Input problem" tone="warn">
              {error || "Enter a valid block and key to see the AES state."}
            </InfoNote>
          )}
        </section>
      </div>

      {result ? (
        <>
          <section className="panel">
            <h3>Round selector</h3>
            <RoundBadgeRow
              activeRound={activeRound}
              onSelect={setActiveRound}
              rounds={roundNumbers}
            />
          </section>

          <section className="panel">
            <h3>Selected round steps</h3>
            <StepDeck steps={buildRoundStepCards(visibleSteps)} />
          </section>
        </>
      ) : null}
    </div>
  );
}
