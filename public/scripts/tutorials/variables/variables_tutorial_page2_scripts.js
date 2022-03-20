$(document).ready(function () {
    // Listen for when the correct button is clicked.
    $("#multiChoiceA").click(function () {
		$("#resultOne").text("Correct!");
		$("#resultOne").css("background-color", "LimeGreen");
    });
	
    // Listen for when the other buttons are clicked.
    $("#multiChoiceB").click(function () {
		$("#resultOne").text("Incorrect, try reading the 'running' section closer.");
		$("#resultOne").css("background-color", "Crimson");
    });
    $("#multiChoiceC").click(function () {
		$("#resultOne").text("Incorrect, try reading the 'running' section closer.");
		$("#resultOne").css("background-color", "Crimson");
    });
    $("#multiChoiceD").click(function () {
		$("#resultOne").text("Incorrect, try reading the 'running' section closer.");
		$("#resultOne").css("background-color", "Crimson");
    });
});