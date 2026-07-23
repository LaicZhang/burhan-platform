/** Extract a human-readable message from unknown catch values */
export function errorMessage(err: unknown, fallback = 'Unexpected error'): string {
  if (typeof err === 'string' && err) return err
  if (err instanceof Error && err.message) return err.message
  if (typeof err === 'object' && err !== null) {
    const rec = err as Record<string, unknown>
    if (typeof rec.statusMessage === 'string' && rec.statusMessage) return rec.statusMessage
    if (typeof rec.message === 'string' && rec.message) return rec.message
    if (typeof rec.statusMessage === 'string') return rec.statusMessage
  }
  return fallback
}
