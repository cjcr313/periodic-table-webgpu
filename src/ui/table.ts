/**
 * table.ts — Render de la tabla periódica (grid CSS), buscador y leyenda.
 */
import { ELEMENTOS, CATEGORIAS, categoriaDe, type Elemento } from '../data/elements';
import { useStore } from './store';
import { crearBotonTema } from './theme';

/** Posición en el grid: La y Ac representan a sus series en el grupo 3
 *  (como la tabla de Google); el resto de la serie va en filas separadas
 *  debajo: Ce(58)→col4 … Lu(71)→col17 y Th(90)→col4 … Lr(103)→col17. */
function gridPos(el: Elemento): { col: number; row: number } {
  if (el.z === 57) return { col: 3, row: 6 }; // La (lantánidos)
  if (el.z === 89) return { col: 3, row: 7 }; // Ac (actínidos)
  if (el.periodo === 6 && el.categoria === 'lantenido') {
    return { col: el.z - 58 + 4, row: 9 };
  }
  if (el.periodo === 7 && el.categoria === 'actinido') {
    return { col: el.z - 90 + 4, row: 10 };
  }
  return { col: el.grupo ?? 3, row: el.periodo };
}

export function renderTabla(root: HTMLElement): void {
  root.innerHTML = '';

  /** Centra la vista en la fila f de la serie y destella TODAS sus celdas
   *  (incluida La/Ac del grid principal). */
  function enfocarSerie(cat: 'lantenido' | 'actinido', color: string): void {
    const celdas = [...grid.querySelectorAll<HTMLElement>(`.cell[data-cat="${cat}"]`)];
    if (celdas.length === 0) return;
    // celdas[1] = primera celda de la fila f (Ce/Th); si no cabe, hacerla visible
    (celdas[1] ?? celdas[0]).scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <p class="text-xs text-slate-400">Beta 0.3 · 118 elementos · aprende jugando</p>
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

  for (const el of ELEMENTOS) {
    const cat = categoriaDe(el.categoria)!;
    const cell = document.createElement('button');
    const { col, row } = gridPos(el);
    cell.className =
      'cell group relative flex cursor-pointer flex-col items-center justify-center rounded-md border aspect-square transition-all duration-150 hover:z-10 hover:scale-110 hover:shadow-lg';
    cell.style.gridColumn = String(col);
    cell.style.gridRow = String(row);
    cell.style.background = `color-mix(in oklab, ${cat.color} 14%, var(--pt-cell-base))`;
    cell.style.borderColor = `color-mix(in oklab, ${cat.color} 45%, transparent)`;
    cell.dataset.z = String(el.z);
    cell.dataset.nombre = el.nombre.toLowerCase();
    cell.dataset.simbolo = el.simbolo.toLowerCase();
    cell.dataset.cat = el.categoria;
    // La (57) y Ac (89): celdas de serie — muestran masa y al seleccionarlas
    // se ilumina toda su familia (lantánidos/actínidos), como la tabla de Google.
    const esSerie = el.z === 57 || el.z === 89;
    cell.innerHTML = `
      <span class="absolute top-0.5 left-1 font-mono text-[8px] text-slate-400">${el.z}</span>
      ${esSerie ? `<span class="absolute top-0.5 right-1 font-mono text-[7px] text-slate-500">${el.masa}</span>` : ''}
      <span class="font-mono text-sm font-bold sm:text-base" style="color:${cat.color}">${el.simbolo}</span>
      <span class="max-w-full truncate px-0 text-[9px] text-slate-400">${el.nombre}</span>
    `;
    cell.onclick = () => {
      useStore.getState().seleccionar(el);
      if (esSerie) enfocarSerie(el.z === 57 ? 'lantenido' : 'actinido', cat.color);
    };
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
