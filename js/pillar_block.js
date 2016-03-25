var PillarBlock = function (x, z) {
  this.geometry = new THREE.CylinderGeometry( 20, 20, 100, 16 );
  this.material = new THREE.MeshLambertMaterial( { color: 0x888888, overdraw: 0.5 } );

  this.height = 1;
  this.x = x;
  this.y = 25;
  this.z = z;

  Block.call(this);
};
