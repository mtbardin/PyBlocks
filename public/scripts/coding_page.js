(function () {
    Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });
})();


(function () {
    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

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

    // when the user clicks 'run'
    qS("#run").addEventListener('click', function () {
        // get the filename.
        const fileName = qS("#runfilename").value;

        // run program.
        socket.emit('run', fileName, (response) => {
            console.log(response.status);
        });
    });

    // listen for the output of the code execution.
    var socket = io();

    socket.on('progOut', function (data) {
        // document.getElementById("output").innerHTML = data.output;

        // jQuery method of inputting data into an HTML element.
        $("#output").text(data.output);
    });
})();