var PillarBlock = function (x, z, scene) {
  this.height = 1;
  this.x = x;
  this.y = 25;
  this.z = z;
  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("pillar", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.7, .7, .7);

  Block.call(this);
};
