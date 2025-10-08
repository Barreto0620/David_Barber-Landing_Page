// Caminho: src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta o cliente Supabase principal
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Adicione esta linha para exportar o módulo de autenticação separadamente
export const auth = supabase.auth