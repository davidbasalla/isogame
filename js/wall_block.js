var WallBlock = function (x, z, scene) {
  this.height = 2;
  this.x = x;
  this.z = z;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("wall", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.7, .7, .7);

  Block.call(this);
};
