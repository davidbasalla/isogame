var Block = function (x, z, scene) {
  this.map_offset_x = -5.25;
  this.map_offset_z = -5.25;
  this.tile_size = 0.5;

  this.pos_x = this.x * this.tile_size + this.map_offset_x + this.tile_size;
  this.pos_y = (this.y || 0) + this.height * this.tile_size;
  this.pos_z = this.z * this.tile_size + this.map_offset_z + this.tile_size;

  var shape = BABYLON.Mesh.CreateBox('sphere1', 0.5, this.scene);
  shape.position.x = this.pos_x;
  shape.position.y = 0.5;
  shape.position.z = this.pos_z;
  shape.scaling.y = 3;

  shape.material = this.material;
};
