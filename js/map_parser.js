var MapParser = function (mapfile, scene) {
  this.mapfile = mapfile;
  this.width = this.mapfile.length;
  this.height = this.mapfile.length;
  this.scene = scene;
};

MapParser.prototype.parse = function() {
  var objects = [];
  var object = null;

  for ( var i = 0; i < this.width; i ++ ) {
    for ( var j = 0; j < this.height; j ++ ) {
      switch (this.mapfile[i][j]) {
        case 'W':
          object = new WallBlock(i, j, this.scene);
          break;
        case 'D':
          object = new DoorBlock(i, j, this.scene);
          break;
        case 'B':
          object = new BookcaseBlock(i, j, this.scene);
          break;
        case 'P':
          object = new PillarBlock(i, j, this.scene);
          break;
        case 'C':
          object = new CarpetTile(i, j, this.scene);
          break;
        default:
          object = null;
          break;
      }
      if (object) {
        objects.push(object);
      }
    }
  }
  return objects;
};
