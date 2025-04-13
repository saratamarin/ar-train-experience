import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.module.js';
import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js';

document.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: "./marker.mind",
  });

  const {renderer, scene, camera} = mindarThree;
  const anchor = mindarThree.addAnchor(0);

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load('./assets/train.glb', (gltf) => {
    const train = gltf.scene;
    train.scale.set(0.1, 0.1, 0.1);
    anchor.group.add(train);

    // Animate train stop logic here...
  });

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
