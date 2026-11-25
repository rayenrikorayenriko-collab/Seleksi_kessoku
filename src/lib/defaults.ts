import type { AppSettings } from './types'

export const DEFAULT_SETTINGS: AppSettings = {
  site_title: 'KESSOKU CLAN',
  intro_title: 'KESSOKU CLAN',
  intro_subtitle: '#kessokufamily • #ksf',
  ragdol_front_text: 'KESSOKU',
  ragdol_front_image: '',
  ragdol_back_image: '',
  background_image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=900&q=80',
  background_video: '',
  join_url: 'https://vt.tiktok.com/ZSs6jUEEJ/',
  show_intro: true,
  auto_update_hashtags_monday: true,
  gens: [
    { id: 'g1', label: 'Gen 1', active: true },
    { id: 'g2', label: 'Gen 2', active: true },
    { id: 'g3', label: 'Gen 3', active: true },
  ],
  skills: [
    { id: 's1', label: 'JJ 3D', active: true },
    { id: 's2', label: 'JJ Biasa', active: true },
    { id: 's3', label: 'Mograp', active: true },
  ],
  hashtags: [
    { id: 'h1', tag: '#kessokuclan', updated_at: new Date().toISOString() },
    { id: 'h2', tag: '#kessokufamily', updated_at: new Date().toISOString() },
    { id: 'h3', tag: '#ksf', updated_at: new Date().toISOString() },
  ],
  cn_templates: [
    { id: 'c1', format: 'ケ-{name}' },
    { id: 'c2', format: '{name}〆' },
    { id: 'c3', format: '𝙆𝙎𝙁{name} 𝖋𝖙`𝙆𝙎𝙁' },
  ],
  hollow_photos: [
    { id: 'p1', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80', label: 'Foto 1' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80', label: 'Foto 2' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80', label: 'Foto 3' },
  ],
}
