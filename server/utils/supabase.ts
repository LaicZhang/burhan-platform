import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../app/types/database'

export function getSupabaseClient() {
  const config = useRuntimeConfig()

  const url = config.public.supabase?.url as string
  const key = config.public.supabase?.key as string

  if (!url || !key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials are not configured. Check SUPABASE_URL and SUPABASE_KEY in .env',
    })
  }

  return createClient<Database>(url, key)
}

export function getSupabaseAdmin() {
  const config = useRuntimeConfig()

  const url = config.public.supabase?.url as string
  // v2 module exposes secretKey (serviceKey is deprecated)
  const secretKey = (config.supabase?.secretKey ?? config.supabase?.serviceKey) as string | undefined

  if (!url || !secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase admin credentials are not configured. Set SUPABASE_SECRET_KEY in .env',
    })
  }

  return createClient<Database>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
