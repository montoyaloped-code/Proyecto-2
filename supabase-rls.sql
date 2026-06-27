-- RLS policies para todas las tablas del proyecto
-- Ejecutar en SQL Editor de Supabase

-- ============================================
-- 1. ACTIVAR RLS EN CADA TABLA
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
