/**
 * table.ts — Render de la tabla periódica (grid CSS), buscador y leyenda.
 */
import { ELEMENTOS, CATEGORIAS, categoriaDe, type Elemento } from '../data/elements';
import { useStore } from './store';
import { crearBotonTema } from './theme';

/** Columna/fila para lantánidos y actínidos (fila separada bajo la tabla). */
function gridPos(el: Elemento): { col: number; row: number } {
  if (el.periodo === 6 && el.categoria === 'lantenido') {
    return { col: el.z - 57 + 3, row: 9 }; // La (57) → col 3 … Lu (71) → col 17
  }
  if (el.periodo === 7 && el.categoria === 'actinido') {
    return { col: el.z - 89 + 3, row: 10 };
  }
  return { col: el.grupo ?? 3, row: el.periodo };
}

export function renderTabla(root: HTMLElement): void {
  root.innerHTML = '';

  /** Hace scroll hasta la serie f y destella sus celdas (57–71 / 89–103). */
  function enfocarSerie(cat: 'lantenido' | 'actinido', color: string): void {
    const celdas = [...grid.querySelectorAll<HTMLElement>(`.cell[data-cat="${cat}"]`)];
    if (celdas.length === 0) return;
    celdas[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    for (const c of celdas) {
      c.animate(
        [
          { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
          { boxShadow: `0 0 16px 2px ${color}`, offset: 0.5 },
          { boxShadow: '0 0 0 0 rgba(0,0,0,0)' }
        ],
        { duration: 1100, iterations: 2 }
      );
    }
  }

  // ---------- Header ----------
  const header = document.createElement('header');
  header.className = 'mb-4 flex flex-wrap items-center justify-between gap-3';
  header.innerHTML = `
    <div>
      <h1 class="text-xl font-bold tracking-tight text-cyan-200">⚛️ Tabla Periódica Interactiva</h1>
      <p class="text-xs text-slate-400">Beta 0.2 · 118 elementos · aprende jugando</p>
    </div>
    <div id="header-acciones" class="flex items-center gap-2">
      <input id="buscador" type="search" placeholder="Buscar: nombre, símbolo o nº…"
        class="glass w-56 rounded-md px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-400/60" />
      <button id="btn-juego" class="hud-btn">🎮 Modo juego</button>
    </div>
  `;
  root.appendChild(header);
  // Botón de tema (☀️ claro / 🌙 neón) junto al modo juego
  header
    .querySelector('#header-acciones')!
    .insertBefore(crearBotonTema(), header.querySelector('#btn-juego'));

  // ---------- Leyenda de categorías ----------
  const leyenda = document.createElement('div');
  leyenda.className = 'mb-3 flex flex-wrap gap-1.5';
  for (const c of CATEGORIAS) {
    const b = document.createElement('button');
    b.className = 'chip';
    b.dataset.cat = c.id;
    b.innerHTML = `<span class="mr-1.5 inline-block h-2 w-2 rounded-full" style="background:${c.color}"></span>${c.nombre}`;
    b.onclick = () => {
      useStore.getState().setCategoriaFiltro(c.id);
      sincronizarFiltros();
    };
    leyenda.appendChild(b);
  }
  root.appendChild(leyenda);

  // ---------- Grid ----------
  const wrap = document.createElement('div');
  wrap.className = 'overflow-x-auto pb-2';
  const grid = document.createElement('div');
  grid.id = 'tabla-grid';
  grid.className =
    'grid min-w-[900px] gap-[3px]';
  (grid as HTMLElement).style.gridTemplateColumns = 'repeat(18, minmax(0, 1fr))';
  wrap.appendChild(grid);
  root.appendChild(wrap);

  // Marcadores de posición para lantánidos/actínidos en las celdas 57-71 / 89-103.
  // Al hacer clic, llevan hasta la fila real de la serie (con destello).
  const gapLa = document.createElement('button');
  gapLa.style.gridColumn = '3';
  gapLa.style.gridRow = '6';
  gapLa.className = 'flex cursor-pointer items-center justify-center rounded border border-pink-400/40 bg-pink-500/10 text-[9px] text-pink-300 transition-all duration-150 hover:scale-105 hover:border-pink-400/80';
  gapLa.innerHTML = '57–71<br>La–Lu';
  gapLa.title = 'Lantánidos: ver su fila ↓';
  gapLa.setAttribute('aria-label', 'Ver lantánidos (57–71)');
  gapLa.onclick = () => enfocarSerie('lantenido', '#f472b6');
  grid.appendChild(gapLa);
  const gapAc = document.createElement('button');
  gapAc.style.gridColumn = '3';
  gapAc.style.gridRow = '7';
  gapAc.className = 'flex cursor-pointer items-center justify-center rounded border border-fuchsia-400/40 bg-fuchsia-500/10 text-[9px] text-fuchsia-300 transition-all duration-150 hover:scale-105 hover:border-fuchsia-400/80';
  gapAc.innerHTML = '89–103<br>Ac–Lr';
  gapAc.title = 'Actínidos: ver su fila ↓';
  gapAc.setAttribute('aria-label', 'Ver actínidos (89–103)');
  gapAc.onclick = () => enfocarSerie('actinido', '#e879f9');
  grid.appendChild(gapAc);

  // Etiquetas de serie a la izquierda de las filas f (cols 1–2)
  const lblLa = document.createElement('div');
  lblLa.className = 'f-label';
  lblLa.style.gridColumn = '1 / span 2';
  lblLa.style.gridRow = '9';
  lblLa.textContent = 'Lantánidos';
  grid.appendChild(lblLa);
  const lblAc = document.createElement('div');
  lblAc.className = 'f-label act';
  lblAc.style.gridColumn = '1 / span 2';
  lblAc.style.gridRow = '10';
  lblAc.textContent = 'Actínidos';
  grid.appendChild(lblAc);

  for (const el of ELEMENTOS) {
    const cat = categoriaDe(el.categoria)!;
    const cell = document.createElement('button');
    const { col, row } = gridPos(el);
    cell.className =
      'cell fade-in group relative flex cursor-pointer flex-col items-center justify-center rounded-md border aspect-square transition-all duration-150 hover:z-10 hover:scale-110 hover:shadow-lg';
    cell.style.gridColumn = String(col);
    cell.style.gridRow = String(row);
    cell.style.background = `color-mix(in oklab, ${cat.color} 14%, var(--pt-cell-base))`;
    cell.style.borderColor = `color-mix(in oklab, ${cat.color} 45%, transparent)`;
    cell.dataset.z = String(el.z);
    cell.dataset.nombre = el.nombre.toLowerCase();
    cell.dataset.simbolo = el.simbolo.toLowerCase();
    cell.dataset.cat = el.categoria;
    cell.innerHTML = `
      <span class="absolute top-0.5 left-1 font-mono text-[8px] text-slate-400">${el.z}</span>
      <span class="font-mono text-sm font-bold sm:text-base" style="color:${cat.color}">${el.simbolo}</span>
      <span class="max-w-full truncate px-1 text-[7px] text-slate-400">${el.nombre}</span>
    `;
    cell.onclick = () => useStore.getState().seleccionar(el);
    grid.appendChild(cell);
  }

  // ---------- Buscador ----------
  const input = header.querySelector<HTMLInputElement>('#buscador')!;
  input.oninput = () => {
    useStore.getState().setBusqueda(input.value.trim().toLowerCase());
    sincronizarFiltros();
  };

  header.querySelector<HTMLButtonElement>('#btn-juego')!.onclick = () =>
    useStore.getState().iniciarQuiz();

  function sincronizarFiltros(): void {
    const { busqueda, categoriaFiltro } = useStore.getState();
    for (const cell of grid.querySelectorAll<HTMLButtonElement>('.cell')) {
      const matchBusq =
        !busqueda ||
        cell.dataset.z === busqueda ||
        cell.dataset.nombre!.includes(busqueda) ||
        cell.dataset.simbolo!.startsWith(busqueda);
      const matchCat = !categoriaFiltro || cell.dataset.cat === categoriaFiltro;
      cell.style.opacity = matchBusq && matchCat ? '1' : '0.15';
      cell.style.pointerEvents = matchBusq && matchCat ? 'auto' : 'none';
    }
    for (const chip of leyenda.querySelectorAll<HTMLButtonElement>('.chip')) {
      chip.classList.toggle('active', chip.dataset.cat === categoriaFiltro);
    }
  }
}
