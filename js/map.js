var Map = function (mapfile, scene) {
  this.mapfile = mapfile;
  this.width = this.mapfile.length;
  this.height = this.mapfile.length;
  this.blocks = new Array();
  this.scene = scene;
};

Map.prototype.parse = function() {
  var objects = [];
  var block = null;

  for ( var i = 0; i < this.width; i ++ ) {
    for ( var j = 0; j < this.height; j ++ ) {
      switch (this.mapfile[i][j]) {
        case 'W':
          block = new WallBlock(i, j, this.scene);
          break;
        case 'D':
          block = new DoorBlock(i, j, this.scene);
          break;
        case 'B':
          block = new BookcaseBlock(i, j, this.scene);
          break;
        case 'P':
          block = new PillarBlock(i, j, this.scene);
          break;
        default:
          block = null;
          break;
      }
      if (block) {
        objects.push(block);
      }
    }
  }
  return objects;
};
