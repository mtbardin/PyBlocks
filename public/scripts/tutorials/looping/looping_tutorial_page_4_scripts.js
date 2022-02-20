$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();

        // Check to see if the answer is right.
        if (ans1 == "Interesting" || ans1 == "interesting"|| ans1 == "Complicated"|| ans1 == "complicated") {
			$("#resultOne").text("Correct!");
			$("#resultOne").css("background-color", "LimeGreen");
        }
        else {
            $("#resultOne").text("Incorrect, try again.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });
});