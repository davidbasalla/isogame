var Block = function (x, z) {
  this.map_offset_x = -500;
  this.map_offset_z = -500;
  this.tile_size = 25;

  this.pos_x = this.x * this.tile_size * 2 + this.map_offset_x + this.tile_size;
  this.pos_y = (this.y || 0) + this.height * this.tile_size;
  this.pos_z = this.z * this.tile_size * 2 + this.map_offset_z + this.tile_size;

  this.shape = new THREE.Mesh(this.geometry, this.material);
  this.shape.scale.y = this.height;
  this.shape.position.x = this.pos_x;
  this.shape.position.y = this.pos_y;
  this.shape.position.z = this.pos_z;
};
