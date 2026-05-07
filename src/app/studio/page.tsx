import Link from "next/link";

import { SectionTitle } from "@/components/common/SectionTitle";
import { algorithmSummaries } from "@/lib/content/algorithms";

export default function StudioPage() {
  return (
    <div className="page-stack">
      <SectionTitle
        eyebrow="Studio"
        title="Choose the algorithm you want to unpack"
        description="Each lab focuses on a different shape of reasoning: matrix transforms, Feistel rounds, or shared-secret exchange."
      />

      <section className="algorithm-shelf">
        {algorithmSummaries.map((algorithm) => (
          <article className="algorithm-card algorithm-card--wide" key={algorithm.href}>
            <span className="algorithm-card__label">{algorithm.label}</span>
            <h2>{algorithm.headline}</h2>
            <p>{algorithm.description}</p>
            <small>{algorithm.note}</small>
            <Link href={algorithm.href}>Open the {algorithm.label} lab</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
