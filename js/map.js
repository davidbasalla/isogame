var Map = function (mapfile) {
  this.mapfile = mapfile;
  this.width = this.mapfile.length;
  this.height = this.mapfile.length;
  this.blocks = new Array();

  this.parse_map();
};

Map.prototype.parse_map = function() {
  for ( var i = 0; i < this.width; i ++ ) {
    this.blocks.push([])

    for ( var j = 0; j < this.height; j ++ ) {
      if (this.mapfile[i][j] === 'W') {
        this.blocks[i][j] = new Block(i, j);
      }
      else {
        this.blocks[i][j] = null;
      }
    }
  }
};
