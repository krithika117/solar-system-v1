import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import starsTexture from './assets/images/stars.jpg';
import sunTexture from './assets/images/sun.jpg';
import mercuryTexture from './assets/images/mercury.jpg';
import venusTexture from './assets/images/venus.jpg';
import earthTexture from './assets/images/earth.jpg';
import marsTexture from './assets/images/mars.jpg';
import jupiterTexture from './assets/images/jupiter.jpg';
import saturnTexture from './assets/images/saturn.jpg';
import saturnRingTexture from './assets/images/saturn ring.png';
import uranusTexture from './assets/images/uranus.jpg';
import neptuneTexture from './assets/images/neptune.jpg';
import plutoTexture from './assets/images/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureloader = new THREE.CubeTextureLoader();
scene.background = cubeTextureloader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);

const textureLoader = new THREE.TextureLoader();

// Sun
const sunGeo = new THREE.SphereGeometry(16, 40, 40);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
})

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//function to create planet
function createPlanets(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    })
    const mesh = new THREE.Mesh(geo, mat);

    const obj = new THREE.Object3D();

    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    
    scene.add(obj)
    mesh.position.x = position;
    return {
        mesh,
        obj
    }
}
const mercury = createPlanets(3.2, mercuryTexture, 28);
const venus = createPlanets(5.8, venusTexture, 44);
const earth = createPlanets(6, earthTexture, 62);
const mars = createPlanets(4, marsTexture, 78);
const jupiter = createPlanets(12, jupiterTexture, 100);
const saturn = createPlanets(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanets(7, uranusTexture, 176);
const neptune = createPlanets(7, neptuneTexture, 200);
const pluto = createPlanets(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

//EOF
function animate() {
    // Rotation
    sun.rotateY(0.002);
    mercury.mesh.rotateY(0.02);
    venus.mesh.rotateY(0.015);
    earth.mesh.rotateY(0.01);
    mars.mesh.rotateY(0.008);
    jupiter.mesh.rotateY(0.004);
    saturn.mesh.rotateY(0.003);
    uranus.mesh.rotateY(0.002);
    neptune.mesh.rotateY(0.0015);
    pluto.mesh.rotateY(0.001);
 
    // Revolution
    mercury.obj.rotateY(0.03);
    venus.obj.rotateY(0.025);
    earth.obj.rotateY(0.02);
    mars.obj.rotateY(0.015);
    jupiter.obj.rotateY(0.01);
    saturn.obj.rotateY(0.008);
    uranus.obj.rotateY(0.005);
    neptune.obj.rotateY(0.003);
    pluto.obj.rotateY(0.001);
 
    renderer.render(scene, camera);
 }
 
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});