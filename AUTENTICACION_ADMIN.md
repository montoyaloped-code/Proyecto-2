# 🔐 Configuración de Autenticación con Supabase - Panel Admin

## Requisitos

Debe tener configurado Supabase con las variables de entorno:
- `VITE_SUPABASE_DATABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Pasos para Configurar la Autenticación

### 1. Habilitar Autenticación en Supabase

1. Accede a tu proyecto en [Supabase Dashboard](https://supabase.com)
2. Ve a **Authentication** → **Providers**
3. Asegúrate que **Email** esté habilitado
4. Configura los "Email templates" (confirmación de email)

### 2. Crear un Usuario Admin

1. En Supabase, ve a **Authentication** → **Users**
2. Haz clic en "**Add user**" o "**Invite user**"
3. Ingresa:
   - **Email**: El email del administrador (ej: `admin@tuescuela.edu`)
   - **Password**: Una contraseña fuerte
4. Guarda el usuario

### 3. Verificar Variables de Entorno

Tu archivo `.env.local` debe tener:

```env
VITE_SUPABASE_DATABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyXxxxxx...
```

### 4. Habilitar Row Level Security (RLS) - Opcional

Si quieres mayor seguridad, crea una tabla para roles de admin:

```sql
-- Crear tabla de roles
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política para que solo el usuario pueda ver sus datos
CREATE POLICY "admin_can_view_own_data"
  ON public.admin_users FOR SELECT
  USING (auth.uid() = id);
```

## Funcionalidad del Panel

### Login
- La página `/admin` redirige al formulario de login si no hay sesión activa
- El usuario ingresa su **email** y **contraseña**
- Se autentica contra Supabase

### Sesión Activa
- Una vez autenticado, se muestra:
  - Email del usuario autenticado
  - Botón "**Cerrar Sesión**"
  - Acceso al panel completo

### Cierre de Sesión
- El botón "**Cerrar Sesión**" elimina la sesión y redirige al login

## Archivos Creados/Modificados

### Nuevos Componentes:
- **`src/components/Login.jsx`** - Formulario de login con Supabase
- **`src/components/PrivateRoute.jsx`** - Protección de rutas autenticadas

### Modificados:
- **`src/App.jsx`** - Importa `PrivateRoute` y protege `/admin`
- **`src/App.css`** - Estilos para login y ruta privada

## Características de Seguridad

✅ Login con correo y contraseña
✅ Sesión persistente (Supabase maneja cookies)
✅ Protección de rutas (solo usuarios autenticados)
✅ Logout automático
✅ Soporte para modo oscuro
✅ Responsive en móviles

## Pruebas Locales

1. Ejecuta el proyecto: `npm run dev`
2. Navega a `http://localhost:5173/admin`
3. Ingresa las credenciales del admin creado
4. ¡Listo! Deberías ver el panel administrativo

## Troubleshooting

### ❌ Error: "Invalid login credentials"
- Verifica que el usuario existe en Supabase
- Comprueba que la contraseña es correcta
- Asegúrate que el email está confirmado (si es requerido)

### ❌ Error: "Supabase URL or Key is missing"
- Verifica que las variables `.env.local` estén configuradas
- Reinicia el servidor de desarrollo

### ❌ Sesión no persiste después de recargar
- Supabase debería mantener la sesión automáticamente
- Verifica que las cookies están habilitadas en el navegador

---

**Última actualización:** Junio 2026
