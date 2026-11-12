DROP POLICY IF EXISTS "Visitors can submit a lead" ON public.leads;
CREATE POLICY "Visitors can submit a valid lead" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 2 AND 100
  AND phone ~ '^[0-9+()\-. ]{10,25}$'
  AND (email IS NULL OR char_length(email) <= 255)
  AND char_length(service) <= 100
  AND (county IS NULL OR char_length(county) <= 100)
  AND (message IS NULL OR char_length(message) <= 2000)
);