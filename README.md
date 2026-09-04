# ⚛️ Tabla Periódica Interactiva — Three.js

Tabla periódica interactiva en **español** con fichas de los **118 elementos**, buscador, filtro por categoría, panel de detalle (descripción, dónde se encuentra, curiosidad) y **modo juego** para aprender jugando. Visual 3D sutil de fondo con Three.js. **Beta 0.1**.

![lang](https://img.shields.io/badge/lang-TypeScript-3178c6)
![build](https://img.shields.io/badge/build-Vite-646cff)
![style](https://img.shields.io/badge/style-Tailwind%20v4-38bdf8)
![3d](https://img.shields.io/badge/3D-Three.js-ffffff)

**🌐 Sitio:** <https://cjcr313.github.io/periodic-table-webgpu/>

---

## ✨ Características

- **118 elementos** con símbolo, nombre, número atómico, masa atómica, grupo y periodo.
- **Colores por categoría** (metal alcalino, gas noble, lantánido…) con leyenda-filtro clicable.
- **Ficha de detalle** al hacer clic: descripción en español, **dónde se encuentra** (naturaleza / sintético / universo) y una **curiosidad**.
- **Buscador** por nombre, símbolo o número atómico.
- **Modo juego 🎮**: adivina el elemento por pistas progresivas; menos pistas = más puntos, con puntaje y racha.
- **Fondo 3D sutil** (Three.js): núcleo wireframe y nube de electrones rotando lento, sin robar protagonismo.

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| 3D | `three` (WebGLRenderer, escena ligera de fondo) |
| Estado | `zustand` |
| Estilos | `tailwindcss` v4 (`@tailwindcss/vite`) |
| Build | `vite` 7 + `typescript` (strict) |

## 🚀 Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build a dist/
npm run preview
```

## 📦 Deploy (GitHub Pages)

Deploy estático desde la rama `gh-pages` (build de `dist/` con `base: '/periodic-table-webgpu/'`):

```bash
npm run build
npx gh-pages -d dist   # o: git subtree push --prefix dist origin gh-pages
```

## 🗺️ Roadmap (post-0.1)

- Vista 3D completa de la tabla (navegable)
- Modos de juego extra (clasificar por categoría, ordenar por masa)
- Fichas ampliadas con electronegatividad, configuración electrónica, isótopos

---

Hecho con ☕ y ⚛️ · Beta 0.1 · 2026
