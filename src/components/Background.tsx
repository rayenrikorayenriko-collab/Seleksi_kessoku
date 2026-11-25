import { useSettings } from '../lib/store'

export default function Background() {
  const { settings } = useSettings()
  const hasVideo = !!settings.background_video

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#120a24] to-[#05050a]" />

      {/* background media (9:16 centered) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-[420px] overflow-hidden">
          {hasVideo ? (
            <video
              key={settings.background_video}
              src={settings.background_video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={settings.background_image}
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover jitter"
              style={{ filter: 'saturate(1.1) contrast(1.05)' }}
            />
          )}

          {/* shimmer overlay */}
          <div className="absolute inset-0 shimmer-overlay" />

          {/* top vignette */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#05050a] via-[#05050a]/80 to-transparent" />
        </div>
      </div>

      {/* floating particles / glimmer */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.5,
              animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite, glow-pulse ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)',
            }}
          />
        ))}
      </div>

      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
