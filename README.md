# KESSOKU CLAN — KSF Website

Website komunitas Kessoku Clan dengan animasi intro, kartu ragdol flip, hollow card carousel 3D, form registrasi, generator CN dengan copy otomatis, dan panel settings lengkap. Semua data tersimpan di Supabase.

## Fitur

- **Intro Animation** — animasi bintang 4 titik, orbit sparkle, progress bar otomatis
- **Ragdol Card** — kartu gantung dengan tali, flip 3D sekali ketuk, teks miring 90°
- **Hollow Card Carousel** — 3 foto simetris 3D, geser kiri untuk ganti foto (3→2→1)
- **Hashtag** — #kessokuclan #kessokufamily #ksf, diperbarui setiap Senin
- **Registrasi** — Nama, Gender, Akun TT, Gen, Paling Jago (JJ 3D / JJ Biasa / Mograp)
- **Generator CN** — format `ケ-{name}`, `{name}〆`, `𝙆𝙎𝙁{name} 𝖋𝖙\`𝙆𝙎𝙁`, copy otomatis, tombol BERGABUNG
- **Settings Panel** — password `kessokuclan12354`, edit semua teks/gambar/fitur
- **Liquid Glass** — efek glassmorphism di semua card
- **Micro Animations** — shimmer, jitter, float, transisi halus
- **Background 9:16** — foto/video dengan fade bawah, partikel glimmer

## Setup

### 1. Jalankan SQL di Supabase

Buka Supabase SQL Editor dan jalankan isi file `supabase/schema.sql`. Ini akan membuat tabel `site_settings` dan `registrations` beserta RLS policies.

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka `http://localhost:5173`.

### 4. Build untuk produksi

```bash
npm run build
npm run preview
```

## Environment Variables

File `.env` sudah terisi:

```
VITE_SUPABASE_URL=https://ufpgjiguixapczoohale.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_4yFqjHu9Sk7QyKpxBbJwcA_gj5oE0LJ
VITE_SETTINGS_PASSWORD=kessokuclan12354
```

## Struktur

```
src/
├── components/
│   ├── Background.tsx       # background 9:16 + shimmer + partikel
│   ├── Intro.tsx            # animasi intro
│   ├── RagdolCard.tsx       # kartu gantung flip 3D
│   ├── HollowCard.tsx       # carousel 3 foto 3D
│   ├── HashtagStrip.tsx     # hashtag + update Senin
│   ├── RegistrationForm.tsx # form registrasi
│   ├── CnSection.tsx        # generator CN + copy + join
│   ├── SettingsPanel.tsx    # panel admin (password)
│   └── Icons.tsx            # vector icons (bintang 4 titik dll)
├── lib/
│   ├── supabase.ts          # client Supabase
│   ├── types.ts             # TypeScript types
│   ├── defaults.ts          # settings default
│   └── store.tsx            # context provider + realtime
├── App.tsx
├── main.tsx
└── index.css
```

## Password Settings

`kessokuclan12354`

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animasi)
- Supabase (database + realtime)
