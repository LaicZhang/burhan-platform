import { asRecord, localizedValue } from '~/utils/localized'

export type LocaleCode = 'zh' | 'en'
export type LocalizedJson<T = string> = Partial<Record<LocaleCode, T>>

export const useLocale = () => {
  const { locale, setLocale, t } = useI18n()

  const isRtl = computed<boolean>(() => false)
  const currentLocale = computed<LocaleCode>(() => (locale.value === 'en' ? 'en' : 'zh'))

  function extractLocalized<T = string>(
    jsonb: LocalizedJson<T> | string | null | undefined | unknown,
    fallback: T | null = null,
  ): T | null {
    if (jsonb == null || jsonb === '') return fallback

    if (typeof jsonb === 'string') {
      const obj = asRecord(jsonb)
      if (obj) {
        const loc = obj[currentLocale.value]
        if (loc != null && loc !== '') return loc as T
        if (obj.zh != null && obj.zh !== '') return obj.zh as T
        if (obj.en != null && obj.en !== '') return obj.en as T
      }
      // Plain string bilingual fallback path
      const plain = localizedValue(jsonb, currentLocale.value)
      return (plain || fallback) as T | null
    }

    if (typeof jsonb === 'object' && !Array.isArray(jsonb)) {
      const rec = jsonb as LocalizedJson<T>
      return rec[currentLocale.value] ?? rec.zh ?? rec.en ?? fallback ?? null
    }

    return fallback
  }

  async function switchLocale(newLocale: string) {
    const next: LocaleCode = newLocale === 'en' ? 'en' : 'zh'
    const html = document.documentElement
    html.classList.remove('rtl', 'ltr')
    await setLocale(next)
    html.lang = next
    html.dir = 'ltr'
    html.classList.add('ltr')
  }

  function toggleLocale() {
    return switchLocale(currentLocale.value === 'zh' ? 'en' : 'zh')
  }

  function localePath(path: string): string {
    if (currentLocale.value === 'zh') return path
    return `/${currentLocale.value}${path.startsWith('/') ? '' : '/'}${path}`
  }

  return {
    locale,
    currentLocale,
    isRtl,
    extractLocalized,
    switchLocale,
    toggleLocale,
    localePath,
    $t: t,
  }
}
