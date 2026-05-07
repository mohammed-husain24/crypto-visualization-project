import { InfoNote } from "@/components/common/InfoNote";
import { AlgorithmShelf } from "@/components/home/AlgorithmShelf";
import { HeroPanel } from "@/components/home/HeroPanel";

export default function HomePage() {
  return (
    <div className="page-stack">
      <HeroPanel />

      <section className="page-section">
        <div className="section-title">
          <span className="eyebrow">What this project does</span>
          <h2>Three algorithm stories, each with its own visual language</h2>
          <p>
            AES is shown as a byte matrix, DES as a Feistel flow, and Diffie-Hellman as a two-party exchange.
            The point is not to overwhelm a learner with every corner case, but to make each major transformation visible.
          </p>
        </div>
        <AlgorithmShelf />
      </section>

      <section className="page-section note-grid">
        <InfoNote label="Honesty">
          This project explains cryptographic ideas. It does not claim to be a secure browser encryption suite.
        </InfoNote>
        <InfoNote label="DES warning" tone="warn">
          DES appears here because its structure is worth studying. It is not recommended for protecting modern data.
        </InfoNote>
        <InfoNote label="Toy math" tone="warn">
          The Diffie-Hellman defaults use tiny numbers so the arithmetic fits on the screen. They are insecure by design.
        </InfoNote>
      </section>
    </div>
  );
}
