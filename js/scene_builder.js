var SceneBuilder = function (scene, canvas) {
  this.scene = scene;
  this.canvas = canvas;

  this.scene_graph = {
    camera: null,
    lights: [],
    objects: [],
    ground_objects: []
  };
};

SceneBuilder.prototype.build = function() {
  this.setup_camera();
  this.setup_lights();
  this.setup_geo();
  this.setup_shadows();

  console.log(this.scene_graph);

  return this.scene;
}

SceneBuilder.prototype.setup_camera = function() {
  // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
  var camera = new BABYLON.FreeCamera("camera1", 
                                      new BABYLON.Vector3(10, 10, -10),
                                      this.scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

  camera.orthoTop = 5;
  camera.orthoBottom = -5;
  camera.orthoLeft = -10;
  camera.orthoRight = 10;

  // target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // attach the camera to the canvas
  camera.attachControl(this.canvas, false);

  this.scene_graph["camera"] = camera;
};

SceneBuilder.prototype.setup_lights = function() {
  // create a basic light, aiming 0,1,0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight('light1', 
                                           new BABYLON.Vector3(0,1,0),
                                           this.scene);
  light.diffuse = new BABYLON.Color3(.4, .4, .4);
  this.scene_graph["lights"].push(
    {
      light: light,
      shadow_gen: null
    }
  );

  var spotLight = new BABYLON.SpotLight("spot01", 
                                     new BABYLON.Vector3(-3, 5, 0),
                                     new BABYLON.Vector3(.5, -1, 0), 5, 12,
                                     this.scene);
  spotLight.diffuse = new BABYLON.Color3(1, 1, 1);
  var spotLight_shadow = new BABYLON.ShadowGenerator(1024, spotLight);

  this.scene_graph["lights"].push(
    {
      light: spotLight,
      shadow_gen: spotLight_shadow
    }
  )

  var spotLight2 = new BABYLON.SpotLight("spot02", 
                                     new BABYLON.Vector3(3, 5, 0),
                                     new BABYLON.Vector3(-.5, -1, 0), 5, 12,
                                     this.scene);
  spotLight2.diffuse = new BABYLON.Color3(1, 1, 1);
  var spotLight_shadow2 = new BABYLON.ShadowGenerator(1024, spotLight2);

  this.scene_graph["lights"].push(
    {
      light: spotLight2,
      shadow_gen: spotLight_shadow2
    }
  )
}

SceneBuilder.prototype.setup_geo = function() {
  var map = new Map();

  this.setup_ground(map.tiles());
  this.setup_map(map.blocks());
}

SceneBuilder.prototype.setup_ground = function(map_file) {
  var ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, this.scene);
  var material = new BABYLON.StandardMaterial("bookcase", this.scene);
  material.diffuseColor = new BABYLON.Color3(.3, .2, .1);
  ground.material = material

  this.scene_graph["ground_objects"].push(ground);


  var map = new MapParser(map_file, this.scene);

  this.scene_graph["objects"] = map.parse();
}

SceneBuilder.prototype.setup_map = function(map_file) {
  var map = new MapParser(map_file, this.scene);

  this.scene_graph["objects"] = map.parse();
}

SceneBuilder.prototype.setup_shadows = function() {
  this.scene_graph["ground_objects"].forEach(
    function(item) {
      item.receiveShadows = true;
    }
  )

  var _this = this;
  this.scene_graph["lights"].forEach(
    function(light) {
      if (light["shadow_gen"] !== null){
        var shadow_map = light["shadow_gen"].getShadowMap();
        _this.assign_objects_to_shadow_map(shadow_map);
      }
    }
  )
}

SceneBuilder.prototype.assign_objects_to_shadow_map = function(shadow_map) {
  this.scene_graph["objects"].forEach(
    function(object) {
      shadow_map.renderList.push(object.shape);
    }
  )
}
