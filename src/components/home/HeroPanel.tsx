import Link from "next/link";

export function HeroPanel() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow">Original classroom build</span>
        <h1>See cryptography as a sequence of transformations, not a black box.</h1>
        <p>
          Cipher Atlas turns block ciphers and key exchange into visible steps with cards,
          grids, formulas, and plain-language notes that a student can explain out loud.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href="/studio">
            Open the studio
          </Link>
          <Link className="secondary-button" href="/about">
            Read the project notes
          </Link>
        </div>
      </div>
      <div className="hero-board">
        <div className="hero-board__grid">
          <div>
            <span>Block view</span>
            <strong>4 x 4 byte state</strong>
          </div>
          <div>
            <span>Feistel view</span>
            <strong>L / R round flow</strong>
          </div>
          <div>
            <span>Exchange view</span>
            <strong>Alice + Bob + shared secret</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
