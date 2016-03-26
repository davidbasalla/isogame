window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // createScene function that creates and return the scene
  var createScene = function(){
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    var scene_builder = new SceneBuilder(scene, canvas);
    return scene_builder.build();
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
