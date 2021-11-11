(function () {
    Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });
})();


(function () {
    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // when the user clicks 'craft'
    qS("#craft").addEventListener('click', function () {
        // get the block's xml data from the workspace.
        let xmlDOM = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        let xmlText = Blockly.Xml.domToPrettyText(xmlDOM);

        // Split the string to append 's and +'s.
        var arr = xmlText.split("\n");
        var code = "";
        for (var i = 0; i < arr.length-1; i++) {
            code += "'" + arr[i] + "' +\n";
        }
        code += "'" + arr[arr.length-1] + "'\n";

        // set the filename.
        const fileName = "output_xml.txt";

        // save program first before running.
        socket.emit('save', fileName, code, (response) => {
            console.log(response.status);
        });
    });
    
    var socket = io();
})();