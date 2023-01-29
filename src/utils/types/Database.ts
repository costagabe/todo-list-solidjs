export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      label: {
        Row: {
          color: string
          id: number
          name: string
        }
        Insert: {
          color: string
          id?: number
          name: string
        }
        Update: {
          color?: string
          id?: number
          name?: string
        }
      }
      project: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          owner_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          owner_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          owner_id?: number | null
        }
      }
      task: {
        Row: {
          description: string | null
          due_date: string
          id: number
          name: string
          owner: number
          status: string
        }
        Insert: {
          description?: string | null
          due_date: string
          id?: number
          name: string
          owner: number
          status: string
        }
        Update: {
          description?: string | null
          due_date?: string
          id?: number
          name?: string
          owner?: number
          status?: string
        }
      }
      task_label: {
        Row: {
          label_id: number | null
          task_id: number | null
        }
        Insert: {
          label_id?: number | null
          task_id?: number | null
        }
        Update: {
          label_id?: number | null
          task_id?: number | null
        }
      }
      user_table: {
        Row: {
          email: string
          id: number
          name: string
          password: string
        }
        Insert: {
          email: string
          id?: number
          name: string
          password: string
        }
        Update: {
          email?: string
          id?: number
          name?: string
          password?: string
        }
      }
    }
  }
}