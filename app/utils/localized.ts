import type { EntityContent, Json, LocalizedString, OrgSettings } from '~/types/database'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Safely coerce JSON / JSONB / JSON-text into a plain object */
export function asRecord(value: unknown): Record<string, unknown> | null {
  if (value == null || value === '') return null
  if (isRecord(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value)
      return isRecord(parsed) ? parsed : null
    } catch {
      return null
    }
  }
  return null
}

/**
 * Resolve a bilingual value stored as JSONB, JSON text, or plain string.
 * Never throws on malformed JSON.
 */
export function localizedValue(value: unknown, locale: string): string {
  if (value == null || value === '') return ''
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      const obj = asRecord(trimmed)
      if (obj) {
        const loc = obj[locale]
        if (typeof loc === 'string' && loc) return loc
        if (typeof obj.zh === 'string' && obj.zh) return obj.zh
        if (typeof obj.en === 'string' && obj.en) return obj.en
      }
    }
    return value
  }
  if (isRecord(value)) {
    const loc = value[locale]
    if (typeof loc === 'string' && loc) return loc
    if (typeof value.zh === 'string' && value.zh) return value.zh
    if (typeof value.en === 'string' && value.en) return value.en
  }
  return ''
}

export function parseLocalizedString(value: unknown): LocalizedString {
  if (value == null || value === '') return {}
  if (typeof value === 'string') {
    const obj = asRecord(value)
    if (!obj) return {}
    return {
      zh: typeof obj.zh === 'string' ? obj.zh : undefined,
      en: typeof obj.en === 'string' ? obj.en : undefined,
    }
  }
  if (isRecord(value)) {
    return {
      zh: typeof value.zh === 'string' ? value.zh : undefined,
      en: typeof value.en === 'string' ? value.en : undefined,
    }
  }
  return {}
}

export function parseEntityContent(content: Json | null | undefined): EntityContent {
  const obj = asRecord(content)
  if (!obj) return {}
  return {
    zh: typeof obj.zh === 'string' ? obj.zh : undefined,
    en: typeof obj.en === 'string' ? obj.en : undefined,
    image_url: typeof obj.image_url === 'string' ? obj.image_url : obj.image_url === null ? null : undefined,
  }
}

export function parseOrgSettings(settings: Json | null | undefined): OrgSettings {
  const obj = asRecord(settings)
  if (!obj) return {}

  const logosRaw = obj.logos
  let logos: OrgSettings['logos']
  if (isRecord(logosRaw)) {
    logos = {
      dark: typeof logosRaw.dark === 'string' ? logosRaw.dark : logosRaw.dark === null ? null : undefined,
      light: typeof logosRaw.light === 'string' ? logosRaw.light : logosRaw.light === null ? null : undefined,
    }
  }

  const description = obj.description != null ? parseLocalizedString(obj.description) : undefined

  return {
    ...obj,
    logos,
    description: description && (description.zh || description.en) ? description : undefined,
  }
}

/** Cover image from entity content JSON (no entities.cover_url column). */
export function entityCoverUrl(
  entity: { content?: Json | null; video_id?: string | null; content_type?: string | null },
): string | null {
  const content = parseEntityContent(entity.content ?? null)
  if (content.image_url) return content.image_url
  if (entity.content_type === 'video' && entity.video_id) {
    return `https://img.youtube.com/vi/${entity.video_id}/hqdefault.jpg`
  }
  return null
}
