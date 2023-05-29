import * as THREE from 'three';

var resizeObserver = new ResizeObserver(function(entries) {
  for (var entry of entries) {
    var { width, height } = entry.contentRect;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
});



const rendererDOM = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00000000); // Use alpha value of 0 for transparency
scene.background = null;
const camera = new THREE.PerspectiveCamera( 75, rendererDOM.clientWidth / rendererDOM.clientHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set the alpha option to true
renderer.setClearColor(0x000000, 0); // Use alpha value of 0 for transparency
rendererDOM.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x000000 });


const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

resizeObserver.observe(rendererDOM);

function animate() {

	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
