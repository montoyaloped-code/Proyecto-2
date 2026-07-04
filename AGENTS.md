# Proyecto-2 — I.E. Ignacio Yepes Yepes

Web institucional del colegio I.E. Ignacio Yepes Yepes (Remedios, Antioquia, Colombia).

## Stack

React 19 + Vite 8 + Tailwind CSS 4 + Supabase + React Router DOM 7 + lucide-react.

## Comandos

- `npm run dev` — Servidor de desarrollo Vite
- `npm run build` — Build producción
- `npm run preview` — Preview del build
- `npm run lint` — ESLint (flat config)

No hay tests configurados. No hay CI.

## Estructura

- `src/main.jsx` — Entry point
- `src/App.jsx` — Router principal (BrowserRouter) con todas las rutas
- `src/App.css` — `@import "tailwindcss"` + CSS variables + dark mode
- `src/supabaseClient.js` — Cliente Supabase desde `import.meta.env`
- `src/components/` — 14 componentes compartidos
- `src/pages/` — 12 páginas (camelCase variado, algunas PascalCase)

## Convenciones

- **Idioma**: Todo en español (UI, commits, docs, variables)
- **Estilos**: Tailwind CSS 4 + CSS variables + selectores clásicos en App.css. Sin archivos de configuración de PostCSS/Tailwind (v4 maneja todo desde CSS).
- **Dark mode**: `localStorage('theme')`, clase `dark` en `<body>`, swap de CSS variables
- **Auth**: Supabase email/password. Ruta `/admin` protegida por `<PrivateRoute>` con sesión persistente.
- **JS/JSX**: JavaScript plano, sin TypeScript

## Entorno

Variables requeridas en `.env` (gitignored, ver `.env.example`):
```
VITE_SUPABASE_DATABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=ey...
```

## Particularidades

- React Compiler habilitado via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` en `vite.config.js`
- ESLint flat config (`eslint.config.js`) con `@eslint/js`, react-hooks, react-refresh
- Deploy en Vercel con SPA rewrites (`vercel.json` redirige todo a `/index.html`)
- Git single branch (`main`), commits en español, sin PR workflow

## No olvidar

1. Siempre responde en español
2. NO hagas commit sin mi autorizador explicita
3. los mensajes de los commit deben ser cortos y tecnicos
4. nunca hagas push sin mi autorizacion explicita
