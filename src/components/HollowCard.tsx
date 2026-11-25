import { useState, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { useSettings } from '../lib/store'

/**
 * Hollow card carousel.
 * Photos start at center: photo1 center, photo2 right, photo3 left.
 * Swipe left -> next photo comes to center (cycle: 3 -> 2 -> 1).
 * Symmetric 3D with side cards peeking.
 */
export default function HollowCard() {
  const { settings } = useSettings()
  const photos = settings.hollow_photos
  const [index, setIndex] = useState(0)
  const dragRef = useRef(false)

  const n = photos.length || 1

  const goNext = () => setIndex((i) => (i + 1) % n)
  const goPrev = () => setIndex((i) => (i - 1 + n) % n)

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -60) goNext()
    else if (info.offset.x > 60) goPrev()
  }

  const renderCard = (offset: number, i: number) => {
    const isCenter = offset === 0
    const abs = Math.abs(offset)
    const rotateY = offset * 35
    const translateX = offset * 110
    const scale = isCenter ? 1 : 0.78
    const z = isCenter ? 10 : 10 - abs
    const opacity = abs > 1 ? 0 : 1

    return (
      <motion.div
        key={`${i}-${offset}`}
        className="absolute left-1/2 top-1/2 h-64 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl glass-strong"
        style={{ zIndex: z }}
        animate={{
          x: translateX,
          rotateY,
          scale,
          opacity,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      >
        <img
          src={photos[i].url}
          alt={photos[i].label || ''}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 shimmer-overlay" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl" />
        {isCenter && (
          <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-widest text-white/80">
            {photos[i].label || `Foto ${i + 1}`}
          </div>
        )}
      </motion.div>
    )
  }

  const positions = [-2, -1, 0, 1, 2]

  return (
    <div className="relative flex flex-col items-center">
      <div className="scene-3d relative h-72 w-full">
        <motion.div
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {positions.map((offset) => {
            const i = ((index + offset) % n + n) % n
            return renderCard(offset, i)
          })}
        </motion.div>
      </div>

      {/* dots */}
      <div className="mt-4 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? 'w-6 bg-gradient-to-r from-purple-400 to-blue-400' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-[11px] tracking-widest text-white/40">GESER UNTUK LIHAT FOTO</p>
    </div>
  )
}
