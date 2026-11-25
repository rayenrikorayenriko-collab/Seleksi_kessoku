import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from './supabase'
import { DEFAULT_SETTINGS } from './defaults'
import type { AppSettings, Registration } from './types'

interface Ctx {
  settings: AppSettings
  setSettings: (s: AppSettings) => void
  saveSettings: (s: AppSettings) => Promise<void>
  loading: boolean
  addRegistration: (r: Registration) => Promise<void>
}

const SettingsContext = createContext<Ctx | null>(null)

const SETTINGS_ROW_ID = 'singleton'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
    // realtime
    const channel = supabase
      .channel('settings-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        () => loadSettings()
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', SETTINGS_ROW_ID)
        .maybeSingle()
      if (error) throw error
      if (data?.data) {
        setSettings({ ...DEFAULT_SETTINGS, ...(data.data as AppSettings) })
      }
    } catch (e) {
      // offline / no table yet -> use defaults
      console.warn('Using default settings', e)
    } finally {
      setLoading(false)
    }
  }

  async function saveSettings(s: AppSettings) {
    setSettings(s)
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: SETTINGS_ROW_ID, data: s, updated_at: new Date().toISOString() })
      if (error) throw error
    } catch (e) {
      console.error('save settings failed', e)
    }
  }

  async function addRegistration(r: Registration) {
    try {
      await supabase.from('registrations').insert(r)
    } catch (e) {
      console.error('registration insert failed', e)
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings, saveSettings, loading, addRegistration }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be inside SettingsProvider')
  return ctx
}
