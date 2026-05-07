# Cipher Atlas

Cipher Atlas is an original educational web app that visually explains three important cryptography topics:

- AES-128 block encryption
- DES as a historical Feistel cipher
- Diffie-Hellman key exchange

This project is built for learning, not for production security work.

## What is included

- A clean homepage and studio hub
- Dedicated pages for AES, DES, and Diffie-Hellman
- Step-by-step cards for each algorithm
- Visual state grids for AES
- Feistel round panels for DES
- Alice/Bob exchange visualization for Diffie-Hellman
- Honesty notes about DES obsolescence and toy-number Diffie-Hellman examples

## Project structure

```text
src/
  app/
    about/
    studio/
      aes/
      des/
      diffie-hellman/
  components/
    aes/
    common/
    des/
    dh/
    home/
    layout/
  lib/
    content/
    crypto/
```

## Educational note

- The cryptography logic in `src/lib/crypto` is written to make the transformations readable.
- The UI components render structured step data and do not perform the core crypto calculations.
- DES is obsolete and should not be used for real-world security.
- Small Diffie-Hellman values are insecure and only included to keep the arithmetic visible.
- If you need real cryptography in production, use audited libraries or platform APIs such as Web Crypto.

## Run locally

```bash
npm install
npm run dev
npm run lint
npm run build
```

If you are using Windows PowerShell and `npm` is blocked by execution policy, use:

```bash
npm.cmd install
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

Open `http://localhost:3000` in your browser after the dev server starts.
