'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { GUI } from 'lil-gui';

const ThreeDText: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container: HTMLDivElement | null;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let group: THREE.Group;
    let textMesh1: THREE.Mesh;
    let textMesh2: THREE.Mesh;
    let textGeo: TextGeometry;
    let font: Font | undefined;
    let targetRotation = 0;
    let windowHalfX = window.innerWidth / 2;

    let autoRotation = 0.01;
    let scrollRotation = 0;
    let lastScrollY = 0;

    const textConfig = {
      text: 'Software Dev',
      size: 70,
      height: 20,
      bevelEnabled: true,
      bevelThickness: 5,
      bevelSize: 1.5,
      fontName: 'helvetiker',
      fontWeight: 'bold',
    };

    const init = () => {
      container = mountRef.current;
      if (!container) return;

      // Camera
      camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
      camera.position.set(0, 400, 700);

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.Fog(0x000000, 250, 1400);

      // Group
      group = new THREE.Group();
      group.position.y = 100;
      scene.add(group);

      // Lights
      const dirLight = new THREE.DirectionalLight(0xa27b44, 2);
      dirLight.position.set(0, 0, 1).normalize();
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(0xa27b44, 4.5);
      pointLight.position.set(0, 100, 90);
      scene.add(pointLight);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth/2, window.innerHeight/2);
      renderer.setAnimationLoop(animate);
      container.appendChild(renderer.domElement);


      loadFont();
    };

    const loadFont = () => {
      const loader = new FontLoader();
      loader.load(`/fonts/${textConfig.fontName}_${textConfig.fontWeight}.typeface.json`, (loadedFont: any) => {
        font = loadedFont;
        refreshText();
      });
    };

    const createText = () => {
      if (!font) return;

      textGeo = new TextGeometry(textConfig.text, {
        font,
        size: textConfig.size,
        height: textConfig.height,
        bevelEnabled: textConfig.bevelEnabled,
        bevelThickness: textConfig.bevelThickness,
        bevelSize: textConfig.bevelSize,
      });

      textGeo.computeBoundingBox();
      const centerOffset = -0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);

      textMesh1 = new THREE.Mesh(textGeo, [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
      ]);
      textMesh1.position.set(centerOffset, 30, 0);
      group.add(textMesh1);
    };

    const refreshText = () => {
      group.clear();
      createText();
    };



    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };


    const animate = () => {
      group.rotation.y += autoRotation + scrollRotation;
      scrollRotation *= 0.9;

      camera.lookAt(group.position);
      renderer.render(scene, camera);
    };
    

    const handleWheel = (event: WheelEvent) => {
      const scrollSpeed = 0.001;
      scrollRotation += event.deltaY * scrollSpeed;
    };


    // Initialize the scene
    init();

    // Add scroll event listener
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', onWindowResize);

    // Cleanup on component unmount
    return () => {
      if (container) container.innerHTML = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
)};

export default ThreeDText;
