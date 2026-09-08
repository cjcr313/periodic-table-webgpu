/**
 * atomo.ts — Modelo atómico de Bohr (SVG) y forma molecular natural.
 * Calcula la distribución de electrones por capa (regla de Madelung),
 * los neutrones del isótopo más común (masa − z) y describe cómo
 * se agrupa el elemento en moléculas en la naturaleza.
 */
import type { Elemento, CategoriaId } from '../data/elements';

// Subcapas en orden de llenado de Madelung: [n, capacidad]
const SUBCAPAS: Array<[number, number]> = [
  [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [3, 10], [4, 6],
  [5, 2], [4, 10], [5, 6], [6, 2], [4, 14], [5, 10], [6, 6],
  [7, 2], [5, 14], [6, 10], [7, 6],
];

/** Electrones por capa (Bohr): p.ej. O → [2, 6], K → [2, 8, 8, 1]. */
export function capasElectronicas(z: number): number[] {
  const capas = [0, 0, 0, 0, 0, 0, 0];
  let restantes = z;
  for (const [n, cap] of SUBCAPAS) {
    if (restantes <= 0) break;
    const toma = Math.min(cap, restantes);
    capas[n - 1] += toma;
    restantes -= toma;
  }
  while (capas.length > 1 && capas[capas.length - 1] === 0) capas.pop();
  return capas;
}

/** Neutrones del isótopo más común: masa atómica redondeada − z. */
export function neutronesAprox(masa: string, z: number): number {
  const m = Math.round(parseFloat(masa.replace(',', '.')));
  return Math.max(0, m - z);
}

/** SVG del átomo: núcleo con protones + capas con electrones girando. */
export function svgAtomo(z: number, capas: number[], n: number, color: string): string {
  const S = 320;
  const c = S / 2;
  const R = capas.length;
  const radio = (i: number): number => {
    const rMin = 44;
    const rMax = c - 12;
    if (R === 1) return 78;
    return rMin + (i * (rMax - rMin)) / (R - 1);
  };

  const partes: string[] = [];
  // Capas (órbitas) + electrones
  capas.forEach((k, i) => {
    const r = radio(i);
    partes.push(
      `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#64748b" stroke-opacity="0.35" stroke-width="1"/>`
    );
    // Cantidad de electrones de la capa, girando lentamente
    let electrones = '';
    for (let j = 0; j < k; j++) {
      const a = (j * 2 * Math.PI) / k + i * 0.7;
      const x = c + r * Math.cos(a);
      const y = c + r * Math.sin(a);
      electrones += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#67e8f9" stroke="#0e7490" stroke-width="0.8"/>`;
    }
    const dur = 16 + i * 5;
    partes.push(
      `<g><animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="${dur}s" repeatCount="indefinite"/>${electrones}</g>`
    );
    // Etiqueta de cantidad de electrones de la capa
    const la = -Math.PI / 4;
    partes.push(
      `<text x="${(c + r * Math.cos(la)).toFixed(1)}" y="${(c + r * Math.sin(la) - 4).toFixed(1)}" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">${k}e⁻</text>`
    );
  });
  // Núcleo
  partes.push(
    `<circle cx="${c}" cy="${c}" r="20" fill="${color}" fill-opacity="0.9" stroke="#0f172a" stroke-width="2"/>`
  );
  partes.push(
    `<text x="${c}" y="${c - 2}" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle" font-family="monospace">${z}p⁺</text>`
  );
  partes.push(
    `<text x="${c}" y="${c + 10}" font-size="9" fill="#0f172a" text-anchor="middle" font-family="monospace">${n}n⁰</text>`
  );

  return `<svg viewBox="0 0 ${S} ${S}" class="mx-auto my-1 block w-full" role="img" aria-label="Modelo atómico de Bohr">${partes.join('')}</svg>`;
}

// ---- Forma molecular natural ----
const MOLECULAS: Record<number, string> = {
  1: 'Diatómica: la molécula H₂ une dos átomos de hidrógeno idénticos mediante un enlace covalente simple. También forma agua (H₂O) y miles de compuestos.',
  7: 'Diatómica: N₂, dos átomos unidos por un triple enlace tan estable que compone el 78% del aire sin reaccionar.',
  8: 'Diatómica: O₂, el oxígeno que respiras. También existe como O₃ (ozono), la capa que nos filtra la radiación del Sol.',
  9: 'Diatómica: F₂, dos átomos con enlace covalente simple; gas amarillo pálido extremadamente reactivo.',
  17: 'Diatómica: Cl₂, dos átomos con enlace covalente simple; el gas verde que desinfecta las piscinas.',
  35: 'Diatómica: Br₂, dos átomos; uno de los pocos elementos moleculares líquidos a temperatura ambiente.',
  53: 'Diatómica: I₂, dos átomos; sólido violeta que sublima a vapor morado.',
  85: 'Diatómica: At₂, aunque es tan radiactivo que sus moléculas apenas se han podido estudiar.',
  15: 'Poliatómica: P₄, un tetraedro de 4 átomos (fósforo blanco); también forma redes (fósforo rojo y negro).',
  16: 'Poliatómica: S₈, anillos de 8 átomos; fundido forma cadenas largas (azufre plástico).',
  34: 'Cadenas y anillos de 8 átomos (Se₈); el selenio gris forma hélices poliméricas.',
  52: 'Cristales de capas; sus cadenas helicoidales se enlazan en redes.',
  6: 'No forma moléculas pequeñas: redes gigantes covalentes (diamante, grafito) y también moléculas grandes como el fullereno C₆₀.',
  14: 'Red covalente gigante tipo diamante: cada átomo se enlaza a otros cuatro.',
  5: 'Redes covalentes complejas de icosaedros B₁₂.',
  32: 'Red covalente tipo diamante, como el silicio.',
  33: 'Capas covalentes (arsénico gris); en vapor forma moléculas As₄.',
  51: 'Capas covalentes de átomos enlazados, con brillo metálico.',
  80: 'Metal líquido: una red metálica de átomos que fluye a temperatura ambiente.',
};

const MOLECULA_POR_CATEGORIA: Partial<Record<CategoriaId, string>> = {
  'gas-noble': 'Monatómica: no forma moléculas; sus átomos van libres porque tienen la capa completa.',
  'metal-alcalino': 'No forma moléculas: es una red metálica de átomos unidos por enlace metálico.',
  'metal-alcalinoterreo': 'No forma moléculas: red metálica de átomos unidos por enlace metálico.',
  'metal-transicion': 'No forma moléculas: red metálica de átomos unidos por enlace metálico.',
  'metal-post-transicion': 'No forma moléculas: red metálica de átomos unidos por enlace metálico.',
  lantenido: 'No forma moléculas: red metálica de átomos unidos por enlace metálico.',
  actinido: 'No forma moléculas: red metálica de átomos unidos por enlace metálico.',
  'metal-desconocido': 'Desconocido: se han creado tan pocos átomos que no se ha podido estudiar su estructura.',
  semimetal: 'Redes covalentes extendidas de átomos enlazados.',
  'no-metal': 'Átomos individuales o redes covalentes según la forma en que se presente.',
};

/** Cómo se encuentra el elemento en moléculas/estado natural. */
export function moleculaNatural(el: Elemento): string {
  return (
    MOLECULAS[el.z] ??
    MOLECULA_POR_CATEGORIA[el.categoria] ??
    'Red de átomos enlazados.'
  );
}
