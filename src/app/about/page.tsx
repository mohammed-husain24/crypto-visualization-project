import { InfoNote } from "@/components/common/InfoNote";
import { SectionTitle } from "@/components/common/SectionTitle";

export default function AboutPage() {
  return (
    <div className="page-stack">
      <SectionTitle
        eyebrow="About"
        title="Why this project exists"
        description="Cipher Atlas is a student-friendly app for explaining what happens inside major cryptographic ideas without pretending to be a security product."
      />

      <section className="panel-grid">
        <article className="panel">
          <h3>Architecture</h3>
          <p>
            The algorithm logic lives in pure functions under <code>src/lib/crypto</code>.
            UI components render the returned step data and keep the calculations out of the view layer.
          </p>
        </article>
        <article className="panel">
          <h3>Scope</h3>
          <p>
            The first version covers AES, DES, and Diffie-Hellman with readable defaults, visual step cards, and input validation aimed at classroom explanation.
          </p>
        </article>
      </section>

      <section className="page-section note-grid">
        <InfoNote label="Educational use">
          Teaching code often chooses readability over performance, side-channel resistance, and hardened error handling.
        </InfoNote>
        <InfoNote label="Production reminder" tone="warn">
          If you need secure cryptography in a real application, use audited libraries or platform APIs such as Web Crypto instead of hand-written demo logic.
        </InfoNote>
      </section>
    </div>
  );
}
