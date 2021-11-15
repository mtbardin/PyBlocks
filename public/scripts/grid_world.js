/*
 * Phaser.js library seems really helpful for grid world "games".
 * https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
 * https://photonstorm.github.io/phaser3-docs/index.html
 * https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
 * https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
 * 
 * https://labs.phaser.io/assets/
 * https://github.com/photonstorm/phaser3-examples
 */
/*
var config = {
    type: Phaser.AUTO,
    parent: 'phaserContainer', // name of the DOM element phaser inits inside of.
    width: 800,
    height: 600,
    //zoom: 1,
    /*scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaserContainer',
        width: window.innerWidth,
        height: window.innerHeight
    },/
    pixelArt: true,
    scene: {
        preload: preload,
        create: create//,
        //update: update,
        //render: render
    }
};

var game = new Phaser.Game(config);

function preload() {
    //this.load.setBaseURL('http://labs.phaser.io');
    //this.load.setBaseURL('public');

    this.load.image('sky', 'assets/space3.png');
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('red', 'assets/red.png');

    this.load.image('tiles', 'assets/terrain-v7.png');

    this.load.image('character', 'assets/char_walk_right.gif');
};

function create() {
    /*this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
    *
    
    const level = [[288, 289, 289, 289, 289, 289, 290],
        [320, 321, 321, 321, 321, 321, 322],
        [320, 321, 321, 321, 321, 321, 322],
        [320, 321, 321, 321, 321, 321, 322],
        [320, 321, 321, 321, 321, 321, 322],
        [320, 321, 321, 321, 321, 321, 322],
        [352, 353, 353, 353, 353, 353, 354]];

    const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
    const tiles = map.addTilesetImage('tiles');
    const layer = map.createLayer(0, tiles, 0, 0);
    //layer.width = 400;

    const player = this.add.image(32 + 16, 32 + 16, 'character');

    //this.input.keyboard.enabled = false;
    //this.input.keyboard.enableGlobalCapture();

    this.input.keyboard.on('keydown', function (event) {
        console.log(event.keyCode);
    });

    //  Left
    this.input.keyboard.on('keydown-A', () => {
        const tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

        if (tile.index != 321) {
            //  Blocked, we can't move
        }
        else {
            player.x -= 32;
            //player.angle = 180;
        }
    });

    //  Right
    this.input.keyboard.on('keydown-D', () => {
        const tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

        if (tile.index != 321) {
            //  Blocked, we can't move
        }
        else {
            player.x += 32;
            //player.angle = 0;
        }
    });

    //  Up
    this.input.keyboard.on('keydown-W', () => {
        const tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

        if (tile.index != 321) {
            //  Blocked, we can't move
        }
        else {
            player.y -= 32;
            //player.angle = -90;
        }
    });

    //  Down
    this.input.keyboard.on('keydown-S', () => {
        //alert('keypress triggered');
        const tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

        if (tile.index != 321) {
            //  Blocked, we can't move
        }
        else {
            player.y += 32;
            //player.angle = 90;
        }
    });

   
};
*/

