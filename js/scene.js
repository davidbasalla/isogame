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

  var map_file = [['W','W','W','W','D','D','W','W','W','W'],
                  ['W','_','_','_','_','_','_','_','_','W'],
                  ['W','_','P','_','_','_','_','P','_','W'],
                  ['W','_','_','_','_','_','_','_','_','W'],
                  ['W','_','_','_','_','_','_','_','B','W'],
                  ['W','_','_','_','_','_','_','_','B','W'],
                  ['W','_','_','_','_','_','_','_','_','W'],
                  ['W','_','P','_','_','_','_','P','_','W'],
                  ['W','_','_','_','_','_','_','_','_','W'],
                  ['W','W','W','W','D','D','W','W','W','W']]

  var map = new Map(map_file)

  initGrid(map);
  initCubes(map);
}

function initGrid(map) {
  var size = map.width * 25, step = 50;
  var geometry = new THREE.Geometry();
  geometry.receiveShadow = true;

  for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
  }
  var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
  var line = new THREE.LineSegments( geometry, material );
  scene.add( line );
}

function initCubes(map) {
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
