$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();
        let ans2 = $("#inputTwo").val();

        // Check to see if the answer is right.
        if (ans1 == "Head" || ans1 == "head") {
			if (ans2 == "Body" || ans2 == "body"){
				$("#resultOne").text("Correct!");
				$("#resultOne").css("background-color", "LimeGreen");
				
			}
			else {
				$("#resultOne").text("Incorrect, try again.");
				$("#resultOne").css("background-color", "Crimson");
			}
        }
        else {
            $("#resultOne").text("Incorrect, try again.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });
});