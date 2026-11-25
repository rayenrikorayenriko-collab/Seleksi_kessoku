import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ufpgjiguixapczoohale.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4yFqjHu9Sk7QyKpxBbJwcA_gj5oE0LJ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
