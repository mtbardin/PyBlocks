/*
 * Special Tokens for finding Commands.
 * To prevent users from randomly executing a token the token is 
 * the MD5 hash of the command name (see at the end of the line).
 * MD5 Hashes calculated by https://www.md5hashgenerator.com/.
 * ----------------------------------------------------------------
 * 
 * TOKEN:e397b4fa67c25cc1c9eae980cfdd43eb    // MOVE_UP
 * TOKEN:8b32429247158c80deab773f4e04e1c2    // MOVE_DOWN
 * TOKEN:d7aa835d76fc894935ade13f4d0624f8    // MOVE_LEFT
 * TOKEN:3dc5ed1f827e8c9a6392edb90af992d5    // MOVE_RIGHT
 * 
 * TOKEN:17ac59a0d27b38c77bd02f3bcefd5728    // ROTATE_RIGHT
 * TOKEN:5d167d235f5a8880ec432fc13206106f    // ROTATE_LEFT
 * 
 * TOKEN:850b147aa1a7c75f7b4aaacac2d73407    // PICK_ONE_FLOWER
 * TOKEN:bcb6233cf8f73f40e0e02531e4c1312a    // CHECK_FLOWER_COLOR
 * No Token Needed                           // CHECK_FACING_FLOWER
 * 
 * TOKEN:0e56db162647eb767eff3dbb1c774c24    // CAST_MAGIC
 * TOKEN:ce495d13cc94ae8787006012f6aab0de    // PICK_UP_TREASURE
 * No Token Needed                           // CHECK_FACING_TREASURE
 * No Token Needed                           // CHECK_FACING_SNAKE
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

    // Rotation JSON.
    let rotateRightJson = {
        "type": "rotate_right",
        "message0": "Rotate to the Right",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Rotate the Character Right",
        "helpUrl": ""
    };
    let rotateLeftJson = {
        "type": "rotate_left",
        "message0": "Rotate to the Left",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Rotate the Character Left",
        "helpUrl": ""
    };

    // Flower JSON.
    let pickOneFlowerJson = {
        "type": "pick_one_flower",
        "message0": "Pick One Flower",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Pick a single flower infront of the character.",
        "helpUrl": ""
    };
    let checkFlowerColorJson = {
        "type": "check_flower_color",
        "message0": "Check the color of a flower.",
		"output":"String",
        "colour": 230,
        "tooltip": "Check the color of the flower infront of the character.",
        "helpUrl": ""
    };
    let checkFacingFlowerJson = {
        "type": "check_facing_flower",
        "message0": "Check if you are facing a flower.",
		"output": "Boolean",
        "colour": 230,
        "tooltip": "Check if there exists a flower in front of the character.",
        "helpUrl": ""
    };
    
    // Snake, Treasure, and Magic JSON.
    let castMagicJson = {
        "type": "cast_magic",
        "message0": "Cast a magic spell",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 80,
        "tooltip": "Use this magic spell to fight snakes.",
        "helpUrl": ""
    };
    let pickUpTreasureJson = {
        "type": "pick_up_treasure",
        "message0": "Pick up Treasure",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 80,
        "tooltip": "Pick up any treasure you see.",
        "helpUrl": ""
    };
    let checkFacingTreasureJson = {
        "type": "check_facing_treasure",
        "message0": "Check if you are facing treasure",
        "output": "Boolean",
        "colour": 80,
        "tooltip": "Check if there exists a flower in front of the character.",
        "helpUrl": ""
    };
    let canSeeSnakeJson = {
        "type": "can_see_snake",
        "message0": "Look for Snakes",
        "output": "Boolean",
        "colour": 80,
        "tooltip": "Check if a snake is in range of your magic.",
        "helpUrl": ""
    };

    // Text Block
    let textBlockJson = {
        "type": "python_text_block",
        "message0": "Python Code: %1",
        "args0": [
            {
                "type": "field_multilinetext",
                "name": "pythonCode",
                "spellcheck": false
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        //"output": "String",
        "colour": 245,
        "tooltip": "Try out coding in Python.",
        "helpUrl": ""
    };
	
	// Put Block
	let putBlockJson = {
	  "type": "text_put",
	  "message0": "put %1",
	  "args0": [
		{
		  "type": "input_value",
		  "name": 'TEXT'
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 105,
	  "tooltip": "Print a string without creating a new line.",
	  "helpUrl": ""
	};
	
	let newlineBlockJson = {
	  "type": "text_newline",
	  "message0": "newline",
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 105,
	  "tooltip": "Go to a newline without printing anything.",
	  "helpUrl": ""
	};

    // Comment Blocks
    let commentBlockJson = {
        "type": "single_line_comment",
        "message0": "Comment %1",
        "args0": [
            {
                "type": "field_input",
                "name": "input_value",
                "spellcheck": false
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 300,
        "tooltip": "Add a single-line comment to your code.",
        "helpUrl": ""
    };
    let multilineCommentBlockJson = {
        "type": "multi_line_comment",
        "message0": "Multi-line %1 Comment %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_multilinetext",
                "name": "input_value",
                "spellcheck": false
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 300,
        "tooltip": "Add a multi-line comment to your code.",
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

    // Rotation Blocks
    Blockly.Blocks['rotate_right'] = {
        init: function () {
            this.jsonInit(rotateRightJson);
        }
    };
    Blockly.Blocks['rotate_left'] = {
        init: function () {
            this.jsonInit(rotateLeftJson);
        }
    };

    // Flower Blocks.
    Blockly.Blocks['pick_one_flower'] = {
        init: function () {
            this.jsonInit(pickOneFlowerJson);
        }
    };
    Blockly.Blocks['check_flower_color'] = {
        init: function () {
            this.jsonInit(checkFlowerColorJson);
        }
    };
    Blockly.Blocks['check_facing_flower'] = {
        init: function () {
            this.jsonInit(checkFacingFlowerJson);
        }
    };

    // Text Blocks
    Blockly.Blocks['python_text_block'] = {
        init: function () {
            this.jsonInit(textBlockJson);
        }
    };
	
    Blockly.Blocks['text_put'] = {
        init: function () {
            this.jsonInit(putBlockJson);
        }
    };
	
    Blockly.Blocks['text_newline'] = {
        init: function () {
            this.jsonInit(newlineBlockJson);
		}
	};
    // Snake, Treasure, and Magic Blocks.
    Blockly.Blocks['cast_magic'] = {
        init: function () {
            this.jsonInit(castMagicJson);
        }
    };
    Blockly.Blocks['pick_up_treasure'] = {
        init: function () {
            this.jsonInit(pickUpTreasureJson);
        }
    };
    Blockly.Blocks['check_facing_treasure'] = {
        init: function () {
            this.jsonInit(checkFacingTreasureJson);
        }
    };
    Blockly.Blocks['can_see_snake'] = {
        init: function () {
            this.jsonInit(canSeeSnakeJson);
        }
    };

    // Comments
    Blockly.Blocks['single_line_comment'] = {
        init: function () {
            this.jsonInit(commentBlockJson);
        }
    };
    Blockly.Blocks['multi_line_comment'] = {
        init: function () {
            this.jsonInit(multilineCommentBlockJson);
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

    // Rotation.
    Blockly.Python['rotate_right'] = function (block) {
        let code = 'rotate_right()\n';
        return code;
    };
    Blockly.Python['rotate_left'] = function (block) {
        let code = 'rotate_left()\n';
        return code;
    };

    // Pick Flowers
    Blockly.Python['pick_one_flower'] = function (block) {
        let code = 'pick_one_flower()\n';
        return code;
    };
    Blockly.Python['check_flower_color'] = function (block) {
        let code = 'check_flower_color()';
        return [code, Blockly.Python.ORDER_NONE];
    };
    Blockly.Python['check_facing_flower'] = function (block) {
        let code = 'check_facing_flower()';
        return [code, Blockly.Python.ORDER_NONE];
    };

    // Text Block
    Blockly.Python['python_text_block'] = function (block) { 
        let code = block.getFieldValue('pythonCode') + '\n';
        //console.log(code);
        return code;
    };
    Blockly.Python['text_put'] = function (block) { 
        const msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'';
		return 'print(' + msg + ', end="")\n';
    };
	
    Blockly.Python['text_newline'] = function (block) { 
		return 'print()\n';
    };
    
    // Treasure, Snake, and Magic.
    Blockly.Python['cast_magic'] = function (block) {
        let code = 'cast_magic()\n';
        return code;
    };
    Blockly.Python['pick_up_treasure'] = function (block) {
        let code = 'pick_up_treasure()\n';
        return code;
    };
    Blockly.Python['check_facing_treasure'] = function (block) {
        let code = 'check_facing_treasure()';
        return [code, Blockly.Python.ORDER_NONE];
    };
    Blockly.Python['can_see_snake'] = function (block) {
        let code = 'can_see_snake()';
        return [code, Blockly.Python.ORDER_NONE];
    };

    // Comments.
    Blockly.Python['single_line_comment'] = function (block) {
        let code = '# ' + block.getFieldValue('input_value') + '\n';
        return code;
    };
    Blockly.Python['multi_line_comment'] = function (block) {
        let code = '""" ' + block.getFieldValue('input_value') + '"""\n';
        return code;
    };
})();
