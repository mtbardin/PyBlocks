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
			// Check to see if the answer is right.
			if (ans == "Good Morning, World!\r\n") {
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
	
	//Tutorial: Branching. Section: General Knowledge
    var workspaceTutBranchTwo = Blockly.inject('blocklyDivBranchTwo', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });

    var xmlContentTutBranchTwo = '<xml id="initiated" style="display: none">' +
		'	<block type="variables_set" deletable="false" movable="false">' +
		'		<field name="VAR">X</field>' +
		'		<value name="VALUE">' +
		'			<block type="math_number" deletable="false" movable="false">' +
		'				<field name="NUM">10</field>' +
		'			</block>' +
		'		</value>' +
		'	</block>' +
        '  <block type="controls_if" inline="false" deletable="false" x="0" y="50">' +
		'		<mutation else="1"></mutation>' +
		'		<statement name="IF0">' +
		'			<block type="logic_compare" deletable="false">' +
		'				<field name="OP">EQ</field>' +
		'				<value name="A">' +
		'					<block type="variables_get">' +
		'						<field name="VAR">X</field>' +
		'					</block>' +
		'				</value>' +
		'				<value name="B">' +
		'					<block type="math_number">' +
		'						<field name="NUM">2</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
		'		<statement name="DO0">' +
		'			<block type="text_print" deletable="false" movable="false">' +
		'				<value name="TEXT">' +
		'					<block type="text" deletable="false" movable="false">' +
		'						<field name="TEXT">Good Morning, World!</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
		'		<statement name="ELSE">' +
		'			<block type="text_print" deletable="false" movable="false">' +
		'				<value name="TEXT">' +
		'					<block type="text" deletable="false" movable="false">' +
		'						<field name="TEXT">Good Night, World.</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
        '  </block>' +
        '</xml>';
    domTBGK = Blockly.Xml.textToDom(xmlContentTutBranchTwo);
    Blockly.Xml.domToWorkspace(domTBGK, workspaceTutBranchTwo);
});