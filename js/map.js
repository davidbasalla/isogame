var Map = function (mapfile, scene) {
  this.mapfile = mapfile;
  this.width = this.mapfile.length;
  this.height = this.mapfile.length;
  this.blocks = new Array();
  this.scene = scene;

  this.parse_map();
};

Map.prototype.parse_map = function() {
  for ( var i = 0; i < this.width; i ++ ) {
    this.blocks.push([])

    for ( var j = 0; j < this.height; j ++ ) {
      switch (this.mapfile[i][j]) {
        case 'W':
          this.blocks[i][j] = new WallBlock(i, j, this.scene);
          break;
        case 'D':
          this.blocks[i][j] = new DoorBlock(i, j, this.scene);
          break;
        case 'B':
          this.blocks[i][j] = new BookcaseBlock(i, j, this.scene);
          break;
        case 'P':
          this.blocks[i][j] = new PillarBlock(i, j, this.scene);
          break;
        default:
          this.blocks[i][j] = null;
          break;
      }
    }
  }
};
