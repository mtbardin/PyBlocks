$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();

        // Check to see if the answer is right.
		if (ans1 == "most" || ans1 == "Most") {
			$("#resultOne").text("Correct!");
			$("#resultOne").css("background-color", "LimeGreen");
        }
        else {
            $("#resultOne").text("Incorrect, try again.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });
});