/**
 * background.ts — Fondo 3D sutil: campo de esferas/núcleos girando lentamente.
 * Usa WebGLRenderer clásico (WebGPURenderer no aporta aquí y pesa más).
 */
import * as THREE from 'three';

export function createBackground(canvas: HTMLCanvasElement): { dispose: () => void } {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 50);

  // Núcleo central emisivo
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(6, 2),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.28 })
  );
  scene.add(core);

  // Nube de "electrones" (puntos)
  const N = 900;
  const pos = new Float32Array(N * 3);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = 14 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
    speeds[i] = 0.0002 + Math.random() * 0.0006;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.35, transparent: true, opacity: 0.55 })
  );
  scene.add(points);

  function onResize(): void {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  let raf = 0;
  const clock = new THREE.Clock();
  function frame(): void {
    const t = clock.getElapsedTime();
    core.rotation.y = t * 0.08;
    core.rotation.x = Math.sin(t * 0.1) * 0.2;
    points.rotation.y = t * 0.015;
    points.rotation.z = Math.sin(t * 0.05) * 0.05;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  frame();

  return {
    dispose(): void {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      renderer.dispose();
    }
  };
}
