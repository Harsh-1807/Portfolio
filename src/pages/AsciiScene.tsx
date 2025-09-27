import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore - examples typings may be missing; declared in declarations.d.ts
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
// @ts-ignore - examples typings may be missing; declared in declarations.d.ts
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

const AsciiScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const start = Date.now();

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(200, 20, 10),
      new THREE.MeshPhongMaterial({ flatShading: true })
    );
    scene.add(sphere);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
    );
    plane.position.y = -200;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    mountRef.current.appendChild(effect.domElement);

    const controls = new TrackballControls(camera, effect.domElement);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const timer = Date.now() - start;
      sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
      sphere.rotation.x = timer * 0.0003;
      sphere.rotation.z = timer * 0.0002;
      controls.update();
      effect.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && effect.domElement) {
        mountRef.current.removeChild(effect.domElement);
      }
      effect.dispose?.();
      renderer.dispose();
      sphere.geometry.dispose();
      (sphere.material as any).dispose?.();
      plane.geometry.dispose();
      (plane.material as any).dispose?.();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default AsciiScene;


