-- RLS policies para todas las tablas del proyecto
-- Ejecutar en SQL Editor de Supabase

-- ============================================
-- 1. TABLAS NUEVAS (contacto + pqrs)
-- ============================================

CREATE TABLE contacto (
  id BIGSERIAL PRIMARY KEY,
  direccion TEXT NOT NULL DEFAULT '',
  telefono TEXT NOT NULL DEFAULT '',
  celular TEXT NOT NULL DEFAULT '',
  correo TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contacto ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública contacto" ON contacto FOR SELECT USING (true);
CREATE POLICY "Escritura autenticados contacto" ON contacto FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados contacto" ON contacto FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados contacto" ON contacto FOR DELETE USING (auth.role() = 'authenticated');

CREATE TABLE pqrs (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'Sugerencia',
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pqrs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede insertar PQRS" ON pqrs FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo admins pueden ver PQRS" ON pqrs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Solo admins pueden actualizar PQRS" ON pqrs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Solo admins pueden eliminar PQRS" ON pqrs FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 2. ACTIVAR RLS EN CADA TABLA EXISTENTE
-- ============================================
ALTER TABLE docentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE directivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE historia ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuadro_honor ENABLE ROW LEVEL SECURITY;
ALTER TABLE sedes ENABLE ROW LEVEL SECURITY;
ALTER TABLE psicologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE transparencia ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. POLÍTICAS DE LECTURA PÚBLICA
-- ============================================
CREATE POLICY "Lectura pública docentes" ON docentes FOR SELECT USING (true);
CREATE POLICY "Lectura pública directivos" ON directivos FOR SELECT USING (true);
CREATE POLICY "Lectura pública historia" ON historia FOR SELECT USING (true);
CREATE POLICY "Lectura pública galeria" ON galeria FOR SELECT USING (true);
CREATE POLICY "Lectura pública cuadro_honor" ON cuadro_honor FOR SELECT USING (true);
CREATE POLICY "Lectura pública sedes" ON sedes FOR SELECT USING (true);
CREATE POLICY "Lectura pública psicologia" ON psicologia FOR SELECT USING (true);
CREATE POLICY "Lectura pública transparencia" ON transparencia FOR SELECT USING (true);

-- ============================================
-- 3. POLÍTICAS DE ESCRITURA SOLO AUTENTICADOS
-- ============================================
CREATE POLICY "Escritura autenticados docentes" ON docentes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados directivos" ON directivos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados historia" ON historia
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados galeria" ON galeria
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados cuadro_honor" ON cuadro_honor
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados sedes" ON sedes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados psicologia" ON psicologia
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Escritura autenticados transparencia" ON transparencia
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 4. POLÍTICAS DE ACTUALIZACIÓN SOLO AUTENTICADOS
-- ============================================
CREATE POLICY "Actualización autenticados docentes" ON docentes
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados directivos" ON directivos
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados historia" ON historia
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados galeria" ON galeria
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados cuadro_honor" ON cuadro_honor
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados sedes" ON sedes
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados psicologia" ON psicologia
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Actualización autenticados transparencia" ON transparencia
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- 5. POLÍTICAS DE ELIMINACIÓN SOLO AUTENTICADOS
-- ============================================
CREATE POLICY "Eliminación autenticados docentes" ON docentes
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados directivos" ON directivos
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados historia" ON historia
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados galeria" ON galeria
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados cuadro_honor" ON cuadro_honor
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados sedes" ON sedes
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados psicologia" ON psicologia
  FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación autenticados transparencia" ON transparencia
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 6. STORAGE BUCKET: documentos
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('documentos', 'documentos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Usuarios autenticados suben a documentos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documentos' AND auth.role() = 'authenticated');

CREATE POLICY "Lectura pública documentos"
ON storage.objects FOR SELECT
USING (bucket_id = 'documentos');

CREATE POLICY "Usuarios autenticados actualizan documentos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documentos' AND auth.role() = 'authenticated');

CREATE POLICY "Usuarios autenticados eliminan documentos"
ON storage.objects FOR DELETE
USING (bucket_id = 'documentos' AND auth.role() = 'authenticated');
