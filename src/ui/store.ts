/**
 * store.ts — Estado global con zustand: selección, búsqueda, modo juego.
 */
import { create } from 'zustand';
import { ELEMENTOS, type Elemento, type CategoriaId } from '../data/elements';

export type Modo = 'tabla' | 'juego';

interface QuizState {
  objetivo: Elemento;
  opciones: Elemento[];
  pistas: string[];
  pistasMostradas: number;
  resuelto: boolean | null; // null = pendiente, true = acierto, false = fallo
  puntaje: number;
  racha: number;
  preguntasTotales: number;
}

interface AppState {
  seleccionado: Elemento | null;
  busqueda: string;
  categoriaFiltro: CategoriaId | null;
  modo: Modo;
  quiz: QuizState | null;

  seleccionar: (el: Elemento | null) => void;
  setBusqueda: (q: string) => void;
  setCategoriaFiltro: (c: CategoriaId | null) => void;
  setModo: (m: Modo) => void;
  iniciarQuiz: () => void;
  responderQuiz: (el: Elemento) => void;
  mostrarPista: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nuevaPregunta(): QuizState {
  const objetivo = ELEMENTOS[Math.floor(Math.random() * ELEMENTOS.length)];
  const distractores = shuffle(ELEMENTOS.filter((e) => e.z !== objetivo.z)).slice(0, 3);
  const pistas = [
    `Categoría: ${objetivo.categoria}`,
    `Masa atómica ≈ ${objetivo.masa} u · Periodo ${objetivo.periodo}`,
    objetivo.donde,
    objetivo.descripcion,
    `Curiosidad: ${objetivo.curiosidad}`
  ];
  return {
    objetivo,
    opciones: shuffle([objetivo, ...distractores]),
    pistas,
    pistasMostradas: 1,
    resuelto: null,
    puntaje: 0,
    racha: 0,
    preguntasTotales: 0
  };
}

export const useStore = create<AppState>((set, get) => ({
  seleccionado: null,
  busqueda: '',
  categoriaFiltro: null,
  modo: 'tabla',
  quiz: null,

  seleccionar: (el) => set({ seleccionado: el }),
  setBusqueda: (q) => set({ busqueda: q }),
  setCategoriaFiltro: (c) => set({ categoriaFiltro: get().categoriaFiltro === c ? null : c }),
  setModo: (m) => set({ modo: m, seleccionado: null, quiz: m === 'juego' ? nuevaPregunta() : null }),

  iniciarQuiz: () => set({ quiz: nuevaPregunta(), modo: 'juego' }),

  responderQuiz: (el) => {
    const q = get().quiz;
    if (!q || q.resuelto !== null) return;
    const acierto = el.z === q.objetivo.z;
    const bonus = Math.max(0, 5 - q.pistasMostradas); // menos pistas = más puntos
    set({
      quiz: {
        ...q,
        resuelto: acierto,
        puntaje: q.puntaje + (acierto ? 1 + bonus : 0),
        racha: acierto ? q.racha + 1 : 0,
        preguntasTotales: q.preguntasTotales + 1
      }
    });
  },

  mostrarPista: () => {
    const q = get().quiz;
    if (!q) return;
    set({ quiz: { ...q, pistasMostradas: Math.min(q.pistas.length, q.pistasMostradas + 1) } });
  }
}));
