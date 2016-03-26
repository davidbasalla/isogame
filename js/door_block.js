var DoorBlock = function (x, z, scene) {
  this.x = x;
  this.z = z;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("door", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.5, .3, .1);

  SceneElement.call(this);
};
