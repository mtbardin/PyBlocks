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

/*
(function () {
    async function task(i) { // 3
        await timer(250);
        console.log(`Task ${i} done!`);
    }

    async function main() {       
        for (let j = 0; j < 4; j++) { // 1
            console.log("animation frame");
            await task(j);
        }
    }

    main();

    function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
})();
*/

(function () {
    // listen for the output of the code execution.
    var socket = io();

    const tokens = new Set([
        "e397b4fa67c25cc1c9eae980cfdd43eb", // MOVE_UP
        "8b32429247158c80deab773f4e04e1c2", // MOVE_DOWN
        "d7aa835d76fc894935ade13f4d0624f8", // MOVE_LEFT
        "3dc5ed1f827e8c9a6392edb90af992d5"  // MOVE_RIGHT
    ]);

    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // Test an Animation.
    qS("#ani").addEventListener('click', function () {
        let moves = { 0: 83, 1: 83, 2: 68, 3: 68 }; // D, D, R, R
        console.log("moves to be animated");
        console.log(moves);
        $(window).trigger('animate', moves);
    });

    // when the user clicks 'execute'
    qS("#exe").addEventListener('click', function () {
        // clear the output form first.
        document.getElementById("output").innerHTML = "";

        // get program from workspace.
        let code = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());

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
    
    socket.on('progOut', function (data) {
        // document.getElementById("output").innerHTML = data.output;

        let programOutput = "";

        let moves = {};
        let num_moves = 0;
        let code = -1;

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

                code = -1;

                // MOVE_UP
                if (token == "e397b4fa67c25cc1c9eae980cfdd43eb") {
                    //code = 87;
                    //moves.push(87);
                    moves[num_moves] = 87;
                    num_moves++;
                }
                // MOVE_DOWN
                else if (token == "8b32429247158c80deab773f4e04e1c2") {
                    //moves.push(83);
                    moves[num_moves] = 83;
                    num_moves++;
                }
                // MOVE_LEFT
                else if (token == "d7aa835d76fc894935ade13f4d0624f8") {
                    //moves.push(65);
                    moves[num_moves] = 65;
                    num_moves++;
                }
                // MOVE_RIGHT
                else if (token == "3dc5ed1f827e8c9a6392edb90af992d5") {
                    //moves.push(68);
                    moves[num_moves] = 68;
                    num_moves++;
                }
                
                //$(window).trigger('autoPress', code);

                //
                function callback () {
                    console.log("movement done");
                    return{test: 1}
                };
                //$(window).trigger('animate', code);
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