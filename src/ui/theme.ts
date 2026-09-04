/**
 * theme.ts — Tema visual: "neón" (oscuro, por defecto) ↔ "claro".
 * Se aplica como data-theme="light" en <html> y persiste en localStorage.
 * index.html lo inicializa antes del primer pintado para evitar el destello.
 */
export type Tema = 'neon' | 'claro';

const KEY = 'pt:theme';

export function temaActual(): Tema {
  return document.documentElement.dataset.theme === 'light' ? 'claro' : 'neon';
}

export function aplicarTema(t: Tema): void {
  if (t === 'claro') {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* modo privado: sin persistencia */
  }
  refrescarBotones();
}

export function alternarTema(): void {
  aplicarTema(temaActual() === 'claro' ? 'neon' : 'claro');
}

/** Botón de tema reutilizable (cabecera de tabla y de modo juego). */
export function crearBotonTema(): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = 'hud-btn';
  b.dataset.btnTema = '';
  b.onclick = alternarTema;
  ponerEtiqueta(b);
  return b;
}

function ponerEtiqueta(b: HTMLButtonElement): void {
  const claro = temaActual() === 'claro';
  b.textContent = claro ? '🌙 Modo neón' : '☀️ Modo claro';
  b.title = claro ? 'Volver al tema neón (oscuro)' : 'Cambiar a tema claro';
}

function refrescarBotones(): void {
  for (const b of document.querySelectorAll<HTMLButtonElement>('[data-btn-tema]')) {
    ponerEtiqueta(b);
  }
}
