import { isPrime } from "@/lib/utils";

export type DiffieHellmanStep = {
  id: string;
  title: string;
  explanation: string;
  formula?: string;
  before?: string;
  after?: string;
  highlight?: string;
};

export type DiffieHellmanInput = {
  prime: number;
  generator: number;
  aliceSecret: number;
  bobSecret: number;
};

export type DiffieHellmanVisualization = {
  input: DiffieHellmanInput;
  alicePublic: number;
  bobPublic: number;
  sharedSecret: number;
  notes: string[];
  steps: DiffieHellmanStep[];
};

function modPow(base: number, exponent: number, modulus: number): number {
  let result = 1;
  let current = ((base % modulus) + modulus) % modulus;
  let power = exponent;

  while (power > 0) {
    if (power % 2 === 1) {
      result = (result * current) % modulus;
    }

    current = (current * current) % modulus;
    power = Math.floor(power / 2);
  }

  return result;
}

export function visualizeDiffieHellman(
  input: DiffieHellmanInput
): DiffieHellmanVisualization {
  const { prime, generator, aliceSecret, bobSecret } = input;

  if (!Number.isInteger(prime) || prime < 5) {
    throw new Error("Choose a prime number p that is at least 5.");
  }

  if (!isPrime(prime)) {
    throw new Error("Prime p must actually be prime. Composite values are not valid for this Diffie-Hellman demo.");
  }

  if (!Number.isInteger(generator) || generator <= 1 || generator >= prime) {
    throw new Error("Choose a generator g between 2 and p - 1.");
  }

  if (!Number.isInteger(aliceSecret) || aliceSecret <= 0) {
    throw new Error("Alice's private value must be a positive integer.");
  }

  if (!Number.isInteger(bobSecret) || bobSecret <= 0) {
    throw new Error("Bob's private value must be a positive integer.");
  }

  const alicePublic = modPow(generator, aliceSecret, prime);
  const bobPublic = modPow(generator, bobSecret, prime);
  const aliceShared = modPow(bobPublic, aliceSecret, prime);
  const bobShared = modPow(alicePublic, bobSecret, prime);

  if (aliceShared !== bobShared) {
    throw new Error("The shared secret check failed for this toy example.");
  }

  const notes = [
    "These values are intentionally tiny so students can verify the arithmetic by hand.",
    "Real deployments use large primes and audited libraries, not hand-written browser demos."
  ];

  const steps: DiffieHellmanStep[] = [
    {
      id: "public-setup",
      title: "Public setup",
      explanation:
        "Alice and Bob agree on the same public prime p and public generator g. These are safe to share.",
      formula: `p = ${prime}, g = ${generator}`,
      after: `Both learners start from the same public pair (${prime}, ${generator}).`,
      highlight: "public parameters"
    },
    {
      id: "alice-public",
      title: "Alice computes her public value",
      explanation:
        "Alice raises g to her secret exponent and reduces the result modulo p before sending it out.",
      formula: `A = g^a mod p = ${generator}^${aliceSecret} mod ${prime} = ${alicePublic}`,
      before: `Alice keeps a = ${aliceSecret} private.`,
      after: `Alice publishes A = ${alicePublic}.`,
      highlight: "Alice"
    },
    {
      id: "bob-public",
      title: "Bob computes his public value",
      explanation:
        "Bob performs the same pattern with his own secret exponent to produce B.",
      formula: `B = g^b mod p = ${generator}^${bobSecret} mod ${prime} = ${bobPublic}`,
      before: `Bob keeps b = ${bobSecret} private.`,
      after: `Bob publishes B = ${bobPublic}.`,
      highlight: "Bob"
    },
    {
      id: "exchange",
      title: "The public exchange happens",
      explanation:
        "Alice receives B and Bob receives A. The private exponents still stay hidden.",
      formula: `Alice gets B = ${bobPublic}; Bob gets A = ${alicePublic}`,
      after: "Both sides now have enough information to derive the same secret separately.",
      highlight: "exchange"
    },
    {
      id: "alice-secret",
      title: "Alice derives the shared secret",
      explanation:
        "Alice raises Bob's public value to her private exponent. The modulo operation keeps the number bounded.",
      formula: `s = B^a mod p = ${bobPublic}^${aliceSecret} mod ${prime} = ${aliceShared}`,
      after: `Alice computes s = ${aliceShared}.`,
      highlight: "Alice"
    },
    {
      id: "bob-secret",
      title: "Bob derives the same shared secret",
      explanation:
        "Bob mirrors the computation with Alice's public value and reaches the same result.",
      formula: `s = A^b mod p = ${alicePublic}^${bobSecret} mod ${prime} = ${bobShared}`,
      after: `Bob also computes s = ${bobShared}.`,
      highlight: "Bob"
    }
  ];

  return {
    input,
    alicePublic,
    bobPublic,
    sharedSecret: aliceShared,
    notes,
    steps
  };
}
