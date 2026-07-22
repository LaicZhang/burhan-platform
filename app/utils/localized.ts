export function localizedValue(value: unknown, locale: string): string {
  if (!value) return ''
  const obj = typeof value === 'string' ? JSON.parse(value as string) : value as Record<string, string>
  return obj?.[locale] || obj?.zh || obj?.en || ''
}
