import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import disturbImg from '../images/disturb.jpg';

const SpotlightScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap as any;
    renderer.toneMapping = THREE.ACESFilmicToneMapping as any;
    renderer.toneMappingExposure = 1;
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(7, 4, 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 1, 0);
    controls.update();

    const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
    scene.add(ambient);

    const loader = new THREE.TextureLoader();
    const disturb = loader.load(disturbImg as unknown as string);
    disturb.minFilter = THREE.LinearFilter;
    disturb.magFilter = THREE.LinearFilter;
    disturb.generateMipmaps = false;
    disturb.colorSpace = THREE.SRGBColorSpace as any;

    const spotLight = new THREE.SpotLight(0xffffff, 100);
    spotLight.position.set(2.5, 5, 2.5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 0;
    (spotLight as any).map = disturb;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.focus = 1;
    scene.add(spotLight);

    const helper = new (THREE as any).SpotLightHelper(spotLight);
    scene.add(helper);

    const planeGeom = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.MeshLambertMaterial({ color: 0xbcbcbc });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 16),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    sphere.position.y = 1;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = performance.now() / 3000;
      spotLight.position.x = Math.cos(time) * 2.5;
      spotLight.position.z = Math.sin(time) * 2.5;
      (helper as any).update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeom.dispose();
      (plane.material as any).dispose?.();
      (sphere.geometry as any).dispose?.();
      (sphere.material as any).dispose?.();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default SpotlightScene;


