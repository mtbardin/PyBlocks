(function () {
    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });

    // Starts the Workspace with a Print Block inside it.
    // this block can't be deleted.
    /*
    var xmlContent = '<xml id="initiated" style="display: none">' +
        '  <block type="text_print" deletable="false">' +
        '  </block>' +
        '</xml>';;

    dom = Blockly.Xml.textToDom(xmlContent);
    Blockly.Xml.domToWorkspace(dom, workspace);
    */
})();

(function () {
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
        "bcb6233cf8f73f40e0e02531e4c1312a" //CHECK_FLOWER_COLOR
    ]);

    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // Test an Animation.
    qS("#ani").addEventListener('click', function () {
        let moves = { 0: 68, 1: 68, 2: 83, 3: 83 }; // D, D, R, R
        console.log("moves to be animated");
        console.log(moves);
        $(window).trigger('animate', moves);
    });

    // when the user clicks 'execute'
    qS("#exe").addEventListener('click', function () {
        // clear the output form first.
        document.getElementById("output").innerHTML = "";
        document.getElementById("cmdOut").innerHTML = "Commands Being Run: ";

        // get program from workspace.
        let code = "from PyBlockFunctions import *\n\n";
        code += Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());

        // set the filename.
        const fileName = "output.py";

        // save program first before running.
        //console.log(code);
        socket.emit('save', fileName, code, (response) => {
            console.log(response.status);
        });

        // now we can run program.
        socket.emit('run', fileName, (response) => {
            console.log(response.status);
        });
    });

    $(window).on('successfulPick', function (event) {
        $("#cmdOut").append("\nSuccessfully Picked the Flower.");
    });
    $(window).on('unsuccessfulPick', function (event) {
        $("#cmdOut").append("\nUnsuccessfully Picked the Flower.");
    });

    $(window).on('sendColor', function (event, color) {
        console.log("COLOR: ", color);
        $("#cmdOut").append(`\nThe Flower is ${color}.`);
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

            if (testForToken.length == 2) {
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
                    $("#cmdOut").append("\nMoved Up.");
                }
                // MOVE_DOWN
                else if (token == "8b32429247158c80deab773f4e04e1c2") {
                    moves[num_moves] = 83;
                    num_moves++;
                    $("#cmdOut").append("\nMoved Down.");
                }
                // MOVE_LEFT
                else if (token == "d7aa835d76fc894935ade13f4d0624f8") {
                    moves[num_moves] = 65;
                    num_moves++;
                    $("#cmdOut").append("\nMoved Left.");
                }
                // MOVE_RIGHT
                else if (token == "3dc5ed1f827e8c9a6392edb90af992d5") {
                    moves[num_moves] = 68;
                    num_moves++;
                    $("#cmdOut").append("\nMoved Right.");
                }

                // ROTATE_RIGHT
                else if (token == "17ac59a0d27b38c77bd02f3bcefd5728") {
                    moves[num_moves] = "rotateRight";
                    num_moves++;
                    $("#cmdOut").append("\nRotated Right.");
                }
                // ROTATE_LEFT
                else if (token == "5d167d235f5a8880ec432fc13206106f") {
                    moves[num_moves] = "rotateLeft";
                    num_moves++;
                    $("#cmdOut").append("\nRotated Left.");
                }

                // PICK_1_FLOWER
                else if (token == "850b147aa1a7c75f7b4aaacac2d73407") {
                    //$(window).trigger('pickOneFlower');
                    moves[num_moves] = "pickOneFlower";
                    num_moves++;
                    $("#cmdOut").append("\nTrying to Pick a Flower.");
                }
                // CHECK_FLOWER_COLOR
                else if (token == "bcb6233cf8f73f40e0e02531e4c1312a") {
                    //$(window).trigger('pickOneFlower');
                    moves[num_moves] = "checkFlowerColor";
                    num_moves++;
                    $("#cmdOut").append("\nLooking at a Flower's Color.");
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

        console.log("moves: ", moves);
        if (Object.keys(moves).length >= 1) {
            console.log("triggering animation queue.")
            $(window).trigger('animate', moves);
        }

        // jQuery method of inputting data into an HTML element.
        $("#output").text(programOutput);

        // String for comparison needs to have "\r\n" added to the end,
        // otherwise the whole thing won't work.
        /*
        if (programOutput == "Hello World!\r\n") {
            $("#announcement").text("You Did it Right, Great Job!");
        }
        else if (programOutput == "Hello World\r\n") {
            $("#announcement").text("Try being a little more excited!");
        }
        else {
            $("#announcement").text("You made a Mistake, Try Again.");
        }
        */
    });
})();