type ExchangeBoardProps = {
  prime: number;
  generator: number;
  aliceSecret: number;
  bobSecret: number;
  alicePublic: number;
  bobPublic: number;
  sharedSecret: number;
};

export function ExchangeBoard({
  prime,
  generator,
  aliceSecret,
  bobSecret,
  alicePublic,
  bobPublic,
  sharedSecret
}: ExchangeBoardProps) {
  return (
    <div className="exchange-board">
      <div className="exchange-board__public">
        <span>Shared public values</span>
        <strong>
          p = {prime}, g = {generator}
        </strong>
      </div>
      <article className="exchange-card">
        <h3>Alice</h3>
        <p>Private a = {aliceSecret}</p>
        <p>Public A = {alicePublic}</p>
      </article>
      <div className="exchange-board__center">
        <span>Public exchange</span>
        <strong>A ↔ B</strong>
      </div>
      <article className="exchange-card">
        <h3>Bob</h3>
        <p>Private b = {bobSecret}</p>
        <p>Public B = {bobPublic}</p>
      </article>
      <div className="exchange-board__secret">
        <span>Shared secret</span>
        <strong>{sharedSecret}</strong>
      </div>
    </div>
  );
}
