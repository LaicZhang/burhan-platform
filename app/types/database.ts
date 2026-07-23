export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ModuleType = 'content' | 'forum' | 'media'
export type UserRole = 'super_admin' | 'owner' | 'manager' | 'member'
export type DangerLevel = 'Low' | 'Medium' | 'High'
export type ThreatStatus = 'pending' | 'under_review' | 'neutralized'
export type AnalystRole = 'observatory_manager' | 'observatory_analyst'
export type ContentType = 'video' | 'article' | 'audio'

/** Bilingual JSONB shape used across title/name/content fields */
export type LocalizedString = Partial<Record<'zh' | 'en', string>>

/** App-level org name: SQL stores TEXT (plain string or JSON text) */
export type OrgName = string | LocalizedString

/** Entity content JSON: bilingual body + optional cover image */
export type EntityContent = LocalizedString & {
  image_url?: string | null
}

/** Organization settings JSONB */
export type OrgSettings = {
  logos?: {
    dark?: string | null
    light?: string | null
  }
  description?: LocalizedString
  [key: string]: Json | undefined
}

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          org_slug: string
          settings: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          org_slug: string
          settings?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          org_slug?: string
          settings?: Json
          created_at?: string
        }
        Relationships: []
      }
      branches: {
        Row: {
          id: string
          organization_id: string
          name: LocalizedString
          module_type: ModuleType
          slug: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: LocalizedString
          module_type: ModuleType
          slug: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: LocalizedString
          module_type?: ModuleType
          slug?: string
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          organization_id: string | null
          full_name: LocalizedString
          role: UserRole
          created_at: string
        }
        Insert: {
          id: string
          organization_id?: string | null
          full_name?: LocalizedString
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          full_name?: LocalizedString
          role?: UserRole
          created_at?: string
        }
        Relationships: []
      }
      entities: {
        Row: {
          id: string
          branch_id: string
          organization_id: string
          title: LocalizedString
          content: EntityContent
          is_public_to_hub: boolean
          content_type: ContentType
          video_id: string | null
          primary_source: string
          fallback_source: string | null
          fallback_url: string | null
          audio_url: string | null
          audio_file: string | null
          is_premium: boolean
          price: number | null
          series_id: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          branch_id: string
          organization_id: string
          title: LocalizedString
          content?: EntityContent
          is_public_to_hub?: boolean
          content_type?: ContentType
          video_id?: string | null
          primary_source?: string
          fallback_source?: string | null
          fallback_url?: string | null
          audio_url?: string | null
          audio_file?: string | null
          is_premium?: boolean
          price?: number | null
          series_id?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          branch_id?: string
          organization_id?: string
          title?: LocalizedString
          content?: EntityContent
          is_public_to_hub?: boolean
          content_type?: ContentType
          video_id?: string | null
          primary_source?: string
          fallback_source?: string | null
          fallback_url?: string | null
          audio_url?: string | null
          audio_file?: string | null
          is_premium?: boolean
          price?: number | null
          series_id?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      observatory_threats: {
        Row: {
          id: string
          title: string
          source_url: string
          platform: string
          danger_level: DangerLevel
          status: ThreatStatus
          assigned_scholar_id: string | null
          reported_by: string | null
          response_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          source_url: string
          platform?: string
          danger_level?: DangerLevel
          status?: ThreatStatus
          assigned_scholar_id?: string | null
          reported_by?: string | null
          response_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          source_url?: string
          platform?: string
          danger_level?: DangerLevel
          status?: ThreatStatus
          assigned_scholar_id?: string | null
          reported_by?: string | null
          response_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      series: {
        Row: {
          id: string
          organization_id: string
          branch_id: string
          title: LocalizedString
          description: LocalizedString | null
          cover_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          branch_id: string
          title?: LocalizedString
          description?: LocalizedString | null
          cover_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          branch_id?: string
          title?: LocalizedString
          description?: LocalizedString | null
          cover_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      observatory_analysts: {
        Row: {
          id: string
          role_type: AnalystRole
          created_at: string
        }
        Insert: {
          id: string
          role_type: AnalystRole
          created_at?: string
        }
        Update: {
          id?: string
          role_type?: AnalystRole
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      module_type: ModuleType
      user_role: UserRole
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Entity = Tables<'entities'>
export type Series = Tables<'series'>
export type Organization = Tables<'organizations'>
export type Branch = Tables<'branches'>
export type Profile = Tables<'profiles'>
export type ObservatoryThreat = Tables<'observatory_threats'>
export type ObservatoryAnalyst = Tables<'observatory_analysts'>
