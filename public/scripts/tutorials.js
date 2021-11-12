(function () {
	/*Generic Bits, copy from here.
    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });
	var xmlContentTutBranchGenKnow = '';
	
    domTBGK = Blockly.Xml.textToDom(xmlContentTutBranchGenKnow);
    Blockly.Xml.domToWorkspace(dom, workspace);
	*/
	
	//Tutorial: Branching. Section: General Knowledge
    var workspaceTutBranchGenKnow = Blockly.inject('blocklyDivBranchGenKnow', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });

    var xmlContentTutBranchGenKnow = '<xml id="initiated" style="display: none">' +
		'	<block type="variables_set" deletable="false" movable="false">' +
		'		<field name="VAR">X</field>' +
		'		<value name="VALUE">' +
		'			<block type="math_number" deletable="false" movable="false">' +
		'				<field name="NUM">10</field>' +
		'			</block>' +
		'		</value>' +
		'	</block>' +
        '  <block type="controls_if" inline="false" deletable="false" x="0" y="50">' +
		'		<mutation else="1" elseif="1"></mutation>' +
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
		'		<statement name="IF1">' +
		'			<block type="logic_compare" deletable="false">' +
		'				<field name="OP">GT</field>' +
		'				<value name="A">' +
		'					<block type="variables_get">' +
		'						<field name="VAR">X</field>' +
		'					</block>' +
		'				</value>' +
		'				<value name="B">' +
		'					<block type="math_number">' +
		'						<field name="NUM">5</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
		'		<statement name="DO1">' +
		'			<block type="text_print" deletable="false" movable="false">' +
		'				<value name="TEXT">' +
		'					<block type="text" deletable="false" movable="false">' +
		'						<field name="TEXT">Good Night, World.</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
		'		<statement name="ELSE">' +
		'			<block type="text_print" deletable="false" movable="false">' +
		'				<value name="TEXT">' +
		'					<block type="text" deletable="false" movable="false">' +
		'						<field name="TEXT">Good Bye, World.</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
        '  </block>' +
        '</xml>';
    domTBGK = Blockly.Xml.textToDom(xmlContentTutBranchGenKnow);
    Blockly.Xml.domToWorkspace(domTBGK, workspaceTutBranchGenKnow);
	
	//Tutorial: Branching. Section: 1 Branch
    var workspaceTutBranchOne = Blockly.inject('blocklyDivBranchOne', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: false,
    });

    var xmlContentTutBranchOne = '<xml id="initiated" style="display: none">' +
		'	<block type="variables_set" deletable="false" movable="false">' +
		'		<field name="VAR">X</field>' +
		'		<value name="VALUE">' +
		'			<block type="math_number" deletable="false" movable="false">' +
		'				<field name="NUM">15</field>' +
		'			</block>' +
		'		</value>' +
		'	</block>' +
        '  <block type="controls_if" inline="false" deletable="false" x="0" y="50">' +
		'		<statement name="IF0">' +
		'			<block type="logic_compare" deletable="false">' +
		'				<field name="OP">LTE</field>' +
		'				<value name="A">' +
		'					<block type="variables_get">' +
		'						<field name="VAR">X</field>' +
		'					</block>' +
		'				</value>' +
		'				<value name="B">' +
		'					<block type="math_number">' +
		'						<field name="NUM">14</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
		'		<statement name="DO0">' +
		'			<block type="text_print" deletable="false" movable="false">' +
		'				<value name="TEXT">' +
		'					<block type="text" deletable="false" movable="false">' +
		'						<field name="TEXT">You did it! Congratulations!</field>' +
		'					</block>' +
		'				</value>' +
		'			</block>' +
		'		</statement>' +
        '  </block>' +
        '</xml>';
    domTBO = Blockly.Xml.textToDom(xmlContentTutBranchOne);
    Blockly.Xml.domToWorkspace(domTBO, workspaceTutBranchOne);
	
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
    
    // listen for the output of the code execution.
    var socket = io();
    
    socket.on('progOut', function (data) {
        // document.getElementById("output").innerHTML = data.output;

        // jQuery method of inputting data into an HTML element.
        $("#output").text(data.output);

        // String for comparison needs to have "\r\n" added to the end,
        // otherwise the whole thing won't work.
        if (data.output == "Good Morning, World!\r\n") {
            $("#announcement").text("You Did it Right, Great Job!");
        }
        else {
            $("#announcement").text("You made a slight mistake, recheck your code and Try Again.");
        }
    });
})();