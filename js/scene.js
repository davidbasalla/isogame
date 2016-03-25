window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // createScene function that creates and return the scene
  var createScene = function(){
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    setup_camera(scene, canvas);
    setup_lights(scene);
    setup_geo(scene);

    // return the created scene
    return scene;
  }

  // call the createScene function
  var scene = createScene();

  // run the render loop
  engine.runRenderLoop(function(){
      scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
      engine.resize();
  });
});

var setup_camera = function(scene, canvas) {
  // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(10, 10, -10), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

  camera.orthoTop = 5;
  camera.orthoBottom = -5;
  camera.orthoLeft = -10;
  camera.orthoRight = 10;

  // target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // attach the camera to the canvas
  camera.attachControl(canvas, false);
}

var setup_lights = function(scene) {
  // create a basic light, aiming 0,1,0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
}

var setup_geo = function(scene) {
  var map_file = [
    ['W','W','W','W','W','W','W','W','W','D','D','W','W','W','W','W','W','W','W','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','B','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','B','W'],
    ['W','B','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','B','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','P','_','C','C','_','P','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['D','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','D'],
    ['D','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','D'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','P','_','C','C','_','P','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','B','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','B','W'],
    ['W','B','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','B','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','_','_','_','_','_','_','_','_','C','C','_','_','_','_','_','_','_','_','W'],
    ['W','W','W','W','W','W','W','W','W','D','D','W','W','W','W','W','W','W','W','W']
  ]

  setup_ground(map_file, scene);
  setup_map(map_file, scene);
}

var setup_ground = function(map, scene){
  var ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, scene);
  var material = new BABYLON.StandardMaterial("bookcase", scene);
  material.diffuseColor = new BABYLON.Color3(.3, .2, .1);
  ground.material = material

}

var setup_map = function(map_file, scene){
  new Map(map_file, scene)
}
