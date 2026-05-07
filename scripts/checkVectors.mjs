import assert from "node:assert/strict";
import path from "node:path";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

const root = process.cwd();

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const relativePath = specifier.slice(2);
      const candidate = path.join(root, "src", relativePath);
      const withExtension = path.extname(candidate) ? candidate : `${candidate}.ts`;
      return nextResolve(pathToFileURL(withExtension).href, context);
    }

    return nextResolve(specifier, context);
  }
});

const { visualizeAes } = await import("../src/lib/crypto/aes.ts");
const { visualizeDes } = await import("../src/lib/crypto/des.ts");
const { visualizeDiffieHellman } = await import("../src/lib/crypto/diffieHellman.ts");

const aesResult = visualizeAes(
  "00112233445566778899AABBCCDDEEFF",
  "000102030405060708090A0B0C0D0E0F"
);
assert.equal(aesResult.ciphertextHex, "69C4E0D86A7B0430D8CDB78070B4C55A");

const desResult = visualizeDes("0123456789ABCDEF", "133457799BBCDFF1");
assert.equal(desResult.ciphertextHex, "85E813540F0AB405");

const diffieHellmanResult = visualizeDiffieHellman({
  prime: 23,
  generator: 5,
  aliceSecret: 6,
  bobSecret: 15
});
assert.equal(diffieHellmanResult.alicePublic, 8);
assert.equal(diffieHellmanResult.bobPublic, 19);
assert.equal(diffieHellmanResult.sharedSecret, 2);

assert.throws(
  () =>
    visualizeDiffieHellman({
      prime: 21,
      generator: 5,
      aliceSecret: 6,
      bobSecret: 15
    }),
  /must actually be prime/
);

console.log("Vector checks passed.");
