import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), 
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), 
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), 
    new THREE.MeshBasicMaterial({ color: 0x00ffff }), 
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), 
];
const cube = new THREE.Mesh(geometry, materials);

scene.add(cube);
camera.position.z = 5;

renderer.setSize(200, 200);
const container = document.getElementById('dice-container');
container.style.width = '200px';
container.style.height = '200px';
container.style.border = '1px solid black';
container.appendChild(renderer.domElement);

let isRolling = false;
let targetRotation = null;

function rollDice() {
    if (!isRolling) {
        isRolling = true;
        const sides = [
            { x: 0, y: 0, z: Math.PI / 2 },
            { x: 0, y: 0, z: -Math.PI / 2 },
            { x: 0, y: Math.PI / 2, z: 0 },
            { x: 0, y: -Math.PI / 2, z: 0 },
            { x: Math.PI / 2, y: 0, z: 0 },
            { x: -Math.PI / 2, y: 0, z: 0 },
        ];
        const randomSideIndex = Math.floor(Math.random() * sides.length);
        targetRotation = sides[randomSideIndex];
        const animationDuration = 1000;
        const startTime = Date.now();
        function animate() {
            const currentTime = Date.now();
            const progress = (currentTime - startTime) / animationDuration;
            if (progress < 1) {
                cube.rotation.x = cube.rotation.x + (targetRotation.x - cube.rotation.x) * progress;
                cube.rotation.y = cube.rotation.y + (targetRotation.y - cube.rotation.y) * progress;
                cube.rotation.z = cube.rotation.z + (targetRotation.z - cube.rotation.z) * progress;
                requestAnimationFrame(animate);
            } else {
                cube.rotation.x = targetRotation.x;
                cube.rotation.y = targetRotation.y;
                cube.rotation.z = targetRotation.z;
                isRolling = false;
            }
            renderer.render(scene, camera);
        }
        animate();
    }
}

document.getElementById('roll-button').addEventListener('click', rollDice);

function animate() {
    requestAnimationFrame(animate);
    if (isRolling) {
        return;
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();