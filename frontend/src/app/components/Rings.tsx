"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

const Rings: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ ,setHovered] = useState(false); // React state for hover
  const hoverRef = useRef(false); // Mutable ref for hover to avoid state lag

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let torus1: THREE.Mesh; 
    let torus2: THREE.Mesh; 
    let gem: THREE.Mesh; 
    let hoverCube: THREE.Mesh;
    let raycaster: THREE.Raycaster;
    let mouse: THREE.Vector2;

    const init = () => {
      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(300, 300);
      renderer.setAnimationLoop(animation);

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Camera setup (tight view around the object)
      const aspectRatio = 1; // Square aspect ratio to match the renderer size
      camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 100);
      camera.position.set(0, 5, -10); // Position camera to view the torus knot directly

      // Scene setup
      scene = new THREE.Scene();

      // RectAreaLight initialization
      RectAreaLightUniformsLib.init();

      const rectLight1 = new THREE.RectAreaLight(0x9600ff, 5, 8, 15);
      rectLight1.position.set(-10, 7.5, 5);
      scene.add(rectLight1);

      const rectLight2 = new THREE.RectAreaLight(0x00fff9, 5, 8, 15);
      rectLight2.position.set(0, 7.5, 5);
      scene.add(rectLight2);

      const rectLight3 = new THREE.RectAreaLight(0xff00c1, 5, 8, 15);
      rectLight3.position.set(10, 7.5, 5);
      scene.add(rectLight3);


      // Torus 1
      const geoTorus1 = new THREE.TorusGeometry(2, 0.4, 16, 100);
      const matTorus1 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0 });
      torus1 = new THREE.Mesh(geoTorus1, matTorus1);
      torus1.position.set(0, 5, 0); // Adjust position
      torus1.rotation.z = Math.PI / 1;
      scene.add(torus1);

      // Torus 2
      const geoTorus2 = new THREE.TorusGeometry(2, 0.4, 16, 100);
      const matTorus2 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0 });
      torus2 = new THREE.Mesh(geoTorus2, matTorus2);
      torus2.rotation.x = Math.PI / 1; // Rotate 90 degrees around X-axis
      torus2.position.set(0, 5, 0); // Same position as Torus 1 for overlap
      scene.add(torus2);

      // Cube
      const geoGem = new THREE.OctahedronGeometry(0.8, 0); // Dimensions of the cube
      const matGem = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Red color for contrast
        roughness: 0,  // Material roughness for lighting
        metalness: 10,  // Material metalness for slight shine
      });
      gem = new THREE.Mesh(geoGem, matGem);
      gem.position.set(0, 5, 0); // Same position as the tori to place it in the middle
      scene.add(gem);


      // Hover Cube (Visible for Testing)
      const geoCube = new THREE.BoxGeometry(4, 4, 4); // Adjust size to fully enclose the torus knot
      const matCube = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.0, // Semi-transparent for visibility
      });
      hoverCube = new THREE.Mesh(geoCube, matCube);
      hoverCube.position.set(0, 5, 0); // Match the position of the torus knot
      scene.add(hoverCube);

      // Raycaster and mouse setup
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      const handleMouseMove = (event: MouseEvent) => {
        if (!renderer.domElement) return;

        const bounds = renderer.domElement.getBoundingClientRect(); // Get the renderer's DOM bounds
        mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(torus1.position);
      controls.update();

      // Handle window resize
      // window.addEventListener('resize', onWindowResize);
    };

    // const onWindowResize = () => {
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    // };

    const animation = () => {
        if (torus1) {
          // Check for hover using raycaster on the hoverCube
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObject(hoverCube);
  
          const isHovered = intersects.length > 0;
          if (hoverRef.current !== isHovered) {
            hoverRef.current = isHovered;
            setHovered(isHovered); // Update React state only when hover state changes
          }
  
          // Rotate the object based on hover state
          const direction = hoverRef.current ? -1 : 1;
          torus1.rotation.y += direction * 0.01;
          torus1.rotation.x += direction * 0.01;
        }

        if (torus2) {
            // Check for hover using raycaster on the hoverCube
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(hoverCube);
    
            const isHovered = intersects.length > 0;
            if (hoverRef.current !== isHovered) {
              hoverRef.current = isHovered;
              setHovered(isHovered); // Update React state only when hover state changes
            }
    
            // Rotate the object based on hover state
            const direction = hoverRef.current ? -1 : 1;
            torus2.rotation.y += direction * 0.01;
            torus1.rotation.x += direction * 0.01;
          }

        if (gem) {
            // Check for hover using raycaster on the hoverCube
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(hoverCube);
    
            const isHovered = intersects.length > 0;
            if (hoverRef.current !== isHovered) {
              hoverRef.current = isHovered;
              setHovered(isHovered); // Update React state only when hover state changes
            }
    
            // Rotate the object based on hover state
            const direction = hoverRef.current ? -1 : 1;
            gem.rotation.y += direction * 0.01; // Rotate the cube around its Y-axis
            gem.rotation.x += direction * 0.005; // Add a slight rotation on the X-axis
          }

  
        renderer.render(scene, camera);
      };
  

    // Initialize the scene
    init();

    // Cleanup on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      // window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '300px', height: '300px', margin: 'auto' }} />;
};

export default Rings;