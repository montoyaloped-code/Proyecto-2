-- Tabla: config_psicologia (número de contacto de la psicorientadora)
CREATE TABLE IF NOT EXISTS config_psicologia (
  id BIGSERIAL PRIMARY KEY,
  phone TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE config_psicologia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública config_psicologia"
  ON config_psicologia FOR SELECT USING (true);

CREATE POLICY "Inserción autenticados config_psicologia"
  ON config_psicologia FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Actualización autenticados config_psicologia"
  ON config_psicologia FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Eliminación autenticados config_psicologia"
  ON config_psicologia FOR DELETE USING (auth.role() = 'authenticated');
