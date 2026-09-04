/**
 * details.ts — Panel lateral con la ficha del elemento seleccionado.
 */
import { categoriaDe } from '../data/elements';
import { useStore } from './store';

export function createDetailsPanel(): { render: () => void } {
  let panel: HTMLElement | null = null;

  function render(): void {
    const { seleccionado, seleccionar } = useStore.getState();

    if (panel) {
      panel.remove();
      panel = null;
    }
    if (!seleccionado) return;

    const el = seleccionado;
    const cat = categoriaDe(el.categoria)!;

    panel = document.createElement('aside');
    panel.className =
      'glass fade-in fixed top-4 right-4 z-30 max-h-[92vh] w-[340px] overflow-y-auto rounded-xl p-4';
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
        <button id="cerrar-ficha" class="icon-btn shrink-0" title="Cerrar">✕</button>
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
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">🌍 Dónde se encuentra</h3>
          <p>${el.donde}</p>
        </div>
        <div>
          <h3 class="mb-0.5 text-[10px] font-semibold tracking-wider text-amber-300 uppercase">💡 Curiosidad</h3>
          <p>${el.curiosidad}</p>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector('#cerrar-ficha')!.addEventListener('click', () => {
      seleccionar(null);
      render();
    });
  }

  return { render };
}
