/*
 * Special Tokens for finding Commands.
 * To prevent users from randomly executing a token the token is 
 * the MD5 hash of the command name (see at the end of the line).
 * MD5 Hashes calculated by https://www.md5hashgenerator.com/.
 * ----------------------------------------------------------------
 * 
 * TOKEN: e397b4fa67c25cc1c9eae980cfdd43eb    // MOVE_UP
 * TOKEN: 8b32429247158c80deab773f4e04e1c2    // MOVE_DOWN
 * TOKEN: d7aa835d76fc894935ade13f4d0624f8    // MOVE_LEFT
 * TOKEN: 3dc5ed1f827e8c9a6392edb90af992d5    // MOVE_RIGHT
 * 
 * TOKEN: 2f5dd3953d07d78bcf39f1488f6982f9    // PICK_1_FLOWER
 */

(function () {
    // JSON dictating the look and inputs of a block.
    let moveUpJson = {
        "type": "move_up",
        "message0": "Move Up",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Move the Character Up",
        "helpUrl": ""
    };
    let moveDownJson = {
        "type": "move_down",
        "message0": "Move Down",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Move the Character Down",
        "helpUrl": ""
    };
    let moveLeftJson = {
        "type": "move_left",
        "message0": "Move Left",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Move the Character Left",
        "helpUrl": ""
    };
    let moveRightJson = {
        "type": "move_right",
        "message0": "Move Right",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Move the Character Right",
        "helpUrl": ""
    };

    // Flower JSON.
    let pickOneFlowerJson = {
        "type": "pick_1_flower",
        "message0": "Pick One Flower",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Pick a single flower infront of the character.",
        "helpUrl": ""
    };



    // Create the block using the JSON.
    Blockly.Blocks['move_up'] = {
        init: function () {
            this.jsonInit(moveUpJson);
        }
    };
    Blockly.Blocks['move_down'] = {
        init: function () {
            this.jsonInit(moveDownJson);
        }
    };
    Blockly.Blocks['move_left'] = {
        init: function () {
            this.jsonInit(moveLeftJson);
        }
    };
    Blockly.Blocks['move_right'] = {
        init: function () {
            this.jsonInit(moveRightJson);
        }
    };

    // Flower Blocks.
    Blockly.Blocks['pick_1_flower'] = {
        init: function () {
            this.jsonInit(pickOneFlowerJson);
        }
    };



    // Build the python code the block creates.
    Blockly.Python['move_up'] = function (block) {
        let code = 'move_up()\n';
        return code;
    };
    Blockly.Python['move_down'] = function (block) {
        let code = 'move_down()\n';
        return code;
    };
    Blockly.Python['move_left'] = function (block) {
        let code = 'move_left()\n';
        return code;
    };
    Blockly.Python['move_right'] = function (block) {
        let code = 'move_right()\n';
        return code;
    };

    // Pick Flowers
    Blockly.Python['pick_1_flower'] = function (block) {
        let code = 'pick_1_flower()\n';
        return code;
    };
})();
