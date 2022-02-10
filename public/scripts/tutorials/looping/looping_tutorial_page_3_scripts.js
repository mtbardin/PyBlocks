$(document).ready(function () {
	
	// make qS a shortcut for document.querySelector for usage in answer checking.
	const qS = document.querySelector.bind(document);
	
    // Listen for when the submit button for the Try It is clicked.
    $("#submitButtonOne").click(function () {

		// get program from workspace.
		let code = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());

		// set the filename.
		const fileName = "output.py";
		
		// listen for the output of the code execution.
		var socket = io();
		
		// save program first before running.
		//console.log(code);
		socket.emit('save', fileName, code, (response) => {
			console.log(response.status);
		});

		// now we can run program.
		socket.emit('run', fileName, (response) => {
			console.log(response.status);
		});
		
		socket.on('progOut', function (data) {
			// jQuery method of inputting data into an HTML element.
			let ans = data.output;
			$("#resultOne").text(ans);
			// Check to see if the answer is right.
			if (ans == "6\r\n") {
				$("#resultOne").text("Nice job!");
				$("#resultOne").css("background-color", "LimeGreen");
				$("#userOut").text("");

				// Replace the submit button with a golden star?
			}
			else {
				$("#resultOne").text("Incorrect, try again.");
				$("#resultOne").css("background-color", "Crimson");
				$("#userOut").text(ans);
			}
			
			
			});

    });
	
	//Tutorial: Looping
    var workspaceTut = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });

    var xmlContentTut = '<xml id="initiated" style="display: none">' +
		'	<block type="variables_set" deletable="false" movable="false">' +
		'		<field name="VAR">X</field>' +
		'		<value name="VALUE">' +
		'			<block type="math_number" deletable="false" movable="false">' +
		'				<field name="NUM">0</field>' +
		'			</block>' +
		'		</value>' +
		'	</block>' +
        ' 	<block type="controls_whileUntil" inline="false" deletable="false" x="0" y="50">' +
        ' 	</block>' +
        ' 	<block type="text_print" inline="false" deletable="false" x="0" y="150">' +
        ' 		<value name="TEXT">' +
        ' 			<block type="variables_get" deletable="false">' +
		'				<field name="VAR">X</field>' +
        ' 			</block>' +
        ' 		</value>' +
        ' 	</block>' +
        '</xml>';
    domTBGK = Blockly.Xml.textToDom(xmlContentTut);
    Blockly.Xml.domToWorkspace(domTBGK, workspaceTut);
});