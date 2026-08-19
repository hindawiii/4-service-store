ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'anime';
ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'games';
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS details jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS official_url text,
  ADD COLUMN IF NOT EXISTS developer text;