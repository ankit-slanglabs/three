import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//Renderer + scene + camera
const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );


//On window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


//Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
// camera.position.set( 0, 0, 100 );
controls.enableDamping = true;
controls.update();
controls.enableZoom = false;


renderer.setSize( window.innerWidth, window.innerHeight ); //False make scene alpha transparent
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 4, 96, 48 ); 
const texture = new THREE.TextureLoader().load("images/earth_atmos_4096.jpg");
const material = new THREE.MeshLambertMaterial({ map:texture });
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
// sphere.position.x = 0;
// sphere.position.y = 0;
sphere.rotation.z = -50;


//bump map

// sphere.castShadow = true;
material.wireframe = false;

camera.position.z = 15;
camera.position.y = 0;
camera.position.x = 0;

// const Plgeometry = new THREE.PlaneGeometry( 10, 3 );
// Plgeometry.position = 0;
// const Plmaterial = new THREE.MeshLambertMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( Plgeometry, Plmaterial );
// scene.add( plane );

// plane.rotation.x = Math.PI / 2;
// plane.position.y = -2;

//Light 1
// const Plight = new THREE.PointLight( 0xffffff, 1, 100 );
// Plight.position.set( -10, 8, -10 );
// Plight.castShadow = true; // default false
// scene.add( Plight );

//Light 2
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );
directionalLight.position.set( 60, 15, -30 );
// directionalLight.castShadow = true;


const Ambientlight = new THREE.AmbientLight( 0x404040, .2 );
scene.add( Ambientlight );

function animate() {
	requestAnimationFrame( animate );

	controls.update();

	// sphere.rotation.x += 0.0001;
	sphere.rotation.y += 0.002;
	// sphere.rotation.z += 0.001;

	renderer.render( scene, camera );
}

animate();

