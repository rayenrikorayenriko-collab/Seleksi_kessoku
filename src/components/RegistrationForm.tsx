import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../lib/store'
import { ArrowRightIcon } from './Icons'
import type { Registration } from '../lib/types'

interface Props {
  onSubmit: (data: Registration) => void
}

export default function RegistrationForm({ onSubmit }: Props) {
  const { settings } = useSettings()
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [tt, setTt] = useState('')
  const [gen, setGen] = useState('')
  const [skill, setSkill] = useState('')

  const activeGens = settings.gens.filter((g) => g.active)
  const activeSkills = settings.skills.filter((s) => s.active)

  const valid = name && gender && tt && gen && skill

  const submit = () => {
    if (!valid) return
    onSubmit({ name, gender, tt_account: tt, gen, skill })
  }

  return (
    <motion.div
      className="glass-strong w-full max-w-md rounded-3xl p-6"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <h2 className="mb-1 text-center text-xl font-bold tracking-wider text-gradient">REGISTRASI</h2>
      <p className="mb-5 text-center text-[11px] tracking-widest text-white/50">Gabung Kessoku Clan</p>

      <div className="space-y-3.5">
        <Field label="Nama">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama kamu"
            className="input"
          />
        </Field>

        <Field label="Gender">
          <div className="flex gap-2">
            {['Laki-laki', 'Perempuan'].map((g) => (
              <Pill key={g} active={gender === g} onClick={() => setGender(g)}>
                {g}
              </Pill>
            ))}
          </div>
        </Field>

        <Field label="Akun TT">
          <input
            value={tt}
            onChange={(e) => setTt(e.target.value)}
            placeholder="@username"
            className="input"
          />
        </Field>

        <Field label="Gen">
          <div className="flex flex-wrap gap-2">
            {activeGens.map((g) => (
              <Pill key={g.id} active={gen === g.id} onClick={() => setGen(g.id)}>
                {g.label}
              </Pill>
            ))}
          </div>
        </Field>

        <Field label="Paling Jago">
          <div className="flex flex-wrap gap-2">
            {activeSkills.map((s) => (
              <Pill key={s.id} active={skill === s.id} onClick={() => setSkill(s.id)}>
                {s.label}
              </Pill>
            ))}
          </div>
        </Field>
      </div>

      <motion.button
        onClick={submit}
        disabled={!valid}
        whileTap={{ scale: 0.97 }}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold tracking-widest transition ${
          valid
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/10 text-white/40'
        }`}
      >
        SUBMIT <ArrowRightIcon size={18} />
      </motion.button>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 12px 14px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.25s;
        }
        .input:focus {
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15);
          background: rgba(255,255,255,0.08);
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </motion.div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium tracking-widest text-white/60">{label}</label>
      {children}
    </div>
  )
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`rounded-xl px-4 py-2 text-xs font-medium tracking-wide transition ${
        active
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/30'
          : 'bg-white/6 text-white/70 border border-white/10'
      }`}
    >
      {children}
    </motion.button>
  )
}
