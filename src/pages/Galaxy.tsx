import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GalaxyGeometry, GalaxyShader } from "threejs-galaxy-shader";
import AsciiScene from './AsciiScene';
import SpotlightScene from './SpotlightScene';

let isFirst = true;

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<any | null>(null);
  const rendererRef = useRef<any | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const galaxyConfig = {
      spiralCount: 3,
      turnsPerSpiral: 1.0,
      totalStars: 15000,
      pointSize: 2.0,
      blackHoleRadius: 0.1,
      colorMode: 2,
      color: new THREE.Color(0x00ff88),
      colorIntensity: 1.0,
    };

    const geometry = new GalaxyGeometry(galaxyConfig.totalStars);
    const material = new GalaxyShader({
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      color: galaxyConfig.color,
      pointSize: galaxyConfig.pointSize,
      totalStars: galaxyConfig.totalStars,
      time: 0,
      blackHoleRadius: galaxyConfig.blackHoleRadius,
      blackHolePosition: new THREE.Vector3(0, 0, 0),
      spiralCount: galaxyConfig.spiralCount,
      turnsPerSpiral: galaxyConfig.turnsPerSpiral,
      colorMode: galaxyConfig.colorMode,
      colorIntensity: galaxyConfig.colorIntensity,
      fadeNear: 5.0,
      fadeFar: 100.0,
    });

    const points = new THREE.Points(geometry, material);

    const blackHoleGeometry = new THREE.SphereGeometry(
      galaxyConfig.blackHoleRadius,
      16,
      16
    );
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);

    scene.add(points);
    scene.add(blackHole);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = performance.now() / 10000 / 5;
      material.uniforms.u_time.value = time;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      <AsciiScene />
      <SpotlightScene />
    </div>
  );
};

export default ThreeScene;


