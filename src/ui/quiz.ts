/**
 * quiz.ts — Modo juego: adivina el elemento por pistas.
 */
import { useStore } from './store';
import { crearBotonTema } from './theme';

export function createQuiz(): { render: () => void } {
  let root: HTMLElement | null = null;
  // main.ts llama render() en cada frame; esta firma evita reconstruir el DOM
  // del quiz ~60 veces/seg (botones re-creados constantemente = clics fallidos).
  let firma: string | null = null;

  function render(): void {
    const st = useStore.getState();
    if (st.modo !== 'juego' || !st.quiz) {
      if (root) {
        root.remove();
        root = null;
      }
      firma = null;
      return;
    }

    if (!root) {
      root = document.createElement('div');
      root.id = 'quiz-root';
      document.getElementById('app-root')!.prepend(root);
    }

    const q = st.quiz;
    const sig = JSON.stringify({
      objetivo: q.objetivo.z,
      opciones: q.opciones.map((o) => o.z),
      pistasMostradas: q.pistasMostradas,
      resuelto: q.resuelto,
      puntaje: q.puntaje,
      racha: q.racha,
      preguntasTotales: q.preguntasTotales
    });
    if (sig === firma) return;
    firma = sig;
    root.className = 'mx-auto max-w-3xl';
    root.innerHTML = `
      <header class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-xl font-bold tracking-tight text-cyan-200">🎮 ¿Qué elemento soy?</h1>
          <p class="text-xs text-slate-400">Adivina con las pistas · menos pistas = más puntos</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="chip">⭐ ${q.puntaje} pts</span>
          <span class="chip">🔥 racha ${q.racha}</span>
          <button id="btn-tabla" class="hud-btn">📊 Volver a la tabla</button>
        </div>
      </header>

      <div class="glass rounded-xl p-5">
        <div class="space-y-2">
          ${q.pistas
            .slice(0, q.pistasMostradas)
            .map(
              (p, i) => `
            <div class="flex gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-2 text-[13px] text-slate-200">
              <span class="font-mono text-cyan-300">${i + 1}.</span><span>${p}</span>
            </div>`
            )
            .join('')}
        </div>

        ${q.resuelto === null ? `
        <div class="mt-4 flex items-center justify-between">
          <button id="btn-pista" class="hud-btn" ${q.pistasMostradas >= q.pistas.length ? 'disabled' : ''}>💡 Otra pista</button>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          ${q.opciones
            .map(
              (o) => `
            <button class="opt hud-btn flex-col! py-3" data-z="${o.z}">
              <span class="font-mono text-lg font-bold">${o.simbolo}</span>
              <span class="text-[10px] text-slate-400">${o.nombre}</span>
            </button>`
            )
            .join('')}
        </div>` : `
        <div class="mt-4 rounded-lg border px-4 py-3 text-center ${q.resuelto ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200' : 'border-rose-400/50 bg-rose-500/10 text-rose-200'}">
          ${q.resuelto
            ? `¡Correcto! Era <b>${q.objetivo.nombre}</b> (${q.objetivo.simbolo}) 🎉`
            : `Era <b>${q.objetivo.nombre}</b> (${q.objetivo.simbolo}). ¡La próxima cae! 💪`}
          <p class="mt-1 text-[11px] text-slate-400">💡 ${q.objetivo.curiosidad}</p>
        </div>
        <div class="mt-3 flex justify-center">
          <button id="btn-siguiente" class="hud-btn active">▶ Siguiente pregunta</button>
        </div>`}
      </div>
    `;

    root.querySelector('#btn-tabla')!.addEventListener('click', () => {
      useStore.getState().setModo('tabla');
    });
    // Botón de tema también disponible en modo juego
    const filaAcciones = root.querySelector('#btn-tabla')!.parentElement!;
    filaAcciones.insertBefore(crearBotonTema(), root.querySelector('#btn-tabla'));
    root.querySelector('#btn-pista')?.addEventListener('click', () => {
      useStore.getState().mostrarPista();
      render();
    });
    for (const b of root.querySelectorAll<HTMLButtonElement>('.opt')) {
      b.addEventListener('click', () => {
        const z = Number(b.dataset.z);
        const el = q.opciones.find((o) => o.z === z)!;
        useStore.getState().responderQuiz(el);
        render();
      });
    }
    root.querySelector('#btn-siguiente')?.addEventListener('click', () => {
      useStore.getState().iniciarQuiz();
      render();
    });
  }

  return { render };
}
