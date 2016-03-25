var container, stats;
var camera, scene, renderer;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.OrthographicCamera(window.innerWidth / - 2,
                                        window.innerWidth / 2,
                                        window.innerHeight / 2,
                                        window.innerHeight / - 2,
                                        -500,
                                        1000);
  camera.position.x = 200;
  camera.position.y = 150;
  camera.position.z = 200;
  scene = new THREE.Scene();

  initGeo();
  initLights();

  renderer = new THREE.CanvasRenderer();
  renderer.shadowMapEnabled = true;
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}

function initGeo() {

  var map_file = [
    ['W','W','W','W','W','W','W','W','D','D','W','W','W','W','W','W','W','W','W','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','B','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','B','W'],
    ['W','B','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','B','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','P','_','C','C','_','P','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['D','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','D'],
    ['D','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','D'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','P','_','C','C','_','P','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','B','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','B','W'],
    ['W','B','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','B','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','_','W'],
    ['W','W','W','W','W','W','W','W','D','D','W','W','W','W','W','W','W','W','W','W']
  ]

  var map = new Map(map_file)

  init_ground(map);
  init_objects(map);
}

function init_ground(map) {
  var geometry = new THREE.PlaneGeometry( 1000, 1000, 20, 20 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
  var plane = new THREE.Mesh( geometry, material );

  plane.rotation.x = -Math.PI/2;
  plane.position.y = 0;

  scene.add( plane );
}

function init_objects(map) {
  for ( var i = 0; i < map.width; i ++ ) {
    for ( var j = 0; j < map.height; j ++ ) {
      var block = map.blocks[i][j];
      if (block) {
        scene.add(block.shape);
      }
    }
  }
}

function initLights() {
  var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
  scene.add( ambientLight );


  var light = new THREE.PointLight( 0xffffff, 1, 1000 );
  light.position.set( 10000, 10000, 5000 );
  light.castShadow = true;

  // var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  // directionalLight.position.x = Math.random() - 0.5;
  // directionalLight.position.y = Math.random() - 0.5;
  // directionalLight.position.z = Math.random() - 0.5;
  // directionalLight.position.normalize();

  // directionalLight.shadow.camera.right     =  5;
  // directionalLight.shadow.camera.left     = -5;
  // directionalLight.shadow.camera.top      =  5;
  // directionalLight.shadow.camera.bottom   = -5;

  // directionalLight.castShadow = true;
  scene.add( light );

  // var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  // directionalLight.position.x = Math.random() - 0.5;
  // directionalLight.position.y = Math.random() - 0.5;
  // directionalLight.position.z = Math.random() - 0.5;
  // directionalLight.position.normalize();
  // directionalLight.castShadow = true;
  // scene.add( directionalLight );
}

function onWindowResize() {
  camera.left = window.innerWidth / - 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  // requestAnimationFrame( animate );
  render();
}

function render() {
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
