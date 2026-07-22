export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ModuleType = 'content' | 'forum' | 'media'
export type UserRole = 'super_admin' | 'owner' | 'manager' | 'member'
export type DangerLevel = 'Low' | 'Medium' | 'High'
export type ThreatStatus = 'pending' | 'under_review' | 'neutralized'
export type AnalystRole = 'observatory_manager' | 'observatory_analyst'

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
          name: Json
          module_type: ModuleType
          slug: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: Json
          module_type: ModuleType
          slug: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          name?: Json
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
          full_name: Json
          role: UserRole
          created_at: string
        }
        Insert: {
          id: string
          organization_id?: string | null
          full_name?: Json
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string | null
          full_name?: Json
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
          title: Json
          content: Json
          is_public_to_hub: boolean
          content_type: string
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
          title: Json
          content?: Json
          is_public_to_hub?: boolean
          content_type?: string
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
          title?: Json
          content?: Json
          is_public_to_hub?: boolean
          content_type?: string
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
          title: Json
          description: Json | null
          cover_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          branch_id: string
          title?: Json
          description?: Json | null
          cover_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          branch_id?: string
          title?: Json
          description?: Json | null
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
