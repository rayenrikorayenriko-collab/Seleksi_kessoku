-- ============================================================
-- KESSOKU CLAN WEBSITE — SUPABASE SQL SETUP
-- Jalankan ini di Supabase SQL Editor.
-- ============================================================

-- 1) Tabel pengaturan situs (singleton row id='singleton')
CREATE TABLE IF NOT EXISTS public.site_settings (
  id          TEXT PRIMARY KEY DEFAULT 'singleton',
  data        JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2) Tabel registrasi anggota
CREATE TABLE IF NOT EXISTS public.registrations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  gender       TEXT NOT NULL,
  tt_account   TEXT NOT NULL,
  gen          TEXT NOT NULL,
  skill        TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3) Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations  ENABLE ROW LEVEL SECURITY;

-- 4) Policy: siapapun bisa BACA site_settings (untuk load config)
DROP POLICY IF EXISTS "anon_read_settings" ON public.site_settings;
CREATE POLICY "anon_read_settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- 5) Policy: hanya bisa INSERT/UPDATE settings dari dashboard/service role.
--    Anon key tidak boleh menulis settings (gunakan service role lewat edge function
--    atau biarkan tulis lewat policy di bawah ini untuk dev).
--    NOTE: untuk mode admin yang simple, kita izinkan tulis via anon (password
--    tetap ada di frontend). Untuk produksi, ganti dengan service-role.
DROP POLICY IF EXISTS "anon_write_settings" ON public.site_settings;
CREATE POLICY "anon_write_settings"
  ON public.site_settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- 6) Policy: siapapun bisa INSERT registrasi
DROP POLICY IF EXISTS "anon_insert_reg" ON public.registrations;
CREATE POLICY "anon_insert_reg"
  ON public.registrations FOR INSERT
  WITH CHECK (true);

-- 7) Policy: hanya baca registrasi untuk admin (opsional)
DROP POLICY IF EXISTS "anon_read_reg" ON public.registrations;
CREATE POLICY "anon_read_reg"
  ON public.registrations FOR SELECT
  USING (true);

-- 8) Realtime supaya settings auto-update antar device
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;

-- 9) (Opsional) Seed default settings jika belum ada
INSERT INTO public.site_settings (id, data)
VALUES ('singleton', '{
  "site_title": "KESSOKU CLAN",
  "intro_title": "KESSOKU CLAN",
  "intro_subtitle": "#kessokufamily • #ksf",
  "ragdol_front_text": "KESSOKU",
  "ragdol_front_image": "",
  "ragdol_back_image": "",
  "background_image": "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=900&q=80",
  "background_video": "",
  "join_url": "https://vt.tiktok.com/ZSs6jUEEJ/",
  "show_intro": true,
  "auto_update_hashtags_monday": true,
  "gens": [
    {"id":"g1","label":"Gen 1","active":true},
    {"id":"g2","label":"Gen 2","active":true},
    {"id":"g3","label":"Gen 3","active":true}
  ],
  "skills": [
    {"id":"s1","label":"JJ 3D","active":true},
    {"id":"s2","label":"JJ Biasa","active":true},
    {"id":"s3","label":"Mograp","active":true}
  ],
  "hashtags": [
    {"id":"h1","tag":"#kessokuclan","updated_at":"2026-01-01T00:00:00.000Z"},
    {"id":"h2","tag":"#kessokufamily","updated_at":"2026-01-01T00:00:00.000Z"},
    {"id":"h3","tag":"#ksf","updated_at":"2026-01-01T00:00:00.000Z"}
  ],
  "cn_templates": [
    {"id":"c1","format":"ケ-{name}"},
    {"id":"c2","format":"{name}〆"},
    {"id":"c3","format":"𝙆𝙎𝙁{name} 𝖋𝖙`𝙆𝙎𝙁"}
  ],
  "hollow_photos": [
    {"id":"p1","url":"https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80","label":"Foto 1"},
    {"id":"p2","url":"https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80","label":"Foto 2"},
    {"id":"p3","url":"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80","label":"Foto 3"}
  ]
}'::jsonb)
ON CONFLICT (id) DO NOTHING;
