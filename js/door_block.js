var DoorBlock = function (x, z, rotation, scene) {
  this.x = x;
  this.z = z;
  this.rotation = rotation;
  this.width = 0.25;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("door", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.5, .3, .1);

  SceneElement.call(this);
};
