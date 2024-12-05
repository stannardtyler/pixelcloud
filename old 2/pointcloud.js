/* global THREE */

window.addEventListener("load", init);
let scene;
let camera;
let renderer;
let mesh;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // const controls = new THREE.OrbitControls(camera)
  // controls.enableZoom = false

  scene.add(new THREE.AmbientLight(0x404040));

//   let geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//   let material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 });
//   mesh = new THREE.Points(geometry, material);

//   scene.add(mesh);
  
const loader = new THREE.OBJLoader()
  loader.load('https://cdn.glitch.com/4fa7cf00-160a-46c3-9eac-aac64e7d8222%2Funtitled.obj?v=1619474237156',
              (obj) => {
                    let material = new THREE.PointsMaterial({ color: 0xcccccc, size: .25 })
                    mesh = new THREE.Points(obj.children[0].geometry, material)
                   // mesh.position.y = -5
                    scene.add(mesh)
    
                    mesh.scale.set(10, 10, 10);
                    
                },
              (xhr) => {
                  console.log(xhr)
              },
              (err) => {
                  console.error("loading .obj went wrong, ", err)
                }
             )

  document.body.appendChild(renderer.domElement);
  animationLoop();
}

function animationLoop() {
  renderer.render(scene, camera);
   if (mesh) {
     mesh.rotation.y += 0.002;
   }

  requestAnimationFrame(animationLoop);
}

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
// //Respond to Window Resizing
// window.addEventListener("resize", onWindowResize);

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
//   animationLoop();
// }
