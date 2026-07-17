-- Tabla: plantillas (plantilla de horas sociales para descarga pública)
CREATE TABLE IF NOT EXISTS plantillas (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT,
  url TEXT NOT NULL,
  file_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE plantillas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Lectura pública plantillas"
  ON plantillas FOR SELECT USING (true);

CREATE POLICY "Inserción autenticados plantillas"
  ON plantillas FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Actualización autenticados plantillas"
  ON plantillas FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Eliminación autenticados plantillas"
  ON plantillas FOR DELETE USING (auth.role() = 'authenticated');
