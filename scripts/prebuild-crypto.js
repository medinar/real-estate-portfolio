// scripts/prebuild-crypto.js
try {
  if (typeof globalThis.crypto === 'undefined') {
    // Node 18/20: make Web Crypto available to any code Vite loads at build time
    globalThis.crypto = require('node:crypto').webcrypto;
  }
  // Optional: log once to confirm
  console.log('[build] webcrypto shim set');
} catch (e) {
  console.error('[build] failed to set webcrypto shim', e);
  process.exit(0); // don’t fail the build because of the shim
}