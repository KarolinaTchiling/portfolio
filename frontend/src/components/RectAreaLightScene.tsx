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
    let meshSphere: THREE.Mesh;
    let lineSegments: THREE.LineSegments; 

    let torus1: THREE.Mesh; 
    let torus2: THREE.Mesh; 
    let cube: THREE.Mesh; 

    let textMesh: THREE.Mesh;
    let font: Font | undefined;

    let raycaster: THREE.Raycaster;
    let mouse: THREE.Vector2;
    const clickableObjects: THREE.Object3D[] = [];
    let hoveredObject: THREE.Object3D | null = null;

    const textConfig = {
      size: 1,
      height: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.06,
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

      // Raycaster and mouse
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      // RectAreaLight initialization
      RectAreaLightUniformsLib.init();

      const rectLight1 = new THREE.RectAreaLight(0xFF00C1, 3, 12, 15); // Height reduced to 5
      rectLight1.position.set(-12, 7.5, 5); // Lowered so bottom edge is at the floor
      scene.add(rectLight1);
      
      const rectLight2 = new THREE.RectAreaLight(0x9600FF, 3, 12, 15); // Height reduced to 5
      rectLight2.position.set(0, 7.5, 5); // Lowered so bottom edge is at the floor
      scene.add(rectLight2);
      
      const rectLight3 = new THREE.RectAreaLight(0x00FFF9, 3, 12, 15); // Height reduced to 5
      rectLight3.position.set(12, 7.5, 5); // Lowered so bottom edge is at the floor
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


      // Torus 1
      const geoTorus1 = new THREE.TorusGeometry(2, 0.4, 16, 100);
      const matTorus1 = new THREE.MeshStandardMaterial({
        color: 0xffffff
      });
      torus1 = new THREE.Mesh(geoTorus1, matTorus1);
      torus1.position.set(9, 5, 0); // Adjust position
      torus1.rotation.z = Math.PI / 1;
      scene.add(torus1);

      // Torus 2
      const geoTorus2 = new THREE.TorusGeometry(2, 0.4, 16, 100);
      const matTorus2 = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
      torus2 = new THREE.Mesh(geoTorus2, matTorus2);
      torus2.rotation.x = Math.PI / 1; // Rotate 90 degrees around X-axis
      torus2.position.set(9, 5, 0); // Same position as Torus 1 for overlap
      scene.add(torus2);

      // Cube
      const geoCube = new THREE.BoxGeometry(1.5, 1.5, 1.5); // Dimensions of the cube
      const matCube = new THREE.MeshStandardMaterial({
        color: 0xff0000, // Red color for contrast
        roughness: 1,  // Material roughness for lighting
        metalness: 1,  // Material metalness for slight shine
      });
      cube = new THREE.Mesh(geoCube, matCube);
      cube.position.set(9, 5, 0); // Same position as the tori to place it in the middle
      scene.add(cube);

      // Torus Knot
      const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
      const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
      meshKnot = new THREE.Mesh(geoKnot, matKnot);
      meshKnot.position.set(0, 5, 0);
      scene.add(meshKnot);

      // Sphere
      const geoSphere = new THREE.SphereGeometry(2.5, 32, 16);
      const matSphere = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
      meshSphere = new THREE.Mesh(geoSphere, matSphere);
      meshSphere.position.set(-9, 5, 0);
      scene.add(meshSphere);

      // Wireframe overlay
      const wireframe = new THREE.WireframeGeometry(geoSphere);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green net
      lineSegments = new THREE.LineSegments(wireframe, lineMaterial); // Assign to lineSegments
      lineSegments.position.copy(meshSphere.position);
      lineSegments.scale.set(1.01, 1.01, 1.01); // Slightly larger to avoid z-fighting
      scene.add(lineSegments);

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

      // Event listener for mouse clicks
      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove);

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
        createText(scene, loadedFont, "Research", 11.5, 9, 0, "/research");
        createText(scene, loadedFont, "Software Dev", 3.3, 9, 0, "/software_dev");
        createText(scene, loadedFont, "GIS", -8.3, 9, 0, "/gis");

      });
    };

    const createText = (
      scene: THREE.Scene,
      font: THREE.Font,
      text: string,
      x: number,
      y: number,
      z: number,
      redirectUrl: string
    ) => {
      if (!font) return;
    
      const textGeo = new TextGeometry(text, {
        font,
        size: textConfig.size,
        height: textConfig.height,
        bevelEnabled: textConfig.bevelEnabled,
        bevelThickness: textConfig.bevelThickness,
        bevelSize: textConfig.bevelSize,
      });
    
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeo, textMaterial);

      // Position the text
      textMesh.position.set(x, y, z);
      textMesh.scale.set(-0.8, 0.8, 0.8); // Mirror horizontally

      // Store the redirect URL in the mesh
      textMesh.userData.redirectUrl = redirectUrl;

      // Add the mesh to the scene and to the clickable objects array
      scene.add(textMesh);
      clickableObjects.push(textMesh);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);
    
      if (intersects.length > 0) {
        const hovered = intersects[0].object;
    
        if (hovered !== hoveredObject) {
          hoveredObject = hovered; // Set the new hovered object
          renderer.domElement.style.cursor = "pointer";
        }
      } else if (hoveredObject) {
        // Reset scale when not hovered
        renderer.domElement.style.cursor = "default";
        hoveredObject.scale.set(-0.8, 0.8, 0.8);
        hoveredObject = null;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Navigate to the URL stored in the mesh's userData
        const redirectUrl = clickedObject.userData.redirectUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    };

    const animation = (time: number) => {
      if (meshKnot) {
        meshKnot.rotation.y = time / 1000; // Rotate around the vertical axis
        meshKnot.rotation.z = time / 1500; // Rotate around the vertical axis
      }
      if (meshSphere) {
        // Simulate Earth's rotation around an inclined axis
        meshSphere.rotation.y = time / 2000; // Rotate around Y-axis for daily rotation
        meshSphere.rotation.x = Math.PI / 6; // 23.5° tilt on X-axis (approximately)
        
        // Ensure the wireframe matches the sphere's rotation
        lineSegments.rotation.copy(meshSphere.rotation);
      }
      if (torus1) {
        torus1.rotation.y += 0.01; // Rotate the first torus around Y-axis
      }
      if (torus2) {
        torus2.rotation.y += 0.02; // Rotate the second torus around Z-axis
      }
      if (cube) {
        cube.rotation.y += 0.01; // Rotate the cube around its Y-axis
        cube.rotation.x += 0.005; // Add a slight rotation on the X-axis
      }
      if (hoveredObject) {
        const scaleFactor = 0.05 * Math.sin(time / 200) + 0.8; // Pulsate between 0.8 and 0.85
        hoveredObject.scale.set(-scaleFactor, scaleFactor, scaleFactor);
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
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default RectAreaLightScene;
