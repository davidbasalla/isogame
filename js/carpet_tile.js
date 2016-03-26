var CarpetTile = function (x, z, rotation, scene) {
  this.height = .1;
  this.x = x;
  this.y = -.01;
  this.z = z;
  this.rotation = rotation;

  this.scene = scene;

  this.material = new BABYLON.StandardMaterial("carpet", this.scene);
  this.material.diffuseColor = new BABYLON.Color3(.6, .1, .1);

  SceneElement.call(this);
};
