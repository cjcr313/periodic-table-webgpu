/**
 * main.ts — Punto de entrada: fondo 3D, tabla, ficha y quiz.
 */
import './styles.css';
import { createBackground } from './scene/background';
import { renderTabla } from './ui/table';
import { createDetailsPanel } from './ui/details';
import { createQuiz } from './ui/quiz';
import { useStore } from './ui/store';

const canvas = document.getElementById('bg3d') as HTMLCanvasElement;
createBackground(canvas);

const app = document.getElementById('app-root')!;

const tablaHost = document.createElement('div');
tablaHost.id = 'tabla-host';
app.appendChild(tablaHost);

const details = createDetailsPanel();
const quiz = createQuiz();

let lastModo: string | null = null;
let lastSelZ: number | null = null;

function tick(): void {
  const st = useStore.getState();
  if (st.modo !== lastModo) {
    if (st.modo === 'tabla') {
      renderTabla(tablaHost);
    }
    lastModo = st.modo;
  }
  if (st.modo === 'tabla') {
    if (st.seleccionado?.z !== lastSelZ) {
      lastSelZ = st.seleccionado?.z ?? null;
      details.render();
    }
  } else {
    quiz.render();
  }
  requestAnimationFrame(tick);
}

useStore.subscribe(tick);
tick();
