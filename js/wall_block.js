var WallBlock = function (x, z, rotation, scene) {
  this.x = x;
  this.z = z;
  this.rotation = rotation;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("wall", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.7, .7, .7);

  SceneElement.call(this);
};
