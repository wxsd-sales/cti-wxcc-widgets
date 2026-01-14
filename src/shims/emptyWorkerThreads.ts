/**
 * Browser shim for Node's `worker_threads` module.
 *
 * The Webex CC widgets quickstart webpack config explicitly disables this via:
 * `resolve.fallback: { worker_threads: false }`.
 *
 * In Vite, we alias `worker_threads` to this file so builds don't fail if some
 * dependency tries to import it for optional Node-only behavior.
 */

export const isMainThread = true;
export const parentPort = null;

export class Worker {
  constructor() {
    throw new Error('worker_threads is not available in the browser');
  }
}

