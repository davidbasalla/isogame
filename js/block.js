var Block = function (x, y) {
  var geometry = new THREE.BoxGeometry( 50, 50, 50 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
  this.shape = new THREE.Mesh( geometry, material );

  this.shape.scale.y = 2;
  this.shape.position.x = x * 50 - 250 + 25;
  this.shape.position.y = ( this.shape.scale.y * 50 ) / 2;
  this.shape.position.z = y * 50 - 250 + 25;
};
