import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';

// Initialize the Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('black');
document.body.appendChild(renderer.domElement);

// Initialize the Scene
const scene = new THREE.Scene();

// Set up the Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 8, 25);
camera.lookAt(0, 2, 0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.update();

// Load textures
const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('/bricks-mortar-albedo.png');
const floorTexture = textureLoader.load('/modern-tile1-ao.png');
const roofTexture = textureLoader.load('/clay-shingles1_roughness.png');
const newFloorTexture = textureLoader.load('/modern-tile1-height.png');

// Initialize materials
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide });
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, side: THREE.DoubleSide });
const newFloorMaterial = new THREE.MeshStandardMaterial({ map: newFloorTexture, side: THREE.DoubleSide });
const roofMaterial = new THREE.MeshStandardMaterial({ map: roofTexture, side: THREE.DoubleSide });

// Initialize Wall and floor geometry
const wallThickness = 0.3;
const wallGeometry = new THREE.BoxGeometry(7, 6, wallThickness);
const floorGeometryOne = new THREE.BoxGeometry(7, wallThickness, 11);
const floorGeometryTwo = new THREE.BoxGeometry(7, wallThickness, 6);
const floorGeometryThree = new THREE.BoxGeometry(7, wallThickness, 6);

// Initialize walls
const wallTwo = new THREE.Mesh(wallGeometry, wallMaterial);
wallTwo.position.set(0, 3, -3.4);
scene.add(wallTwo);

const wallThree = new THREE.Mesh(wallGeometry, wallMaterial);
wallThree.rotation.y = Math.PI / 2;
wallThree.position.set(-3.5, 3, 0);
scene.add(wallThree);

const wallFour = new THREE.Mesh(wallGeometry, wallMaterial);
wallFour.rotation.y = Math.PI / 2;
wallFour.position.set(3.5, 3, 0);
scene.add(wallFour);

// Initialize floors
const floorOne = new THREE.Mesh(floorGeometryOne, floorMaterial);
floorOne.position.set(0, 0, 2);
floorOne.name = 'floor1';
scene.add(floorOne);

const floorTwo = new THREE.Mesh(floorGeometryTwo, floorMaterial);
floorTwo.position.set(0, 2, -0.5);
floorTwo.name = 'floor2';
scene.add(floorTwo);

const floorThree = new THREE.Mesh(floorGeometryThree, floorMaterial);
floorThree.position.set(0, 4, -0.5);
floorThree.name = 'floor3';
scene.add(floorThree);

// Initialize Dividers
const dividerTwoGeometry = new THREE.BoxGeometry(4, 2, 0.1);
const roomOne = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomOne.position.set(0.5, 1, 0);
roomOne.rotation.y = Math.PI / 2;
roomOne.name = 'RoomOne'
scene.add(roomOne);


const roomTwo = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomTwo.position.set(-0.5, 1, 0);
roomTwo.rotation.y = Math.PI / 2;
roomTwo.name = 'RoomTwo'
scene.add(roomTwo);


const roomThree = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomThree.position.set(0.5, 3, 0);
roomThree.rotation.y = Math.PI / 2;
roomThree.name = 'RoomThree'
scene.add(roomThree);

const roomFour = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomFour.position.set(-0.5, 3, 0);
roomFour.rotation.y = Math.PI / 2;
roomFour.name = 'RoomFour'
scene.add(roomFour);

const roomFive = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomFive.position.set(0.5, 5, 0);
roomFive.rotation.y = Math.PI / 2;
roomFive.name = 'RoomFive'
scene.add(roomFive);

const roomSix = new THREE.Mesh(dividerTwoGeometry, new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide }));
roomSix.position.set(-0.5, 5, 0);
roomSix.rotation.y = Math.PI / 2;
roomSix.name = 'RoomSix'
scene.add(roomSix);




// Ambient lighting for overall scene
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);


const roomLights = new Map(); 


const lightColors = [
    0x00ffff, 
    0xff00ff, 
    0xffff00, 
    0x00ff00, 
    0xff8000, 
    0xff0000  
]; 

[roomOne, roomTwo, roomThree, roomFour, roomFive, roomSix].forEach((room, index) => {
    const light = new THREE.SpotLight(lightColors[index], 5, 10, Math.PI / 2, 0.5, 2); 
    light.position.set(5, room.position.y + 1, 0); 
    
    
    light.target.position.copy(room.position);

    
    if (index === 1 || index === 3 || index === 5) {  
        light.position.set(-5, room.position.y + 1, 0); 
        light.target.position.set(-room.position.x, room.position.y, room.position.z); 
    }

    scene.add(light.target); 
    scene.add(light); 
    roomLights.set(room, light); 
});



// Roof 
const roofGeometry = new THREE.BoxGeometry(7, 0.4, 8);
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(3, 6.5, 0);
roof.rotation.z = Math.PI / -7;
scene.add(roof);

const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
scene.add(roof2);
roof2.position.set(-3, 6.5, 0);
roof2.rotation.z = Math.PI / 7;

// Set up Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// handle mouse click
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    
    const allObjects = [floorOne, floorTwo, floorThree, roomOne, roomTwo, roomThree, roomFour, roomFive, roomSix];
    const intersects = raycaster.intersectObjects(allObjects);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        
        if ([floorOne, floorTwo, floorThree].includes(clickedObject)) {
            const newMaterial = clickedObject.material === floorMaterial ? newFloorMaterial : floorMaterial;
            gsap.to(clickedObject.material, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    clickedObject.material = newMaterial;
                    gsap.to(clickedObject.material, { opacity: 1, duration: 0.5 });
                }
            });
        }

        
        if (roomLights.has(clickedObject)) {
            const light = roomLights.get(clickedObject);
            
            gsap.to(light, {
                intensity: light.intensity === 0 ? 2 : 0, 
                duration: 1
            });
        }
    }
}



// Event listener for click to toggle light and texture
window.addEventListener('click', onMouseClick);



// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});