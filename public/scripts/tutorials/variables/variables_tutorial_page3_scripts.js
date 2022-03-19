$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();

        // Check to see if the answer is right.
        if (ans1 == "Entry 3") {
			$("#resultOne").text("Correct!");
			$("#resultOne").css("background-color", "LimeGreen");
        }
        else {
			$("#resultOne").text("Not quite, check the entry number or your typing.");
			$("#resultOne").css("background-color", "Crimson");
        }
    });
});