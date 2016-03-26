var SceneElement = function (x, z, scene) {
  this.map_offset_x = -5.25;
  this.map_offset_z = -5.25;
  this.tile_size = 0.5;

  this.pos_x = this.x * this.tile_size + this.map_offset_x + this.tile_size;
  this.pos_y = (this.y || 0) + this.height * this.tile_size;
  this.pos_z = this.z * this.tile_size + this.map_offset_z + this.tile_size;

  this.shape = BABYLON.Mesh.CreateBox('scene_elem', 0.5, this.scene);
  this.shape.position.x = this.pos_x;
  this.shape.position.y = this.y || 0.5;
  this.shape.position.z = this.pos_z;
  this.shape.scaling.y = this.height || 3;

  this.shape.material = this.material;
};
