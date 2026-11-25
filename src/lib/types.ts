export interface GenOption {
  id: string
  label: string
  active: boolean
}

export interface SkillOption {
  id: string
  label: string
  active: boolean
}

export interface Hashtag {
  id: string
  tag: string
  updated_at: string
}

export interface CnTemplate {
  id: string
  format: string // e.g. "ケ-{name}", "{name}〆", "KSF{name} 𝖋𝖙KSF"
}

export interface HollowPhoto {
  id: string
  url: string
  label?: string
}

export interface AppSettings {
  // texts
  site_title: string
  intro_title: string
  intro_subtitle: string
  ragdol_front_text: string
  ragdol_front_image: string
  ragdol_back_image: string
  background_image: string
  background_video: string
  join_url: string
  // options
  gens: GenOption[]
  skills: SkillOption[]
  hashtags: Hashtag[]
  cn_templates: CnTemplate[]
  hollow_photos: HollowPhoto[]
  // features
  show_intro: boolean
  auto_update_hashtags_monday: boolean
}

export interface Registration {
  id?: string
  name: string
  gender: string
  tt_account: string
  gen: string
  skill: string
  created_at?: string
}
