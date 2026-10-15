import * as THREE from 'three';

export function initGlobe(canvas) {
  if (!canvas) return null;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 2.8;

  const particleCount = 4200;
  const positions = new Float32Array(particleCount * 3);
  const radius = 1;

  for (let i = 0; i < particleCount; i += 1) {
    const phi = Math.acos(1 - 2 * Math.random());
    const theta = Math.random() * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * 0.015;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xd1dce1,
    size: 0.012,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });

  const globe = new THREE.Points(geometry, material);
  scene.add(globe);

  const accentGeometry = new THREE.BufferGeometry();
  const accentPositions = new Float32Array(3);
  accentPositions[0] = 0.55;
  accentPositions[1] = 0.85;
  accentPositions[2] = 0.35;
  accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));

  const accent = new THREE.Points(
    accentGeometry,
    new THREE.PointsMaterial({
      color: 0xf69000,
      size: 0.05,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    }),
  );
  scene.add(accent);

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  window.addEventListener('pointermove', onPointerMove);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener('resize', resize);

  let rafId = 0;
  const clock = new THREE.Clock();

  const animate = () => {
    const elapsed = clock.getElapsedTime();
    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;

    globe.rotation.y = elapsed * 0.08 + pointer.x * 0.15;
    globe.rotation.x = pointer.y * 0.12;

    accent.rotation.copy(globe.rotation);

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };

  animate();

  return {
    destroy() {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      accentGeometry.dispose();
      material.dispose();
      accent.material.dispose();
      renderer.dispose();
    },
  };
}
