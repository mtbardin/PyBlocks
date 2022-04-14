/*
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Static_maps
 * https://medium.com/geekculture/make-your-own-tile-map-with-vanilla-javascript-a627de67b7d9
 * https://github.com/mozdevs/gamedev-js-tiles
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps#performance
 */

(function () {
    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });
})();

const pause = ms => new Promise(res => setTimeout(res, ms));

// 1 = blocklyWorkspace
// 0 = textWorkspace
let currentActiveWorkspace = 1;

// Flags for locking and canceling the gridworld animation.
let asyncBreak = false;
let locked = false;

// Store the previous data here.
let old_x = 0;
let old_y = 0;
let oldDirection = 0;
let oldInventory = [];
let oldNumItemsInInv = 0;
let oldLayers = [];

// Initialize the code mirror variable outside the functions to make it global.
let myCodeMirror = {};

// Store extra map data.
const maps = [
    [
         160,   // x pos
         160,   // y pos
         0,     // curr direction
         [],    // inventory
         0,     // num items in inv.
         [[     // map layers
             3, 3, 3, 3, 3, 3, 3, 3,
             3, 1, 1, 1, 1, 1, 1, 3,
             3, 1, 1, 1, 1, 2, 1, 3,
             3, 1, 1, 1, 1, 1, 1, 3,
             3, 1, 1, 2, 1, 1, 1, 3,
             3, 1, 1, 1, 2, 1, 1, 3,
             3, 1, 1, 1, 2, 1, 1, 3,
             3, 3, 3, 1, 2, 3, 3, 3
         ], [
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 9, 0, 0, 0, 9, 0,
             0, 0, 0, 0, 0, 0, 4, 0,
             0, 0, 0, 5, 0, 0, 18, 0,
             0, 0, 8, 0, 0, 11, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0,
             0, 22, 0, 0, 5, 0, 0, 0,
             0, 0, 0, 0, 0, 0, 0, 0
         ]]
    ],
    [
        352,   // x pos
        288,   // y pos
        1,     // curr direction
        [],    // inventory
        0,     // num items in inv.
        [[     // map layers
            3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 10, 10, 1, 1, 3,
            3, 1, 1, 10, 10, 2, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 3, 3, 3, 3, 3, 3, 3
        ], [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 8, 0, 0, 0, 0,
            0, 0, 11, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 4, 0, 0, 0, 0, 0, 0,
            0, 9, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
            ]]
    ],
    [
        288,   // x pos
        96,   // y pos
        2,     // curr direction
        [],    // inventory
        0,     // num items in inv.
        [[     // map layers
            3, 3, 3, 3, 3, 3, 3, 3,
            3, 10, 10, 1, 1, 10, 10, 3,
            3, 10, 1, 1, 1, 1, 10, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 10, 1, 1, 1, 1, 10, 3,
            3, 10, 10, 1, 1, 10, 10, 3,
            3, 3, 3, 3, 3, 3, 3, 3
        ], [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 18, 18, 0, 0, 0,
            0, 0, 0, 18, 18, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]]
    ],
    [
        96,   // x pos
        416,   // y pos
        3,     // curr direction
        [],    // inventory
        0,     // num items in inv.
        [[     // map layers
            3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 10, 10, 3,
            3, 1, 1, 1, 1, 10, 10, 3,
            3, 1, 2, 1, 1, 1, 1, 3,
            3, 1, 2, 1, 1, 1, 1, 3,
            3, 2, 1, 1, 1, 1, 1, 3,
            3, 2, 1, 1, 1, 10, 10, 3,
            3, 3, 3, 3, 3, 3, 3, 3
        ], [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 12, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 21, 0, 0, 0, 0, 9, 0,
            0, 0, 0, 0, 0, 17, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]]
    ]
];

