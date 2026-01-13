// Vite/browser polyfills for dependencies that assume Node globals.
// Must be imported BEFORE any @webex/cc-widgets imports run.

// Some packages reference `global` (Node) instead of `globalThis` (web).
// Example symptom: "Uncaught ReferenceError: global is not defined".
if (!(globalThis as any).global) {
  (globalThis as any).global = globalThis;
}

// Polyfill Buffer if a dependency expects it (common in crypto/browser shims).
import { Buffer } from 'buffer';
if (!(globalThis as any).Buffer) {
  (globalThis as any).Buffer = Buffer;
}

// Polyfill process if referenced.
import process from 'process';
if (!(globalThis as any).process) {
  (globalThis as any).process = process;
}