(function () {
    /*
    let mapLayer1 = {
        cols: 10,    // The width of the map, in columns.
        rows: 10,    // The height of the map, in rows.
        tsize: 17,  // The tile size, in pixels.

        // A 1-dimensional array containing the grid of tiles to be generated.
        tiles: [
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],

        // A helper method that gets the tile index in a certain position.
        getTile: function (col, row) {
            return this.tiles[row * mapLayer1.cols + col]
        }
    };

    let mapLayer2 = {
        cols: 10,    // The width of the map, in columns.
        rows: 10,    // The height of the map, in rows.
        tsize: 16,  // The tile size, in pixels.

        // A 1-dimensional array containing the grid of tiles to be generated.
        tiles: [
            0, 0, 0, 0, 0, 5, 0, 588, 0, 5,
            0, 344, 345, 345, 345, 346, 0, 645, 0, 585,
            588, 401, 402, 402, 402, 403, 585, 0, 0, 642,
            645, 458, 459, 459, 459, 460, 642, 0, 0, 594,
            0, 0, 0, 0, 0, 0, 0, 594, 585, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 642, 0,
            0, 0, 0, 0, 536, 0, 2, 3, 4, 0,
            0, 0, 0, 0, 0, 0, 116, 60, 61, 0,
            0, 0, 0, 0, 0, 0, 0, 116, 118, 536,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ],

        // A helper method that gets the tile index in a certain position.
        getTile: function (col, row) {
            return this.tiles[row * mapLayer2.cols + col]
        }
    };
    */
    /*
    var context = document.getElementById('gridWorld1').getContext('2d');
    let tileAtlas = new Image();
    tileAtlas.src = "/images/roguelikeSheet_transparent.png";
    tileAtlas.onload = function () {
        for (var c = 8; c < mapLayer1.cols; c++) {
            for (var r = 8; r < mapLayer1.rows; r++) {
                var tile = mapLayer1.getTile(c, r);
                //console.log(mapLayer1.tsize, tile);

                if (tile !== 0) { // 0 => empty tile
                    context.drawImage(
                        tileAtlas, // image
                        (tile) * mapLayer1.tsize, // source x
                        0, // source y
                        mapLayer1.tsize - 1, // source width
                        mapLayer1.tsize - 1, // source height
                        c * mapLayer1.tsize - 1, // target x
                        r * mapLayer1.tsize - 1, // target y
                        mapLayer1.tsize + 1, // target width
                        mapLayer1.tsize + 1 // target height
                    );
                };
            };
        };
    };
    */
    /*
     * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
     * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Static_maps
     * https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9
     * https://github.com/mozdevs/gamedev-js-tiles
     * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps#performance
     */
    /*
    let layers = [
        {
            "data": [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            "height": 10,
            "id": 1,
            "name": "Tile Layer 1",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 10,
            "x": 0,
            "y": 0
        },
        {
            "data": [0, 0, 0, 0, 0, 6, 0, 589, 0, 6, 0, 345, 346, 346, 346, 347, 0, 646, 0, 586, 589, 402, 403, 403, 403, 404, 586, 0, 0, 643, 646, 459, 460, 460, 460, 461, 643, 0, 0, 595, 0, 0, 0, 0, 0, 0, 0, 595, 586, 0, 0, 0, 0, 0, 0, 0, 0, 0, 643, 0, 0, 0, 0, 0, 537, 0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 117, 61, 62, 0, 0, 0, 0, 0, 0, 0, 0, 117, 119, 537, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "height": 10,
            "id": 2,
            "name": "Tile Layer 2",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 10,
            "x": 0,
            "y": 0
        }];

    let level1Map = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    const canvas = document.getElementById('gridWorld1');
    const ctx = canvas.getContext('2d');

    const tileAtlas = new Image();
    tileAtlas.src = "/images/small_roguelikeSheet_noGap.png";

    let tileSize = 16;
    let tileOutputSize = 1; // can set to 1 for 32px or higher
    let updatedTileSize = tileSize * tileOutputSize;

    let atlasCol = 4;
    let atlasRow = 2;
    let mapCols = 10;
    let mapRows = 10;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize

    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;

    //tileAtlas.onload = function () {
    //    ctx.drawImage(tileAtlas, (0 % atlasCol) * tileSize, Math.floor(0 / atlasCol) * tileSize, tileSize,
    //        tileSize, 0 * tileOutputSize, 0 * tileOutputSize,
    //        updatedTileSize, updatedTileSize);
    //};

    
    tileAtlas.onload = function () {
        for (let col = 0; col < mapHeight; col += tileSize) {
            for (let row = 0; row < mapWidth; row += tileSize) {
                //let tileVal = mapLayer1.getTile(c, r);
                let tileVal = level1Map[mapIndex];
                if (tileVal != 0) {
                    tileVal -= 1;
                    sourceY = Math.floor(tileVal / atlasCol) * tileSize;
                    sourceX = (tileVal % atlasCol) * tileSize;
                    ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize,
                        tileSize, row * tileOutputSize, col * tileOutputSize,
                        updatedTileSize, updatedTileSize);
                }
                mapIndex++;
            };
        };
    };
    */

    /*
    const canvas = document.getElementById('grid-world-1');
    const ctx = canvas.getContext('2d');

    console.log("here");
    let tileAtlas = new Image();
    tileAtlas.src = "/images/roguelikeSheet_transparent.png";
    tileAtlas.onload = draw;

    let tileSize = 16;
    let tileOutputSize = 1;
    let updatedTileSize = tileSize * tileOutputSize;

    let atlasCol = 10;
    let atlasRow = 10;
    let mapCols = 57;
    let mapRows = 31;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize

    let mapIndex = 0;
    let sourceX = 0;
    let sourceY = 0;
    function draw() {
        for (let col = 0; col < mapHeight; col += tileSize) {
            for (let row = 0; row < mapWidth; row += tileSize) {
                let tileVal = mapLayer1[mapIndex];
                if (tileVal != 0) {
                    tileVal -= 1;
                    sourceY = Math.floor(tileVal / atlasCol) * tileSize;
                    sourceX = (tileVal % atlasCol) * tileSize;
                    ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize,
                        tileSize, row * tileOutputSize, col * tileOutputSize,
                        updatedTileSize, updatedTileSize);
                }
                mapIndex++;
            }
        }
    };
    */

})();

