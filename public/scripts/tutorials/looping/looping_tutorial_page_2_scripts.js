$(document).ready(function () {
    // Listen for when the correct button is clicked.
    $("#multiChoiceC").click(function () {
		$("#resultOne").text("Correct!");
		$("#resultOne").css("background-color", "LimeGreen");
    });
	
    // Listen for when the other buttons are clicked.
    $("#multiChoiceA").click(function () {
		$("#resultOne").text("Incorrect, try again.");
		$("#resultOne").css("background-color", "Crimson");
    });
    $("#multiChoiceB").click(function () {
		$("#resultOne").text("Incorrect, try again.");
		$("#resultOne").css("background-color", "Crimson");
    });
    $("#multiChoiceD").click(function () {
		$("#resultOne").text("Incorrect, try again.");
		$("#resultOne").css("background-color", "Crimson");
    });
});