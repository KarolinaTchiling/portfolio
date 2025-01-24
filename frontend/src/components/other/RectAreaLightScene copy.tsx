"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import Stats from 'three/examples/jsm/libs/stats.module';

const RectAreaLightScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let stats: Stats;
    let meshKnot: THREE.Mesh;

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
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 5, -15);

      // Scene setup
      scene = new THREE.Scene();

      // RectAreaLight initialization
      RectAreaLightUniformsLib.init();

      const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
      rectLight1.position.set(-5, 5, 5);
      scene.add(rectLight1);

      const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
      rectLight2.position.set(0, 5, 5);
      scene.add(rectLight2);

      const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
      rectLight3.position.set(5, 5, 5);
      scene.add(rectLight3);

      scene.add(new RectAreaLightHelper(rectLight1));
      scene.add(new RectAreaLightHelper(rectLight2));
      scene.add(new RectAreaLightHelper(rectLight3));

      // Floor
      const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
      const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 0.1, metalness: 0 });
      const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
      scene.add(mshStdFloor);

      // Torus Knot
      const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
      const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
      meshKnot = new THREE.Mesh(geoKnot, matKnot);
      meshKnot.position.set(0, 5, 0);
      scene.add(meshKnot);

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