(function () {
    // listen for the output of the code execution.
    let socket = io();

    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // Get the modal
    let blocklyWorkspace = document.getElementById('blocklyEditor');
    let textWorkspace = document.getElementById('textEditor');

    // Load up the code mirror editor on page load.
    window.addEventListener("load", function () {
        let myTextArea = document.getElementById("userTextInput");
        myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
            mode: "python",
            lineNumbers: true,
            theme: "midnight",
            tabSize: 4,
            extraKeys: {
                "Tab": function (cm) {
                    cm.replaceSelection("    ", "end");
                }
            },
            autocorrect: false,
            autocapitalize: false
            //viewportMargin: Infinity
        });
        myCodeMirror.refresh();
    });

    // Listen for switch to text only mode.
    qS("#styleSwitchBtn").addEventListener('click', function () {
        if (blocklyWorkspace.style.display.localeCompare("none") === 0) {
            blocklyWorkspace.style.display = "inline-block";
            textWorkspace.style.display = "none";
            currentActiveWorkspace = 1;
        }
        else {
            blocklyWorkspace.style.display = "none";
            textWorkspace.style.display = "inline-block";
            currentActiveWorkspace = 0;

            // Add a refresh to the code mirror to make sure the line numbers display correctly.
            myCodeMirror.refresh();
        }
    });

    document.getElementById('userTextInput').addEventListener('keydown', function (e) {
        // If tab key is pressed.
        if (e.key == 'Tab') {
            e.preventDefault();

            // Get location of caret (where the user is typing / text they have selected).
            var start = this.selectionStart;
            var end = this.selectionEnd;

            // Update the text in the textarea with 4 spaces where the caret is.
            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end);

            // Update the new caret position.
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });


    // Listen for save request.
    qS("#saveWorkspace").addEventListener('click', function () {
        // Do more sanitization on the file name but fine for now.
        let fileName = document.getElementById("saveWorkspaceName").value;

        // I want to have .py files for the text only saved codes.
        // I want .xml files for the blockly saved codes.

        // if blockly workspace is active.
        if (currentActiveWorkspace === 1) {
            let checkFileName = fileName.split('.');
            if (checkFileName.length > 2) {
                return
            }
            else if (checkFileName[1] !== "xml") {
                fileName += ".xml";
            }
        }
        // if text only workspace is active.
        else {
            let checkFileName = fileName.split('.');
            if (checkFileName.length > 2) {
                return
            }
            else if (checkFileName[1] !== "py") {
                fileName += ".py";
            }
        }

        // Extract data from cookies.
        let cookies = {};
        let decoded = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decoded.length; i++) {
            let nameValuePair = decoded[i].split("=");
            cookies[nameValuePair[0]] = nameValuePair[1];
        }

        // Get user ID from cookies.
        let userID = cookies.userId;

        let code = "";

        // if blockly workspace is active.
        if (currentActiveWorkspace === 1) {
            // get the blocks in the workspace
            code = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());

            // covert to a saveable format.
            code = Blockly.Xml.domToText(code);

            // Get generated python code.
            //Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
        }
        // if text only workspace is active.
        else {
            //code = document.getElementById('userTextInput').value;
            code = myCodeMirror.getValue();
        }
        
        socket.emit('saveWorkspace', userID, fileName, code, (response) => {
            console.log(response.status);
        });
    });

    // Listen for load request.
    qS("#loadWorkspace").addEventListener('click', function () {
        // Extract data from cookies.
        let cookies = {};
        let decoded = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decoded.length; i++) {
            let nameValuePair = decoded[i].split("=");
            cookies[nameValuePair[0]] = nameValuePair[1];
        }

        // Get user ID from cookies.
        let userID = cookies.userId;
        let filePath = "/user_workspaces/" + userID + "/" + document.getElementById("loadWorkspaceName").value;

        socket.emit('loadWorkspace', filePath, (response) => {
            console.log(response.status);
        });
    });

    // Listen for delete file request.
    qS("#deleteFileButton").addEventListener('click', function () {
        // Extract data from cookies.
        let cookies = {};
        let decoded = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decoded.length; i++) {
            let nameValuePair = decoded[i].split("=");
            cookies[nameValuePair[0]] = nameValuePair[1];
        }

        // Get user ID from cookies.
        let userID = cookies.userId;
        let filePath = "/user_workspaces/" + userID + "/" + document.getElementById("loadWorkspaceName").value;

        socket.emit('deleteFile', filePath, (response) => {
            console.log(response.status);
        });
    });

    socket.on('loadWorkspaceData', (data) => {
        // if blockly workspace is active.
        if (currentActiveWorkspace === 1) {
            let workspace = Blockly.getMainWorkspace();
            workspace.clear();
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(data), workspace);
        }

        // if text only workspace is active.
        else {
            //document.getElementById('userTextInput').value = data;
            myCodeMirror.getDoc().setValue(data);
        }
    });

    // Listen for get directory request.
    qS("#saveCode").addEventListener('click', function () {
        // Extract data from cookies.
        let cookies = {};
        let decoded = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decoded.length; i++) {
            let nameValuePair = decoded[i].split("=");
            cookies[nameValuePair[0]] = nameValuePair[1];
        }

        // Get user ID from cookies.
        let userID = cookies.userId;
        let filePath = "/user_workspaces/" + userID + "/";

        socket.emit('getSaveDir', filePath, userID, (response) => {
            console.log(response.status);
        });
    });

    // Listen for get directory request.
    qS("#loadCode").addEventListener('click', function () {
        // Extract data from cookies.
        let cookies = {};
        let decoded = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decoded.length; i++) {
            let nameValuePair = decoded[i].split("=");
            cookies[nameValuePair[0]] = nameValuePair[1];
        }

        // Get user ID from cookies.
        let userID = cookies.userId;
        let filePath = "/user_workspaces/" + userID + "/";

        socket.emit('getLoadDir', filePath, userID, (response) => {
            console.log(response.status);
        });
    });

    socket.on('deliverLoadDir', (data) => {
        // Show a menu with all of the files the user has saved.
        // https://www.w3schools.com/howto/howto_js_popup.asp
        let fileDisplay = document.getElementById("fileDisplay").style.display = 'block';
        document.getElementById("loadWorkspaceName").value = "";
        let fileList = document.getElementById("loadFileList");
        removeAllChildNodes(fileList);
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.addEventListener('click', function () {
                let inputfield = document.getElementById("loadWorkspaceName");
                inputfield.value = data[i];
            });

            // If the file is a .py file.
            let fileName = data[i].split(".");
            if (fileName[fileName.length - 1].localeCompare("py") === 0) {
                // made the background color light green.
                li.classList.add("pyFile");
            }
            // if the file is a .xml file.
            else {
                li.classList.add("xmlFile");
            }

            $(li).text(data[i]);
            fileList.appendChild(li);
        }
    });

    socket.on('deliverSaveDir', (data) => {
        // Show a menu with all of the files the user has saved.
        // https://www.w3schools.com/howto/howto_js_popup.asp
        let fileDisplay = document.getElementById("fileSaveDisplay").style.display = 'block';
        document.getElementById("saveWorkspaceName").value = "";
        let fileList = document.getElementById("saveFileList");
        removeAllChildNodes(fileList);
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.addEventListener('click', function () {
                let inputfield = document.getElementById("saveWorkspaceName");
                inputfield.value = data[i];
            });

            // If the file is a .py file.
            let fileName = data[i].split(".");
            if (fileName[fileName.length - 1].localeCompare("py") === 0) {
                // made the background color light green.
                li.classList.add("pyFile");
            }
            // if the file is a .xml file.
            else {
                li.classList.add("xmlFile");
            }

            $(li).text(data[i]);
            fileList.appendChild(li);
        }
    });
})();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


