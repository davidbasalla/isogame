var BookcaseBlock = function (x, z, scene) {
  this.height = 1;
  this.x = x;
  this.z = z;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("bookcase", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.3, .2, .1);

  Block.call(this);
};
