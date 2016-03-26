var BrazierBlock = function (x, z, rotation, scene) {
  this.x = x;
  this.y = 0.15;
  this.z = z;
  this.width = 0.1;
  this.height = 0.06;
  this.length = 0.1;
  this.rotation = rotation;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("wall", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.2, .2, .2);

  var loader = new BABYLON.AssetsManager(this.scene);
  var load_task = loader.addMeshTask("brazier", "", "assets/obj/", "brazier.obj");

  var _this = this;
  load_task.onSuccess = function() {
    _this.shape = load_task.loadedMeshes[0]
    SceneElement.call(_this);
  }

  loader.load();
};
