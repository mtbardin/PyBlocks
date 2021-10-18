(function () {
    Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });
})();


(function () {
    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // when the user clicks 'run'
    qS("#run").addEventListener('click', function () {

        // get the filename and data
        const filename = qS("#runfilename").value;
        const data = qS("#rundata").value;

        // run
        runFile(filename, data, function (err) {
            if (err) {
                alert("failed to run: " + filename + "\n" + err);
            } else {
                qS("#rundata").value = data;
                alert("running: " + filename);
            }
        });
    });

    // when the user clicks 'execute'
    qS("#exe").addEventListener('click', function () {
        // get program from workspace.
        let code = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());

        // set the filename.
        const filename = "output.py";

        // save program first before running.
        saveFile(filename, code, function (err) {
            if (err) {
                alert("failed to save: " + filename + "\n" + err);
            } else {
                //alert("saved: " + filename);
            }
        });

        // now we can run program
        runFile(filename, code, function (err) {
            if (err) {
                alert("failed to run: " + filename + "\n" + err);
            } else {
                qS("#rundata").value = code;
                alert("running: " + filename);
            }
        });
    });

    function runFile(filename, data, callback) {
        let call = "run " + filename;
        //document.getElementById("output").innerHTML = call;
        doXhr(call, 'PUT', data, callback);
    }

    function saveFile(filename, data, callback) {
        let call = "save " + filename;
        //document.getElementById("output").innerHTML = call;
        doXhr(call, 'PUT', data, callback);
    }

    function doXhr(url, method, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send(data);
    }

    // listen for code execution output.
    var socket = io();
    socket.on('progOut', function (data) {
        document.getElementById("output").innerHTML = data.output;
    });
})();