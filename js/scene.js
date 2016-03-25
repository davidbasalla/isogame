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
  initGrid();
  initCubes();
}

function initGrid() {
  var size = 500, step = 50;
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

function initCubes() {
  var geometry = new THREE.BoxGeometry( 50, 50, 50 );
  geometry.castShadow = true;
  geometry.receiveShadow = true;

  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

  for ( var i = 0; i < 100; i ++ ) {
    var cube = new THREE.Mesh( geometry, material );
    cube.scale.y = Math.floor( Math.random() * 2 + 1 );
    cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    cube.position.y = ( cube.scale.y * 50 ) / 2;
    cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    scene.add( cube );
  }
}

function initLights() {
  var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
  scene.add( ambientLight );


  var light = new THREE.PointLight( 0xff0000, 1, 1000 );
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
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
