import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../lib/store'
import { SettingsIcon, LockIcon, PlusIcon, TrashIcon, CheckIcon } from './Icons'
import type { AppSettings, GenOption, SkillOption, Hashtag, CnTemplate, HollowPhoto } from '../lib/types'

const SETTINGS_PASSWORD = 'kessokuclan12354'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SettingsPanel({ open, onClose }: Props) {
  const { settings, saveSettings } = useSettings()
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [draft, setDraft] = useState<AppSettings>(settings)
  const [saved, setSaved] = useState(false)

  const update = <K extends keyof AppSettings>(key: K, val: AppSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: val }))

  const tryAuth = () => {
    if (pw === SETTINGS_PASSWORD) {
      setAuthed(true)
      setDraft(settings)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  const save = () => {
    saveSettings(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="glass-strong relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-5 no-scrollbar sm:rounded-3xl"
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SettingsIcon className="text-purple-300" />
                <h2 className="text-lg font-bold tracking-wider text-white">SETTINGS</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
              >
                Tutup
              </button>
            </div>

            {!authed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8"
              >
                <LockIcon size={40} className="mb-4 text-purple-300" />
                <p className="mb-4 text-sm text-white/70">Masukkan password admin</p>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value)
                    setPwError(false)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && tryAuth()}
                  placeholder="••••••••"
                  className={`input ${pwError ? 'border-red-500/60' : ''}`}
                  autoFocus
                />
                {pwError && (
                  <p className="mt-2 text-xs text-red-400">Password salah</p>
                )}
                <button
                  onClick={tryAuth}
                  className="mt-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-2.5 text-sm font-semibold text-white"
                >
                  Masuk
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {/* Texts */}
                <Section title="Teks">
                  <Row label="Judul Situs">
                    <input className="input-sm" value={draft.site_title} onChange={(e) => update('site_title', e.target.value)} />
                  </Row>
                  <Row label="Judul Intro">
                    <input className="input-sm" value={draft.intro_title} onChange={(e) => update('intro_title', e.target.value)} />
                  </Row>
                  <Row label="Subtitle Intro">
                    <input className="input-sm" value={draft.intro_subtitle} onChange={(e) => update('intro_subtitle', e.target.value)} />
                  </Row>
                  <Row label="Teks Depan Kartu (90°)">
                    <input className="input-sm" value={draft.ragdol_front_text} onChange={(e) => update('ragdol_front_text', e.target.value)} />
                  </Row>
                  <Row label="URL Gabung (Join)">
                    <input className="input-sm" value={draft.join_url} onChange={(e) => update('join_url', e.target.value)} />
                  </Row>
                </Section>

                {/* Images */}
                <Section title="Gambar & Media">
                  <Row label="Background (foto)">
                    <input className="input-sm" value={draft.background_image} onChange={(e) => update('background_image', e.target.value)} />
                  </Row>
                  <Row label="Background (video)">
                    <input className="input-sm" value={draft.background_video} onChange={(e) => update('background_video', e.target.value)} />
                  </Row>
                  <Row label="Gambar Depan Kartu Ragdol">
                    <input className="input-sm" value={draft.ragdol_front_image} onChange={(e) => update('ragdol_front_image', e.target.value)} />
                  </Row>
                  <Row label="Gambar Belakang Kartu Ragdol">
                    <input className="input-sm" value={draft.ragdol_back_image} onChange={(e) => update('ragdol_back_image', e.target.value)} />
                  </Row>
                </Section>

                {/* Gens */}
                <Section title="Gen (aktif/nonaktif)">
                  {draft.gens.map((g, i) => (
                    <div key={g.id} className="mb-2 flex items-center gap-2">
                      <input
                        className="input-sm flex-1"
                        value={g.label}
                        onChange={(e) => {
                          const next = [...draft.gens]
                          next[i] = { ...g, label: e.target.value }
                          update('gens', next)
                        }}
                      />
                      <Toggle on={g.active} onChange={(v) => {
                        const next = [...draft.gens]
                        next[i] = { ...g, active: v }
                        update('gens', next)
                      }} />
                      <button className="btn-danger" onClick={() => update('gens', draft.gens.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <button className="btn-add" onClick={() => update('gens', [...draft.gens, { id: 'g' + Date.now(), label: 'Gen Baru', active: true }])}>
                    <PlusIcon /> Tambah Gen
                  </button>
                </Section>

                {/* Skills */}
                <Section title="Paling Jago">
                  {draft.skills.map((s, i) => (
                    <div key={s.id} className="mb-2 flex items-center gap-2">
                      <input
                        className="input-sm flex-1"
                        value={s.label}
                        onChange={(e) => {
                          const next = [...draft.skills]
                          next[i] = { ...s, label: e.target.value }
                          update('skills', next)
                        }}
                      />
                      <Toggle on={s.active} onChange={(v) => {
                        const next = [...draft.skills]
                        next[i] = { ...s, active: v }
                        update('skills', next)
                      }} />
                      <button className="btn-danger" onClick={() => update('skills', draft.skills.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <button className="btn-add" onClick={() => update('skills', [...draft.skills, { id: 's' + Date.now(), label: 'Skill Baru', active: true }])}>
                    <PlusIcon /> Tambah Skill
                  </button>
                </Section>

                {/* Hashtags */}
                <Section title="Hashtag">
                  {draft.hashtags.map((h, i) => (
                    <div key={h.id} className="mb-2 flex items-center gap-2">
                      <input
                        className="input-sm flex-1"
                        value={h.tag}
                        onChange={(e) => {
                          const next = [...draft.hashtags]
                          next[i] = { ...h, tag: e.target.value }
                          update('hashtags', next)
                        }}
                      />
                      <button className="btn-danger" onClick={() => update('hashtags', draft.hashtags.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button className="btn-add" onClick={() => update('hashtags', [...draft.hashtags, { id: 'h' + Date.now(), tag: '#newtag', updated_at: new Date().toISOString() }])}>
                      <PlusIcon /> Tambah
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => update('hashtags', draft.hashtags.map((h) => ({ ...h, updated_at: new Date().toISOString() })))}
                    >
                      Perbarui Semua (Senin)
                    </button>
                  </div>
                </Section>

                {/* CN templates */}
                <Section title="CN (format pakai {`{name}`})">
                  {draft.cn_templates.map((c, i) => (
                    <div key={c.id} className="mb-2 flex items-center gap-2">
                      <input
                        className="input-sm flex-1"
                        value={c.format}
                        onChange={(e) => {
                          const next = [...draft.cn_templates]
                          next[i] = { ...c, format: e.target.value }
                          update('cn_templates', next)
                        }}
                      />
                      <button className="btn-danger" onClick={() => update('cn_templates', draft.cn_templates.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <button className="btn-add" onClick={() => update('cn_templates', [...draft.cn_templates, { id: 'c' + Date.now(), format: '{name}' }])}>
                    <PlusIcon /> Tambah CN
                  </button>
                </Section>

                {/* Hollow photos */}
                <Section title="Foto Hollow Card">
                  {draft.hollow_photos.map((p, i) => (
                    <div key={p.id} className="mb-2 flex items-center gap-2">
                      <input
                        className="input-sm flex-1"
                        value={p.url}
                        placeholder="URL foto"
                        onChange={(e) => {
                          const next = [...draft.hollow_photos]
                          next[i] = { ...p, url: e.target.value }
                          update('hollow_photos', next)
                        }}
                      />
                      <button className="btn-danger" onClick={() => update('hollow_photos', draft.hollow_photos.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <button className="btn-add" onClick={() => update('hollow_photos', [...draft.hollow_photos, { id: 'p' + Date.now(), url: '', label: 'Foto' }])}>
                    <PlusIcon /> Tambah Foto
                  </button>
                </Section>

                {/* Features */}
                <Section title="Fitur">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Tampilkan Intro</span>
                    <Toggle on={draft.show_intro} onChange={(v) => update('show_intro', v)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Auto update hashtag tiap Senin</span>
                    <Toggle on={draft.auto_update_hashtags_monday} onChange={(v) => update('auto_update_hashtags_monday', v)} />
                  </div>
                </Section>

                {/* save */}
                <button
                  onClick={save}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 py-3.5 text-sm font-semibold tracking-widest text-white shadow-lg shadow-purple-500/30"
                >
                  {saved ? <><CheckIcon size={18} /> TERSIMPAN</> : 'SIMPAN SEMUA'}
                </button>
              </motion.div>
            )}

            <style>{`
              .input-sm {
                width: 100%;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 10px;
                padding: 9px 11px;
                color: #fff;
                font-size: 13px;
                outline: none;
              }
              .input-sm:focus { border-color: rgba(168,85,247,0.6); }
              .btn-add { display:flex; align-items:center; gap:6px; margin-top:8px; padding:8px 12px; border-radius:10px; background:rgba(168,85,247,0.2); color:#d8b4fe; font-size:12px; font-weight:600; border:1px solid rgba(168,85,247,0.3); }
              .btn-secondary { display:flex; align-items:center; gap:6px; margin-top:8px; padding:8px 12px; border-radius:10px; background:rgba(59,130,246,0.2); color:#93c5fd; font-size:12px; font-weight:600; border:1px solid rgba(59,130,246,0.3); }
              .btn-danger { display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; background:rgba(239,68,68,0.15); color:#fca5a5; border:1px solid rgba(239,68,68,0.3); }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4 border border-white/5">
      <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-white/50">{title}</h3>
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2.5">
      <label className="mb-1 block text-[11px] text-white/50">{label}</label>
      {children}
    </div>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/15'}`}
    >
      <motion.span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
        animate={{ left: on ? '22px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}
