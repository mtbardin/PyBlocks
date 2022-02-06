$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans = $("#inputOne").val();

        // Check to see if the answer is right.
        if (ans == "6") {
            $("#resultOne").text("Correct!");
            $("#resultOne").css("background-color", "LimeGreen");

            // Replace the submit button with a golden star?
        }
        else {
            $("#resultOne").text("Incorrect, try again.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });


	//Tutorial: Branching. Section: Two Branches
    var workspaceTut = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: true,
    });

    var xmlContentTut = '<xml id="initiated" style="display: none">' +
	'	<block type="move_left" id="left1" deletable="false" movable="false">'+
	'		<next>'+
	'		  <block type="move_down" id="down1" deletable="false" movable="false">'+
	'			<next>'+
	'			  <block type="move_down" id="down2" deletable="false" movable="false">'+
	'				<next>'+
	'				  <block type="rotate_left" id="rotLeft1" deletable="false" movable="false">'+
	'					<next>'+
	'					  <block type="controls_if" id="flow1Check">'+
	'						<next>'+
	'						  <block type="move_down" id="down3" deletable="false" movable="false">'+
	'							<next>'+
	'							  <block type="controls_if" id="flow2Check">'+
	'								<next>'+
	'								  <block type="move_right" id="right1" deletable="false" movable="false">'+
	'									<next>'+
	'									  <block type="move_right" id="right2" deletable="false" movable="false">'+
	'										<next>'+
	'										  <block type="move_right" id="right3" deletable="false" movable="false">'+
	'											<next>'+
	'											  <block type="move_right" id="right4" deletable="false" movable="false">'+
	'												<next>'+
	'												  <block type="rotate_left" id="rotLeft2" deletable="false" movable="false">'+
	'													<next>'+
	'													  <block type="controls_if" id="flow3Check">'+
	'														<next>'+
	'														  <block type="move_right" id="right5" deletable="false" movable="false">'+
	'															<next>'+
	'															  <block type="move_up" id="up1" deletable="false" movable="false">'+
	'																<next>'+
	'																  <block type="move_up" id="up2" deletable="false" movable="false">'+
	'																	<next>'+
	'																	  <block type="controls_if" id="flow4check">'+
	'																	  </block>'+
	'																	</next>'+
	'																  </block>'+
	'																</next>'+
	'															  </block>'+
	'															</next>'+
	'														  </block>'+
	'														</next>'+
	'													  </block>'+
	'													</next>'+
	'												  </block>'+
	'												</next>'+
	'											  </block>'+
	'											</next>'+
	'										  </block>'+
	'										</next>'+
	'									  </block>'+
	'									</next>'+
	'								  </block>'+
	'								</next>'+
	'							  </block>'+
	'							</next>'+
	'						  </block>'+
	'						</next>'+
	'					  </block>'+
	'					</next>'+
	'				  </block>'+
	'				</next>'+
	'			  </block>'+
	'			</next>'+
	'		  </block>'+
	'		</next>'+
	'	  </block>'+
        '</xml>';
    domTBGK = Blockly.Xml.textToDom(xmlContentTut);
    Blockly.Xml.domToWorkspace(domTBGK, workspaceTut);
});