// listen for the output of the code execution.
var socket = io();

(function () {
    // https://github.com/mozdevs/gamedev-js-tiles/blob/gh-pages/square/layers.js

    // Asset loader
    var Loader = {
        images: {}
    };

    Loader.loadImage = function (key, src) {
        var img = new Image();

        var d = new Promise(function (resolve, reject) {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(this);

            img.onerror = function () {
                reject('Could not load image: ' + src);
            };
        }.bind(this));

        img.src = src;
        return d;
    };

    Loader.getImage = function (key) {
        return (key in this.images) ? this.images[key] : null;
    };

    // Keyboard handler
    var Keyboard = {};

    Keyboard.LEFT = 65;
    Keyboard.RIGHT = 68;
    Keyboard.UP = 87;
    Keyboard.DOWN = 83;
    Keyboard.NULL = -1;

    Keyboard._keys = {};

    Keyboard.listenForEvents = function (keys) {
        $(window).on('keydown', function (event, code, callback) {
            //console.log("key down");
            var keyCode = parseInt(code);
            if (keyCode in Keyboard._keys) {
                event.preventDefault();
                Keyboard._keys[keyCode] = true;
            }
        });

        keys.forEach(function (key) {
            this._keys[key] = false;
        }.bind(this));
    }

    Keyboard.isDown = function (keyCode) {
        if (!keyCode in this._keys) {
            throw new Error('Keycode ' + keyCode + ' is not being listened to');
        }
        return this._keys[keyCode];
    };

    // https://nodejs.org/api/events.html#handling-events-only-once

    // Game object
    var Game = {};

    Game.run = function (context) {
        this.ctx = context;
        this.ctx.canvas.width = 512;
        this.ctx.canvas.height = 512;
        this._previousElapsed = 0;

        var p = this.load();
        Promise.all(p).then(function (loaded) {
            this.init();
            window.requestAnimationFrame(this.tick);
        }.bind(this));
    };

    Game.tick = function (elapsed) {
        window.requestAnimationFrame(this.tick);

        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);

        // compute delta time in seconds -- also cap it
        var delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;

        // I added this
        delta = 1;

        this.update(delta);
        this.render();
    }.bind(Game);

    // start up function
    window.onload = function () {
        var context = document.getElementById('gridWorld').getContext('2d');
        Game.run(context);
    };

    var map = {
        cols: 8,
        rows: 8,
        tsize: 64,
        layers: [[
            3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 2, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 3,
            3, 3, 3, 1, 2, 3, 3, 3
        ], [
            4, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 5, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 5, 4, 4, 4,
            0, 3, 3, 0, 0, 3, 3, 3
        ]],
        getTile: function (layer, col, row) {
            return this.layers[layer][row * map.cols + col];
        },
        isSolidTileAtXY: function (x, y) {
            var col = Math.floor(x / this.tsize);
            var row = Math.floor(y / this.tsize);

            // tiles 3 and 5 are solid -- the rest are walkable
            // loop through all layers and return TRUE if any tile is solid
            return this.layers.reduce(function (res, layer, index) {
                var tile = this.getTile(index, col, row);
                var isSolid = tile === 3 || tile === 5;
                return res || isSolid;
            }.bind(this), false);
        },
        getCol: function (x) {
            return Math.floor(x / this.tsize);
        },
        getRow: function (y) {
            return Math.floor(y / this.tsize);
        },
        getX: function (col) {
            return col * this.tsize;
        },
        getY: function (row) {
            return row * this.tsize;
        }
    };

    function Camera(map, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.cols * map.tsize - width;
        this.maxY = map.rows * map.tsize - height;
    }

    Camera.prototype.follow = function (sprite) {
        this.following = sprite;
        sprite.screenX = 0;
        sprite.screenY = 0;
    };

    Camera.prototype.update = function () {
        // assume followed sprite should be placed at the center of the screen
        // whenever possible
        this.following.screenX = this.width / 2;
        this.following.screenY = this.height / 2;

        // make the camera follow the sprite
        this.x = this.following.x - this.width / 2;
        this.y = this.following.y - this.height / 2;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));

        // in map corners, the sprite cannot be placed in the center of the screen
        // and we have to change its screen coordinates

        // left and right sides
        if (this.following.x < this.width / 2 ||
            this.following.x > this.maxX + this.width / 2) {
            this.following.screenX = this.following.x - this.x;
        }
        // top and bottom sides
        if (this.following.y < this.height / 2 ||
            this.following.y > this.maxY + this.height / 2) {
            this.following.screenY = this.following.y - this.y;
        }
    };

    function Hero(map, x, y) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.width = map.tsize;
        this.height = map.tsize;

        this.image = Loader.getImage('hero');
    }

    // changed from 256
    Hero.SPEED = 64; // pixels per second

    Hero.prototype.move = function (delta, dirx, diry) {
        // move hero
        this.x += dirx * Hero.SPEED * delta;
        this.y += diry * Hero.SPEED * delta;

        // check if we walked into a non-walkable tile
        this._collide(dirx, diry);

        // clamp values
        var maxX = this.map.cols * this.map.tsize;
        var maxY = this.map.rows * this.map.tsize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    };

    Hero.prototype._collide = function (dirx, diry) {
        var row, col;
        // -1 in right and bottom is because image ranges from 0..63
        // and not up to 64
        var left = this.x - this.width / 2;
        var right = this.x + this.width / 2 - 1;
        var top = this.y - this.height / 2;
        var bottom = this.y + this.height / 2 - 1;

        // check for collisions on sprite sides
        var collision =
            this.map.isSolidTileAtXY(left, top) ||
            this.map.isSolidTileAtXY(right, top) ||
            this.map.isSolidTileAtXY(right, bottom) ||
            this.map.isSolidTileAtXY(left, bottom);
        if (!collision) { return; }

        if (diry > 0) {
            row = this.map.getRow(bottom);
            this.y = -this.height / 2 + this.map.getY(row);
        }
        else if (diry < 0) {
            row = this.map.getRow(top);
            this.y = this.height / 2 + this.map.getY(row + 1);
        }
        else if (dirx > 0) {
            col = this.map.getCol(right);
            this.x = -this.width / 2 + this.map.getX(col);
        }
        else if (dirx < 0) {
            col = this.map.getCol(left);
            this.x = this.width / 2 + this.map.getX(col + 1);
        }
    };

    Game.load = function () {
        return [
            Loader.loadImage('tiles', 'assets/test_tiles.png'),
            Loader.loadImage('hero', 'assets/character.png')
        ];
    };

    Game.init = function () {
        Keyboard.listenForEvents([Keyboard.LEFT,
                                  Keyboard.RIGHT,
                                  Keyboard.UP,
                                  Keyboard.DOWN,
                                  Keyboard.NULL]);
        
        this.tileAtlas = Loader.getImage('tiles');

        this.hero = new Hero(map, 160, 160);
        this.camera = new Camera(map, 512, 512);
        this.camera.follow(this.hero);
    };
    
    Game.update = function (delta) {
        // handle hero movement with arrow keys
        var dirx = 0;
        var diry = 0;
        //console.log(Keyboard);
        
        if (Keyboard.isDown(Keyboard.LEFT)) {
            dirx = -1;
            Keyboard._keys[65] = false;
        }
        else if (Keyboard.isDown(Keyboard.RIGHT)) {
            dirx = 1;
            Keyboard._keys[68] = false;
        }
        else if (Keyboard.isDown(Keyboard.UP)) {
            diry = -1;
            Keyboard._keys[87] = false;
        }
        else if (Keyboard.isDown(Keyboard.DOWN)) {
            diry = 1;
            Keyboard._keys[83] = false;
        }
        else if (Keyboard.isDown(Keyboard.NULL)) {
            dirx = 0;
            diry = 0;
            Keyboard._keys[-1] = false;
        }
        
        this.hero.move(delta, dirx, diry);
        this.camera.update();
    };

    Game._drawLayer = function (layer) {
        var startCol = Math.floor(this.camera.x / map.tsize);
        var endCol = startCol + (this.camera.width / map.tsize);
        var startRow = Math.floor(this.camera.y / map.tsize);
        var endRow = startRow + (this.camera.height / map.tsize);
        var offsetX = -this.camera.x + startCol * map.tsize;
        var offsetY = -this.camera.y + startRow * map.tsize;

        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = map.getTile(layer, c, r);
                var x = (c - startCol) * map.tsize + offsetX;
                var y = (r - startRow) * map.tsize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile - 1) * map.tsize, // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        Math.round(x),  // target x
                        Math.round(y), // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
                }
            }
        }
    };

    Game._drawGrid = function () {
        var width = map.cols * map.tsize;
        var height = map.rows * map.tsize;
        var x, y;
        for (var r = 0; r < map.rows; r++) {
            x = - this.camera.x;
            y = r * map.tsize - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        for (var c = 0; c < map.cols; c++) {
            x = c * map.tsize - this.camera.x;
            y = - this.camera.y;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
    };

    Game.render = function () {
        // draw map background layer
        this._drawLayer(0);

        // draw main character
        this.ctx.drawImage(
            this.hero.image,
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2);

        // draw map top layer
        this._drawLayer(1);

        this._drawGrid();
    };
})();