(function () {
    // Helper function to reset map.
    function resetMap(ID) {
        // Set data to what it was on page load.
        Game.hero.x = maps[ID][0];
        Game.hero.y = maps[ID][1];
        Game.hero.currentDirection = maps[ID][2];
        Game.hero.inventory = maps[ID][3];
        Game.hero.numItemsInInv = maps[ID][4];
        map.layers = JSON.parse(JSON.stringify(maps[ID][5]));

        // Clear visual inventory.
        while (document.getElementById("inventory").firstChild) {
            document.getElementById("inventory").removeChild(document.getElementById("inventory").lastChild);
        }

        // Clear command output and text output.
        document.getElementById("output").innerHTML = "";
        document.getElementById("cmdOut").innerHTML = "";

        // Redraw the grid world.
        Game.tick();
    }

    // Listen for map change request.
    document.getElementById("map-btn").addEventListener('click', function () {
        // Get layout to switch to.
        let changeId = parseInt(document.getElementById("map_id").value);
        console.log(`Switching Map to layout ${changeId+1}...`);

        resetMap(changeId);

        console.log(`Finshed Switching Map to layout ${changeId}...`);
    });

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

        //console.log("In Animation Loop");
        //console.log("moves = ", moves);

        async function updatePosition(step, move) {
            if (asyncBreak) {
                return;
            }
            else {
                await pause(200);
                //console.log("step: ", step);
                $(window).trigger('autoPress', move);
                Game.tick();
            }
        }

        async function animateSpell(x, y) {
            await pause(200);

            //console.log("xy", x, y);

            let new_pos = y * map.cols + x;
            let old_pos = -1;

            if (Game.hero.currentDirection == FACING_DOWN) {
                old_pos = (y - 1) * map.cols + x;
            }
            else if (Game.hero.currentDirection == FACING_LEFT) {
                old_pos = y * map.cols + (x + 1);
            }
            else if (Game.hero.currentDirection == FACING_RIGHT) {
                old_pos = y * map.cols + (x - 1);
            }
            else if (Game.hero.currentDirection == FACING_UP) {
                old_pos = (y + 1) * map.cols + x;
            }
            else {
                alert("Error in Spell Animation.");
                return
            }

            //console.log("spell path: ", old_pos, new_pos);

            // Update the spell's location.
            map.layers[1][new_pos] = 14;

            // Clear the previous location.
            map.layers[1][old_pos] = 0;

            await pause(200);

            // Update the game.
            Game.tick();
        }

        async function pickFlower() {
            await pause(200);
            
            $(window).trigger('pickOneFlower');
        }

        async function checkFlowerColor() {
            await pause(200);

            $(window).trigger('checkFlowerColor');
        }

        async function rotateRight() {
            await pause(300);

            if (Game.hero.currentDirection == FACING_DOWN) {
                Game.hero.currentDirection = FACING_RIGHT;
            }
            else if (Game.hero.currentDirection == FACING_LEFT) {
                Game.hero.currentDirection = FACING_DOWN;
            }
            else if (Game.hero.currentDirection == FACING_RIGHT) {
                Game.hero.currentDirection = FACING_UP;
            }
            else if (Game.hero.currentDirection == FACING_UP) {
                Game.hero.currentDirection = FACING_LEFT;
            }
            else {
                alert("Rotate Right Error: Invalid Character Direction");
            }

            Game.tick();
        }

        async function rotateLeft() {
            await pause(300);

            if (Game.hero.currentDirection == FACING_DOWN) {
                Game.hero.currentDirection = FACING_LEFT;
            }
            else if (Game.hero.currentDirection == FACING_LEFT) {
                Game.hero.currentDirection = FACING_UP;
            }
            else if (Game.hero.currentDirection == FACING_RIGHT) {
                Game.hero.currentDirection = FACING_DOWN;
            }
            else if (Game.hero.currentDirection == FACING_UP) {
                Game.hero.currentDirection = FACING_RIGHT;
            }
            else {
                alert("Rotate Left Error: Invalid Character Direction");
            }

            Game.tick();
        }

        async function pickUpTreasure() {
            await pause(200);

            $(window).trigger('pickUpSomeTreasure');
        }

        async function castMagic() {
            await pause(200);

            // Get the tiles infront of the character.
            let coords = findSpaceInFront();
            let check_col = coords[0];
            let check_row = coords[1];

            // Get the max number of possible tiles to check.
            let numTilesToCheck = 0
            if (Game.hero.currentDirection === FACING_DOWN) {
                numTilesToCheck = map.rows - check_row
            }
            else if (Game.hero.currentDirection === FACING_LEFT) {
                numTilesToCheck = check_col + 1
            }
            else if (Game.hero.currentDirection === FACING_RIGHT) {
                numTilesToCheck = map.cols - check_col
            }
            else if (Game.hero.currentDirection === FACING_UP) {
                numTilesToCheck = check_row + 1
            }

            // go through the number of possible tiles until a solid one is reached.
            let first_solid_square = 0;
            let check_x = Game.hero.x;
            let check_y = Game.hero.y;
            for (let i = 0; i < numTilesToCheck; i++) {
                //console.log(map.isSolidTileAtXY(check_x, check_y));
                if (Game.hero.currentDirection == FACING_DOWN) {
                    check_y += 64;
                    is_solid = map.isSolidTileAtXY(check_x, check_y);
                }
                else if (Game.hero.currentDirection == FACING_LEFT) {
                    check_x -= 64;
                    is_solid = map.isSolidTileAtXY(check_x, check_y);
                }
                else if (Game.hero.currentDirection == FACING_RIGHT) {
                    check_x += 64;
                    is_solid = map.isSolidTileAtXY(check_x, check_y);
                }
                else if (Game.hero.currentDirection == FACING_UP) {
                    check_y -= 64;
                    is_solid = map.isSolidTileAtXY(check_x, check_y);
                }
                if (is_solid) {
                    break
                }
                else {
                    first_solid_square += 1
                }
            }

            check_x = ((check_x - 32) / 64);
            check_y = ((check_y - 32) / 64);

            // Snake has tile number 4
            const snake = 4;

            // Get the value of the first solid block the character is looking at.
            let tile_value_to_check = map.getTile(1, check_x, check_y)

            // if there is a snake, animate the spell and remove the snake at the end of the animation.
            if (tile_value_to_check === snake) {
                let tile_pos_in_map = (check_y * map.cols) + check_x;

                let x = ((Game.hero.x - 32) / 64);
                let y = ((Game.hero.y - 32) / 64);
                for (let i = 0; i < first_solid_square; i++) {
                    if (Game.hero.currentDirection == FACING_DOWN) {
                        y += 1;
                        await animateSpell(x, y);
                        
                    }
                    else if (Game.hero.currentDirection == FACING_LEFT) {
                        x -= 1;
                        await animateSpell(x, y);
                        
                    }
                    else if (Game.hero.currentDirection == FACING_RIGHT) {
                        x += 1;
                        await animateSpell(x, y);
                        
                    }
                    else if (Game.hero.currentDirection == FACING_UP) {
                        y -= 1;
                        await animateSpell(x, y);
                        
                    }
                }

                // Remove Snake
                //console.log("Hit Snake");
                map.layers[1][tile_pos_in_map] = 0;

                await pause(100);

                // Remove Magic
                let final_pos = (y * map.cols) + x;
                map.layers[1][final_pos] = 0;

                // Update the game.
                Game.tick();
            }

            // if there isnt a snake, just animate the spell.
            else {
                let x = ((Game.hero.x - 32) / 64);
                let y = ((Game.hero.y - 32) / 64);
                for (let i = 0; i < first_solid_square; i++) {
                    if (Game.hero.currentDirection == FACING_DOWN) {
                        y += 1;
                        await animateSpell(x, y);
                    }
                    else if (Game.hero.currentDirection == FACING_LEFT) {
                        x -= 1;
                        await animateSpell(x, y);
                    }
                    else if (Game.hero.currentDirection == FACING_RIGHT) {
                        x += 1;
                        await animateSpell(x, y);
                    }
                    else if (Game.hero.currentDirection == FACING_UP) {
                        y -= 1;
                        await animateSpell(x, y);
                    }
                }

                let final_pos = (y * map.cols) + x;

                await pause(100);

                // Remove Magic
                map.layers[1][final_pos] = 0;

                // Update the game.
                Game.tick();

                //console.log("Missed Snake");
            }
        }

        async function walk() {
            // This loop needs to fully complete before it can repeat
            for (var move in moves) {
                if (asyncBreak) {
                    asyncBreak = false;
                    $(window).trigger('cancel');
                    break;
                }

                //console.log(moves[move]);

                // Flowers.
                if (moves[move] == "pickOneFlower") {
                    await pickFlower();
                }
                else if (moves[move] == "checkFlowerColor") {
                    await checkFlowerColor();
                }

                    // Rotation.
                else if (moves[move] == "rotateRight") {
                    await rotateRight();
                }
                else if (moves[move] == "rotateLeft") {
                    if (asyncBreak) {
                        break;
                    }
                    await rotateLeft();
                }

                // Movement.
                else if (moves[move] == 65 || moves[move] == 68 || moves[move] == 83 || moves[move] == 87) {
                    // There are 4 steps to move each direction.
                    for (let i = 0; i < 4; i++) {
                        await updatePosition(i, moves[move]);
                    }
                }

                else if (moves[move] == "pickUpTreasure") {
                    await pickUpTreasure();
                }

                else if (moves[move] == "castMagicSpell") {
                    await castMagic();
                }

                else {
                    await pause(100);
                    alert(`Error in Walk Function: Invalid Event ${moves[move]}.`);
                }
            }
        }

        // Walk through the queue of events in the grid world.
        walk();
    });

    function findSpaceInFront() {
        // Get the current grid space the character is in.
        //console.log(Game.hero.x, Game.hero.y);
        let curr_col = ((Game.hero.x - 32) / 64);
        let curr_row = ((Game.hero.y - 32) / 64);
        //console.log("x: ", curr_col, "y: ", curr_row);

        // Find the space in front of the character to check. 
        let check_col = -1;
        let check_row = -1;
        if (Game.hero.currentDirection == FACING_DOWN) {
            check_col = curr_col;
            check_row = curr_row + 1;
        }
        else if (Game.hero.currentDirection == FACING_LEFT) {
            check_col = curr_col - 1;
            check_row = curr_row;
        }
        else if (Game.hero.currentDirection == FACING_RIGHT) {
            check_col = curr_col + 1;
            check_row = curr_row;
        }
        else if (Game.hero.currentDirection == FACING_UP) {
            check_col = curr_col;
            check_row = curr_row - 1;
        }
        else {
            alert("Pick One Flower Error: Invalid Character Direction");
        }
        if (check_col <= -1 && check_row <= -1) {
            alert("Pick One Flower Error: Invalid Space to Check");
        }

        return [check_col, check_row];
    }

    // Add a Check Color Block?
    /*
    $(window).on('checkFlowerColor', function (event) {
        let coords = findSpaceInFront();
        let check_col = coords[0];
        let check_row = coords[1];

        let tile_value_to_check = map.getTile(1, check_col, check_row);

        // rows 1 for blue, 2 for red, 3 for orange, 4 for yellow.
        // columns need to be between 1 and 3.
        let row_of_flower = Math.floor(tile_value_to_check / atlas.rows);
        let col_of_flower = tile_value_to_check % atlas.cols;

        // Get name of color from position in the texture atlas.
        let color = "Not A Flower";
        if (row_of_flower == 1 && 1 <= col_of_flower && col_of_flower <= 3) {
            color = "Blue";
        }
        else if (row_of_flower == 2 && 1 <= col_of_flower && col_of_flower <= 3) {
            color = "Red";
        }
        else if (row_of_flower == 3 && 1 <= col_of_flower && col_of_flower <= 3) {
            color = "Orange";
        }
        else if (row_of_flower == 4 && 1 <= col_of_flower && col_of_flower <= 3) {
            color = "Yellow";
        }

        //return color;
        $(window).trigger('sendColor', color);
    });
    */
    
    $(window).on('pickOneFlower', function (event) {
        // Pick the flower infront of the character.
        let coords = findSpaceInFront();
        let check_col = coords[0];
        let check_row = coords[1];

        let tile_value_to_check = map.getTile(1, check_col, check_row);
        let tile_pos_in_map = check_row * map.cols + check_col;

        // Flowers are tile numbers: 6,7,8; 11,12,13; 16,17,18; and 21,22,23
        // tile number % num_rows == 1 for a single flower, 2 for two flowers, and 3 for three flowers.
        // This works because in the atlas the flower series are on their own row and go in order.

        const flowers = new Set([
            6, 7, 8,    // Blue Flowers
            11, 12, 13, // Red Flowers
            16, 17, 18, // Orange Flowers
            21, 22, 23  // Yellow Flowers
        ]);

        num_flowers = tile_value_to_check % atlas.rows;

        // 1 for blue, 2 for red, 3 for orange, 4 for yellow.
        colors = ["blue_flower", "red_flower", "orange_flower", "yellow_flower"]
        color_of_flower = colors[Math.floor(tile_value_to_check / atlas.rows) - 1];

        // If picking a single flower replace it with an empty space.
        if (num_flowers == 1 && flowers.has(tile_value_to_check)) { // flower with one bloom.
            //console.log("Picking Flower");
            map.layers[1][tile_pos_in_map] = 0;

            // Update the game.
            Game.tick();

            // Add the flower to the inventory.
            Game.hero.inventory.push(`"${color_of_flower}"`);

            // Add one to the total number of items in the inventory.
            Game.hero.numItemsInInv += 1;

            // Add image to visual inventory.
            let img = `<img src="/assets/${color_of_flower}.png" id="invItem${Game.hero.numItemsInInv}"/>`;
            document.getElementById("inventory").insertAdjacentHTML("beforeend", img);

            $("#cmdOut").append("Successfully Picked the Flower.\n");
        }
        else if ((num_flowers == 2 || num_flowers == 3) && flowers.has(tile_value_to_check)) { // flower with two or three blooms.
            //console.log("Picking Flower");
            map.layers[1][tile_pos_in_map] -= 1;

            // Update the game.
            Game.tick();

            // Add the flower to the inventory.
            //console.log(Game.hero.inventory);
            Game.hero.inventory.push(`"${color_of_flower}"`);

            // Add one to the total number of items in the inventory.
            Game.hero.numItemsInInv += 1;

            // Add image to visual inventory.
            let img = `<img src="/assets/${color_of_flower}.png" id="invItem${Game.hero.numItemsInInv}"/>`;
            document.getElementById("inventory").insertAdjacentHTML("beforeend", img);

            $(window).trigger('successfulPick');
        }

        // There wasn't a flower to be picked so return an unsuccessful pick.
        else {
            $("#cmdOut").append("Unsuccessfully tried to pick some Flowers.\n");
        }
        //console.log(map.layers);
    });

    $(window).on('pickUpSomeTreasure', function (event) {
        // Pick the flower infront of the character..
        let coords = findSpaceInFront();
        let check_col = coords[0];
        let check_row = coords[1];

        let tile_value_to_check = map.getTile(1, check_col, check_row);
        let tile_pos_in_map = check_row * map.cols + check_col;

        // Treasure has tile number 9
        const treasure = 9;

        // If there is treasure grab it and replace it with an empty space.
        if (tile_value_to_check === treasure) {
            //console.log("Grabbing Treasure");
            map.layers[1][tile_pos_in_map] = 0;

            // Update the game.
            Game.tick();

            // Add the flower to the inventory.
            Game.hero.inventory.push(`"treasure"`);

            // Add one to the total number of items in the inventory.
            Game.hero.numItemsInInv += 1;

            // Add image to visual inventory.
            let img = `<img src="/assets/treasure.png" id="invItem${Game.hero.numItemsInInv}"/>`;
            document.getElementById("inventory").insertAdjacentHTML("beforeend", img);

            $("#cmdOut").append("Successfully grabbed the Treasure.\n");
        }
        // There wasn't treasure to be grabbed so return an unsuccessful trigger.
        else {
            $("#cmdOut").append("Unsuccessfully tried to grab some Treasure.\n");
        }
    });

    $(window).on('castMagic', function (event) {
        
    });

    Game.tick = function (elapsed) {
        //window.requestAnimationFrame(this.tick);

        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);

        // compute delta time in seconds -- also cap it
        //var delta = (elapsed - this._previousElapsed) / 1000.0;
        //delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        //this._previousElapsed = elapsed;

        // I added this because I don't need a delta time variable
        // Only ever moving one square at a time and timing isn't user controlled.
        delta = 1;

        this.update(delta);
        this.render();
    }.bind(Game);

    // start up function
    window.onload = function () {
        var context = document.getElementById('gridWorld').getContext('2d');
        Game.run(context);
    };

    // Store info about the Texture Map Atlas.
    var atlas = {
        // Texture Map Atlas Size. 
        cols: 5,
        rows: 5,

        // Tile Size.
        tsize: 64
    };

    var map = {
        // Map Size
        cols: 8,
        rows: 8,

        // Tile Size.
        tsize: 64,

        // Map Layers.
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
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 9, 0, 0, 0, 9, 0,
            0, 0, 0, 0, 0, 0, 4, 0,
             0, 0, 0, 5, 0, 0, 18, 0,
            0, 0, 8, 0, 0, 11, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 22, 0, 0, 5, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
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
                //var isSolid = (tile === 3 || tile === 5 || tile === 6);
                var isntSolid = !(tile === 0 || tile === 1 || tile === 2);
                return res || isntSolid;
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

        this.currentDirection = 0;

        this.image = Loader.getImage('hero');

        // Inventory Array
        this.inventory = new Array();
        this.numItemsInInv = 0;
    }

    // changed from 256
    Hero.SPEED = 16; // pixels per animation

    //Hero.inventory = [];

    //https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
    const FACING_DOWN = 0;
    const FACING_LEFT = 1;
    const FACING_RIGHT = 2;
    const FACING_UP = 3;
    //let currentDirection = FACING_DOWN;

    Hero.prototype.draw = function (frameX, frameY, canvasX, canvasY) {
        Game.ctx.drawImage(Game.hero.image,
            frameY * map.tsize,
            frameX * map.tsize,
            map.tsize,
            map.tsize,
            canvasX,
            canvasY,
            map.tsize,
            map.tsize
        );
    };

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
        
        if (Keyboard.isDown(Keyboard.LEFT)) {
            dirx = -1;
            this.hero.currentDirection = FACING_LEFT;
            Keyboard._keys[65] = false;
        }
        else if (Keyboard.isDown(Keyboard.RIGHT)) {
            dirx = 1;
            this.hero.currentDirection = FACING_RIGHT;
            Keyboard._keys[68] = false;
        }
        else if (Keyboard.isDown(Keyboard.UP)) {
            diry = -1;
            this.hero.currentDirection = FACING_UP;
            Keyboard._keys[87] = false;
        }
        else if (Keyboard.isDown(Keyboard.DOWN)) {
            diry = 1;
            this.hero.currentDirection = FACING_DOWN;
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
                    tile -= 1;
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile % atlas.cols) * map.tsize, // source x
                        Math.floor(tile / atlas.cols) * map.tsize, // source y
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
        /*
        this.ctx.drawImage(
            this.hero.image,
            this.hero.screenX - this.hero.width / 2,
            this.hero.screenY - this.hero.height / 2
        );*/

        // Rewrite the function and constants at lines 364-378 to be more like the first implementation.
        // maybe make a drawHero() function. that would be nice. 
        //currentDirection = 0;
        this.hero.draw(0, this.hero.currentDirection, this.hero.screenX - this.hero.width / 2, this.hero.screenY - this.hero.width / 2);

        // draw map top layer
        this._drawLayer(1);

        this._drawGrid();
    };

    // extra
    // listen for the output of the code execution.
    var socket = io();

    const tokens = new Set([
        "e397b4fa67c25cc1c9eae980cfdd43eb", // MOVE_UP
        "8b32429247158c80deab773f4e04e1c2", // MOVE_DOWN
        "d7aa835d76fc894935ade13f4d0624f8", // MOVE_LEFT
        "3dc5ed1f827e8c9a6392edb90af992d5", // MOVE_RIGHT

        "17ac59a0d27b38c77bd02f3bcefd5728", // ROTATE_RIGHT
        "5d167d235f5a8880ec432fc13206106f", // ROTATE_LEFT

        "850b147aa1a7c75f7b4aaacac2d73407", // PICK_ONE_FLOWER
        "bcb6233cf8f73f40e0e02531e4c1312a", // CHECK_FLOWER_COLOR

        "0e56db162647eb767eff3dbb1c774c24", // CAST_MAGIC
        "ce495d13cc94ae8787006012f6aab0de"  // PICK_UP_TREASURE
    ]);

    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // when the user clicks 'execute'
    qS("#exe").addEventListener('click', function () {
        // Only let the code be generated, executed, and displayed if
        // there isn't a program running already.
        if (!locked) {
            locked = true;

            // Save data before executing.
            old_x = Game.hero.x;
            old_y = Game.hero.y;
            oldDirection = Game.hero.currentDirection;
            oldNumItemsInInv = Game.hero.numItemsInInv;
            // Make sure to save a copy using JSON parsing, instead of passing by reference.
            // Needs this work around since layers is a nested list. otherwise i'd use spread.
            oldInventory = JSON.parse(JSON.stringify(Game.hero.inventory));
            oldLayers = JSON.parse(JSON.stringify(map.layers));

            // clear the output form first.
            document.getElementById("output").innerHTML = "";
            document.getElementById("cmdOut").innerHTML = "";

            // Update the python library file that holds the grid world data for the
            // user's program.
            let curr_hero_x = ((Game.hero.x - 32) / 64);
            let curr_hero_y = ((Game.hero.y - 32) / 64);
            //console.log(map.layers, curr_hero_x, curr_hero_y);
            let new_grid_world_data = "hero_x = " + curr_hero_x + "\n";
            new_grid_world_data += "hero_y = " + curr_hero_y + "\n\n";

            // Save Map Size.
            new_grid_world_data += "map_cols = " + map.cols + "\n";
            new_grid_world_data += "map_rows = " + map.rows + "\n\n";

            // Get Hero's Direction.
            new_grid_world_data += "hero_direction = " + Game.hero.currentDirection + "\n\n";

            // Get Hero's Inventory.
            new_grid_world_data += "inventory = [" + Game.hero.inventory + "]\n\n";

            new_grid_world_data += "layers = [";
            for (let i = 0; i < map.layers.length; i++) {
                if (i + 1 != map.layers.length) {
                    new_grid_world_data += "[" + map.layers[i] + "],";
                }
                else {
                    new_grid_world_data += "[" + map.layers[i] + "]";
                }
            }
            new_grid_world_data += "]";
            //console.log(new_grid_world_data);

            // set the filename.
            const gwdFileName = "interactive_gwd.py";
            socket.emit('save', gwdFileName, new_grid_world_data, (response) => {
                console.log(response.status);
            });

            // begin building the code to compile and execute.
            // add the needed libraries.
            let code = "from PyBlockFunctions import *\n";
            code += "from interactive_gwd import *\n\n";

            // then get program from workspace.
            // if blockly workspace is active.
            if (currentActiveWorkspace === 1) {
                code += Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
            }

            // if text only workspace is active.
            else {
                //code += document.getElementById('userTextInput').value;
                code += myCodeMirror.getValue();
            }

            // set the filename.
            const fileName = "output.py";

            // save program first before running.
            socket.emit('save', fileName, code, (response) => {
                console.log(response.status);
            });

            // now we can run program.
            socket.emit('run', fileName, (response) => {
                console.log(response.status);
            });
        }
        else {
            alert("Wait for the animation to finish before executing again.");
        }
    });

    // when the user clicks 'cancel'
    qS("#cancel").addEventListener('click', function () {
        /* // Only cancel if an animation is currently playing i.e. locked == true.
        if (locked) {

        else {
            alert("You can only cancel an animation when one is playing.");
        }*/

        console.log("Aborting...");

        // Update flags.
        asyncBreak = true;
        locked = false;

        $(window).on('cancel', function (event) {
            // Set data to what it was before executing.
            Game.hero.x = old_x;
            Game.hero.y = old_y;
            Game.hero.currentDirection = oldDirection;
            Game.hero.inventory = oldInventory;
            Game.hero.numItemsInInv = oldNumItemsInInv;
            map.layers = oldLayers;

            // Regenerate inventory images from inventory list.
            while (document.getElementById("inventory").firstChild) {
                document.getElementById("inventory").removeChild(document.getElementById("inventory").lastChild);
            }
            for (i in oldInventory) {
                // Add .slice(1, -1) to get rid of the double quotes needed to save into a python file.
                let img = `<img src="/assets/${oldInventory[i].slice(1, -1)}.png" id="invItem${i}"/>`;
                document.getElementById("inventory").insertAdjacentHTML("beforeend", img);
            }

            // Just clear out the text outputs.
            document.getElementById("output").innerHTML = "";
            document.getElementById("cmdOut").innerHTML = "";

            // Redraw the grid world.
            Game.tick();

            console.log("Abort Successful");
        });
    });

    // when the user clicks 'reset'
    qS("#reset").addEventListener('click', function () {
        console.log("Resetting...");
        let changeId = document.getElementById("map_id").value;

        resetMap(changeId);

        console.log("Finished Reset.");
    });

    $(window).on('sendColor', function (event, color) {
        //console.log("COLOR: ", color);
        $("#cmdOut").append(`The Flower is ${color}.\n`);
    });

    socket.on('progOut', function (data) {
        // document.getElementById("output").innerHTML = data.output;

        let programOutput = "";

        let moves = {};
        let num_moves = 0;

        // Split the returned program output into lines.
        let lines = data.output.split("\n");

        // Test the line to see if it contains a special token.
        for (let line = 0; line < lines.length - 1; line++) {
            //console.log(lines[line]);

            let testForToken = lines[line].split(":");
            let lineIsToken = false;

            if (testForToken.length >= 2) {
                if (testForToken[0] == "TOKEN") {
                    if (tokens.has(testForToken[1].trim())) {
                        lineIsToken = true;
                    }
                }
            }

            // Only add line to output if it isn't a valid token.
            if (lineIsToken) {
                // Do stuff according to the token type.
                let token = testForToken[1].trim();

                // MOVE_UP
                if (token == "e397b4fa67c25cc1c9eae980cfdd43eb") {
                    moves[num_moves] = 87;
                    num_moves++;
                    $("#cmdOut").append("Moved Up.\n");
                }
                // MOVE_DOWN
                else if (token == "8b32429247158c80deab773f4e04e1c2") {
                    moves[num_moves] = 83;
                    num_moves++;
                    $("#cmdOut").append("Moved Down.\n");
                }
                // MOVE_LEFT
                else if (token == "d7aa835d76fc894935ade13f4d0624f8") {
                    moves[num_moves] = 65;
                    num_moves++;
                    $("#cmdOut").append("Moved Left.\n");
                }
                // MOVE_RIGHT
                else if (token == "3dc5ed1f827e8c9a6392edb90af992d5") {
                    moves[num_moves] = 68;
                    num_moves++;
                    $("#cmdOut").append("Moved Right.\n");
                }

                // ROTATE_RIGHT
                else if (token == "17ac59a0d27b38c77bd02f3bcefd5728") {
                    moves[num_moves] = "rotateRight";
                    num_moves++;
                    $("#cmdOut").append("Rotated Right.\n");
                }
                // ROTATE_LEFT
                else if (token == "5d167d235f5a8880ec432fc13206106f") {
                    moves[num_moves] = "rotateLeft";
                    num_moves++;
                    $("#cmdOut").append("Rotated Left.\n");
                }

                // PICK_1_FLOWER
                else if (token == "850b147aa1a7c75f7b4aaacac2d73407") {
                    //$(window).trigger('pickOneFlower');
                    moves[num_moves] = "pickOneFlower";
                    num_moves++;
                    $("#cmdOut").append("Trying to Pick a Flower.\n");
                }
                // CHECK_FLOWER_COLOR
                else if (token == "bcb6233cf8f73f40e0e02531e4c1312a") {
                    //$(window).trigger('pickOneFlower');
                    moves[num_moves] = "checkFlowerColor";
                    num_moves++;
                    $("#cmdOut").append("Looking at a Flower's Color.\n");

                    if (testForToken[2].trim() == "No Flower") {
                        programOutput = programOutput + "There is " + testForToken[2].trim() + "\n";
                    }
                    else {
                        programOutput = programOutput + "The Flower is " + testForToken[2].trim() + "\n";
                    }
                }

                // PICK_UP_TREASURE
                else if (token == "ce495d13cc94ae8787006012f6aab0de") {
                    moves[num_moves] = "pickUpTreasure";
                    num_moves++;
                    $("#cmdOut").append("Trying to Pick Up Treasure.\n");
                }

                // CAST_MAGIC
                else if (token == "0e56db162647eb767eff3dbb1c774c24") {
                    moves[num_moves] = "castMagicSpell";
                    num_moves++;
                    $("#cmdOut").append("Casting a Magic Spell.\n");
                }
            }
            else {
                // Add the line to the output.
                // Make sure to readd the "\n" that got removed during the split.
                programOutput = programOutput + lines[line] + "\n";
            }

            // Reset if token variable.
            lineIsToken = false;
        }

        //console.log("moves: ", moves);
        if (Object.keys(moves).length >= 1) {
            console.log("triggering animation queue.")
            $(window).trigger('animate', moves);
        }

        // jQuery method of inputting data into an HTML element.
        $("#output").text(programOutput);

        // Finished animating the code so set locked to false
        // to allow use to run another program.
        locked = false;
    });
})();