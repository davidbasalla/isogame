var WallBlock = function (x, z) {
  this.geometry = new THREE.BoxGeometry( 50, 50, 50 );
  this.material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

  this.height = 2;
  this.x = x;
  this.z = z;

  Block.call(this);
};
