"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import Stats from 'three/examples/jsm/libs/stats.module';

const RectAreaLightScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let stats: Stats;
    let meshKnot: THREE.Mesh;

    let textMesh: THREE.Mesh;
    let font: Font | undefined;

    const textConfig = {
      size: 1,
      height: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.03,
      fontName: 'helvetiker',
      fontWeight: 'bold',
    };


    const init = () => {
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animation);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Camera setup
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 5, -15);

      // Scene setup
      scene = new THREE.Scene();

      // RectAreaLight initialization
      RectAreaLightUniformsLib.init();

      const rectLight1 = new THREE.RectAreaLight(0xFF00C1, 3, 8, 15); // Height reduced to 5
      rectLight1.position.set(-10, 7.5, 5); // Lowered so bottom edge is at the floor
      scene.add(rectLight1);
      
      const rectLight2 = new THREE.RectAreaLight(0x9600FF, 3, 10, 15); // Height reduced to 5
      rectLight2.position.set(0, 7.5, 5); // Lowered so bottom edge is at the floor
      scene.add(rectLight2);
      
      const rectLight3 = new THREE.RectAreaLight(0x00FFF9, 3, 8, 15); // Height reduced to 5
      rectLight3.position.set(10, 7.5, 5); // Lowered so bottom edge is at the floor
      scene.add(rectLight3);
      
      // Add helpers
      scene.add(new RectAreaLightHelper(rectLight1));
      scene.add(new RectAreaLightHelper(rectLight2));
      scene.add(new RectAreaLightHelper(rectLight3));


      // Floor
      const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
      const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 1, metalness: 0 });
      const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
      scene.add(mshStdFloor);

      // Torus Knot
      const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
      const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
      meshKnot = new THREE.Mesh(geoKnot, matKnot);
      meshKnot.position.set(0, 5, 0);
      scene.add(meshKnot);

      loadFont(scene);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(meshKnot.position);
      controls.update();

      // Stats
      stats = new Stats();
      if (mountRef.current) {
        mountRef.current.appendChild(stats.dom);
      }

      // Handle window resize
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const loadFont = (scene: THREE.Scene) => {
      const loader = new FontLoader();
      loader.load("/fonts/helvetiker_regular.typeface.json", (loadedFont) => {
        font = loadedFont;
    
        // Create multiple text meshes
        createText(scene, "Software Dev", 7.7, 8.5, 0); // Existing text
        createText(scene, "Research",     13, 8.5, 0); // New text
        createText(scene, "GIS",          -5.5, 8.5, 0); // New text

      });
    };

    const createText = (scene: THREE.Scene, text: string, x: number, y: number, z: number) => {
      if (!font) return;
    
      const textGeo = new TextGeometry(text, {
        font,
        size: textConfig.size,
        height: textConfig.height,
        bevelEnabled: textConfig.bevelEnabled,
        bevelThickness: textConfig.bevelThickness,
        bevelSize: textConfig.bevelSize,
      });
    
      textGeo.computeBoundingBox();
      const centerOffset = -0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);
    
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
      const textMesh = new THREE.Mesh(textGeo, textMaterial);
    
      // Position the text
      textMesh.position.set(x + centerOffset, y, z);
    
      // Always apply horizontal mirroring
      textMesh.scale.set(-0.8, 0.8, 0.8);
    
      scene.add(textMesh);
    };

    const animation = (time: number) => {
      if (meshKnot) {
        meshKnot.rotation.y = time / 1000;
      }
      renderer.render(scene, camera);
      stats.update();
    };

    // Initialize the scene
    init();

    // Cleanup on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default RectAreaLightScene;
