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
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Static_maps
 * https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9
 * https://github.com/mozdevs/gamedev-js-tiles
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps#performance
 */
    

(function () {
    // listen for the output of the code execution.
    var socket = io();

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
        $(window).on('autoPress', function (event, code, callback) {
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
            //window.requestAnimationFrame(this.tick);
            //let tmp = [-1]
            //$(window).trigger('animate', tmp);
            this.ctx.clearRect(0, 0, 512, 512);
            this.update(1);
            this.render();
        }.bind(this));
    };

    $(window).on('animate', async function (event, moves) {
        /*
         * Thanks to Jonas Williams for the second part of his answer to
         * https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop 
         */

        console.log("In Animation Loop");
        console.log("moves = ", moves);

        const pause = ms => new Promise(res => setTimeout(res, ms))

        async function update(step, move) { // 3
            await pause(100);
            console.log("step: ", step);
            $(window).trigger('autoPress', move);
            Game.ctx.clearRect(0, 0, 512, 512);
            delta = 1;
            Game.update(delta);
            Game.render();
        }

        async function walk() {
            // This loop needs to fully complete before it can repeat
            for (var move in moves) {
                console.log(moves[move]);
                // There are 4 steps to move each direction.
                for (let i = 0; i < 4; i++) {
                    await update(i, moves[move]);
                }
            }
        }
        
        walk();
        /*const promises = [];

        //for (var move in moves) {
        //    console.log(moves[move]);
        //}

        for (var move in moves) {
            console.log("Starting Move");

            promises.push(
                new Promise((resolve) => {
                    var times_run = 0;
                    let interval = setInterval(function () {
                        console.log("animation frame: ", times_run);

                        times_run++;
                        if (times_run >= 4) {
                            console.log("stoping walk");
                            clearInterval(interval);
                        }

                        $(window).trigger('autoPress', moves[move]);

                        // clear previous frame
                        Game.ctx.clearRect(0, 0, 512, 512);

                        delta = 1;

                        Game.update(delta);
                        Game.render();
                    }, 250);
                    times_run = 0;
                })
            );
        };
        await Promise.all(promises).then(() => {
            console.log("Animation Done");
        });*/
            /*)
            for (let num_ani = 0; num_ani < 4; num_ani++) {
                $(window).trigger('autoPress', moves[move]);
                Game.ctx.clearRect(0, 0, 512, 512);
                delta = 1;
                Game.update(delta);
                Game.render();
            }*/
        //}
    });

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
    Hero.SPEED = 16; // pixels per animation

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