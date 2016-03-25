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

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  // renderer = new THREE.CanvasRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap

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

  plane.castShadow = false;
  plane.receiveShadow = true;

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
  var ambientLight = new THREE.AmbientLight( 0x222222 );
  scene.add( ambientLight );

  var light = new THREE.SpotLight( 0x888888 );
  light.position.set(-500,200,0)
  light.castShadow = true;
  light.shadow.mapSize.width = 256;
  light.shadow.mapSize.height = 256;
  light.shadow.camera.far = 1000;
  light.shadow.camera.near = 300;
  scene.add( light );

  // var spotLightHelper = new THREE.SpotLightHelper( light );
  // scene.add( spotLightHelper );

  var light = new THREE.SpotLight( 0xBBBBBB );
  light.position.set(0,200,0)

  scene.add( light );
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
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
