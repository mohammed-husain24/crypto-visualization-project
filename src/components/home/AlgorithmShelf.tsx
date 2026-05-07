import Link from "next/link";

import { algorithmSummaries } from "@/lib/content/algorithms";

export function AlgorithmShelf() {
  return (
    <section className="algorithm-shelf">
      {algorithmSummaries.map((algorithm) => (
        <article className="algorithm-card" key={algorithm.href}>
          <span className="algorithm-card__label">{algorithm.label}</span>
          <h2>{algorithm.headline}</h2>
          <p>{algorithm.description}</p>
          <small>{algorithm.note}</small>
          <Link href={algorithm.href}>Explore {algorithm.label}</Link>
        </article>
      ))}
    </section>
  );
}
