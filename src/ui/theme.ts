/**
 * theme.ts — Tema visual: "papel" (claro cálido, por defecto) ↔ "tinta" (oscuro).
 * Se aplica como data-theme="tinta" en <html> y persiste en localStorage.
 * index.html lo inicializa antes del primer pintado para evitar el destello
 * y migra los valores antiguos ("neon"/"claro") de una sola vez.
 */
export type Tema = 'papel' | 'tinta';

const KEY = 'pt:theme';

export function temaActual(): Tema {
  return document.documentElement.dataset.theme === 'tinta' ? 'tinta' : 'papel';
}

export function aplicarTema(t: Tema): void {
  if (t === 'tinta') {
    document.documentElement.dataset.theme = 'tinta';
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
  aplicarTema(temaActual() === 'tinta' ? 'papel' : 'tinta');
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
  const tinta = temaActual() === 'tinta';
  b.textContent = tinta ? '☀️ Modo papel' : '🌙 Modo tinta';
  b.title = tinta ? 'Cambiar a tema papel (claro)' : 'Cambiar a tema tinta (oscuro)';
}

function refrescarBotones(): void {
  for (const b of document.querySelectorAll<HTMLButtonElement>('[data-btn-tema]')) {
    ponerEtiqueta(b);
  }
}
