-- Migrate bilingual JSONB keys from Arabic (ar) to Simplified Chinese (zh)

-- branches.name
UPDATE branches
SET name = (name - 'ar') || jsonb_build_object('zh', COALESCE(name->>'ar', name->>'zh', ''))
WHERE name ? 'ar';

ALTER TABLE branches
  ALTER COLUMN name SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

-- profiles.full_name
UPDATE profiles
SET full_name = (full_name - 'ar') || jsonb_build_object('zh', COALESCE(full_name->>'ar', full_name->>'zh', ''))
WHERE full_name ? 'ar';

ALTER TABLE profiles
  ALTER COLUMN full_name SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

-- entities.title / content
UPDATE entities
SET title = (title - 'ar') || jsonb_build_object('zh', COALESCE(title->>'ar', title->>'zh', ''))
WHERE title ? 'ar';

UPDATE entities
SET content = (content - 'ar') || jsonb_build_object('zh', COALESCE(content->>'ar', content->>'zh', ''))
WHERE content ? 'ar';

ALTER TABLE entities
  ALTER COLUMN title SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

ALTER TABLE entities
  ALTER COLUMN content SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

-- series.title / description
UPDATE series
SET title = (title - 'ar') || jsonb_build_object('zh', COALESCE(title->>'ar', title->>'zh', ''))
WHERE title ? 'ar';

UPDATE series
SET description = (description - 'ar') || jsonb_build_object('zh', COALESCE(description->>'ar', description->>'zh', ''))
WHERE description ? 'ar';

ALTER TABLE series
  ALTER COLUMN title SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

ALTER TABLE series
  ALTER COLUMN description SET DEFAULT '{"zh": "", "en": ""}'::jsonb;

-- organizations.name is TEXT; only rewrite rows that store JSON objects with an "ar" key
UPDATE organizations
SET name = (
  (name::jsonb - 'ar') || jsonb_build_object('zh', COALESCE(name::jsonb->>'ar', name::jsonb->>'zh', ''))
)::text
WHERE name LIKE '{%'
  AND (name::jsonb) ? 'ar';

-- Profile creation trigger: prefer full_name_zh / full_name_en meta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    jsonb_build_object(
      'zh', COALESCE(
        NEW.raw_user_meta_data ->> 'full_name_zh',
        NEW.raw_user_meta_data ->> 'full_name',
        ''
      ),
      'en', COALESCE(NEW.raw_user_meta_data ->> 'full_name_en', '')
    ),
    'member'
  );
  RETURN NEW;
END;
$$;

COMMENT ON COLUMN series.title IS 'Bilingual title {zh, en}';
COMMENT ON COLUMN series.description IS 'Bilingual description {zh, en}';
