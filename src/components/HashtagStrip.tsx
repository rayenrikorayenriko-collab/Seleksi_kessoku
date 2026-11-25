import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../lib/store'
import { SparkleIcon } from './Icons'

export default function HashtagStrip() {
  const { settings } = useSettings()
  const [lastUpdate, setLastUpdate] = useState<string>('')

  // Monday auto-update marker
  useEffect(() => {
    if (settings.auto_update_hashtags_monday) {
      const now = new Date()
      const day = now.getDay()
      if (day === 1) {
        setLastUpdate('Diperbarui hari Senin ini')
      } else {
        setLastUpdate('Diperbarui setiap Senin')
      }
    }
  }, [settings.auto_update_hashtags_monday, settings.hashtags])

  return (
    <motion.div
      className="glass w-full max-w-md rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-purple-300">
          <SparkleIcon size={14} /> HASHTAG
        </div>
        <span className="text-[10px] text-white/40">{lastUpdate}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {settings.hashtags.map((h, i) => (
          <motion.span
            key={h.id}
            className="rounded-full bg-white/8 px-3 py-1.5 text-sm font-medium text-white/90 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            whileHover={{ scale: 1.05 }}
          >
            {h.tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
