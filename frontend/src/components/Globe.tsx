"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [_, setHovered] = useState(false); // React state for hover
  const hoverRef = useRef(false); // Mutable ref for hover to avoid state lag

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let meshSphere: THREE.Mesh;
    let lineSegments: THREE.LineSegments; 
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

      // Sphere
      const geoSphere = new THREE.SphereGeometry(2.5, 32, 16);
      const matSphere = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0 });
      meshSphere = new THREE.Mesh(geoSphere, matSphere);
      meshSphere.position.set(0, 5, 0);
      scene.add(meshSphere);

      // Wireframe overlay
      const wireframe = new THREE.WireframeGeometry(geoSphere);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00, // Green color
        transparent: true, // Enable transparency
        opacity: 0.2, // Set the opacity (0.0 is fully transparent, 1.0 is fully opaque)
      });
      lineSegments = new THREE.LineSegments(wireframe, lineMaterial); // Assign to lineSegments
      lineSegments.position.copy(meshSphere.position);
      lineSegments.scale.set(1.01, 1.01, 1.01); // Slightly larger to avoid z-fighting
      scene.add(lineSegments);

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
      controls.target.copy(meshSphere.position);
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
        if (meshSphere) {
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
          // Simulate Earth's rotation around an inclined axis
          meshSphere.rotation.y += direction * 0.0075;
          meshSphere.rotation.x = Math.PI / 6; // 23.5° tilt on X-axis (approximately)
        
          // Ensure the wireframe matches the sphere's rotation
          lineSegments.rotation.copy(meshSphere.rotation);
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

export default Globe;
