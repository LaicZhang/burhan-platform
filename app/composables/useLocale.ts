export type LocaleCode = 'zh' | 'en'
export type LocalizedJson<T = string> = Partial<Record<LocaleCode, T>>

export const useLocale = () => {
  const { locale, setLocale, t } = useI18n()

  const isRtl = computed<boolean>(() => false)
  const currentLocale = computed<LocaleCode>(() => (locale.value === 'en' ? 'en' : 'zh'))

  function extractLocalized<T = string>(jsonb: LocalizedJson<T> | null | undefined, fallback: T | null = null): T | null {
    if (!jsonb) return fallback
    return jsonb[currentLocale.value] ?? jsonb.zh ?? jsonb.en ?? fallback ?? null
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
