export type AlgorithmSummary = {
  href: string;
  label: string;
  headline: string;
  description: string;
  note: string;
};

export const algorithmSummaries: AlgorithmSummary[] = [
  {
    href: "/studio/aes",
    label: "AES",
    headline: "A byte-grid lesson in modern block encryption",
    description:
      "Watch a 16-byte block move through SubBytes, ShiftRows, MixColumns, and AddRoundKey using a readable round timeline.",
    note: "Classroom demo only. Hand-written crypto code is for learning, not deployment."
  },
  {
    href: "/studio/des",
    label: "DES",
    headline: "A Feistel walk-through of a historical cipher",
    description:
      "Trace left and right halves across sixteen rounds, including expansion, XOR, S-box substitution, and permutation.",
    note: "DES matters historically, but it is obsolete for real-world security."
  },
  {
    href: "/studio/diffie-hellman",
    label: "Diffie-Hellman",
    headline: "A shared-secret story told with visible modular arithmetic",
    description:
      "Compare Alice and Bob side by side as they turn public values into the same shared secret.",
    note: "Small numbers are intentionally insecure so the math stays human-sized."
  }
];
