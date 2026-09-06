/**
 * details.ts — Ficha del elemento seleccionado, como modal centrado.
 * Se cierra con ✕, clic fuera de la caja o tecla Escape.
 */
import { categoriaDe } from '../data/elements';
import { useStore } from './store';

export function createDetailsPanel(): { render: () => void } {
  let overlay: HTMLElement | null = null;
  let panel: HTMLElement | null = null;

  function onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') cerrar(true);
  }

  function cerrar(notificar = false): void {
    document.removeEventListener('keydown', onKey);
    if (overlay) {
      overlay.remove();
      overlay = null;
      panel = null;
    }
    if (notificar) useStore.getState().seleccionar(null);
  }

  function render(): void {
    const { seleccionado } = useStore.getState();
    cerrar();
    if (!seleccionado) return;

    const el = seleccionado;
    const cat = categoriaDe(el.categoria)!;

    overlay = document.createElement('div');
    overlay.className =
      'fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm';
    // Clic en el fondo (fuera de la caja) cierra la ficha
    overlay.onclick = (e) => {
      if (e.target === overlay) cerrar(true);
    };

    panel = document.createElement('aside');
    panel.className =
      'glass fade-in relative max-h-[86vh] w-full max-w-md overflow-y-auto rounded-xl p-5';
    panel.innerHTML = `
      <div class="mb-3 flex items-start justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="flex h-16 w-16 flex-col items-center justify-center rounded-lg border"
               style="background:color-mix(in oklab, ${cat.color} 16%, var(--pt-cell-base));border-color:color-mix(in oklab, ${cat.color} 55%, transparent)">
            <span class="font-mono text-2xl font-bold" style="color:${cat.color}">${el.simbolo}</span>
            <span class="font-mono text-[9px] text-slate-400">z=${el.z}</span>
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-100">${el.nombre}</h2>
            <p class="text-[11px]" style="color:${cat.color}">${cat.nombre}</p>
          </div>
        </div>
        <button id="cerrar-ficha" class="hud-btn shrink-0 px-2 py-0.5" title="Cerrar (Esc)">✕</button>
      </div>

      <dl class="space-y-1 font-mono text-[11px] text-slate-300">
        <div class="flex justify-between"><dt class="text-slate-500">Número atómico</dt><dd>${el.z}</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">Masa atómica</dt><dd>${el.masa} u</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">Grupo</dt><dd>${el.grupo ?? '— (serie f)'}</dd></div>
        <div class="flex justify-between"><dt class="text-slate-500">Periodo</dt><dd>${el.periodo}</dd></div>
      </dl>

      <div class="mt-3 space-y-2.5 text-[12px] leading-relaxed text-slate-300">
        <div>
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-cyan-300 uppercase">Descripción</h3>
          <p>${el.descripcion}</p>
        </div>
        <div>
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-violet-300 uppercase">🔬 Descubrimiento</h3>
          <p>${el.descubridor ? `Descubierto por ${el.descubridor} en ${el.anioDescubrimiento}.` : 'Conocido desde la antigüedad.'}</p>
        </div>
        <div>
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">🌍 En la naturaleza</h3>
          <p>${el.donde}</p>
        </div>
        <div>
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-amber-300 uppercase">💡 Curiosidad</h3>
          <p>${el.curiosidad}</p>
        </div>
      </div>
    `;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    panel.querySelector('#cerrar-ficha')!.addEventListener('click', () => cerrar(true));
    document.addEventListener('keydown', onKey);
  }

  return { render };
}
