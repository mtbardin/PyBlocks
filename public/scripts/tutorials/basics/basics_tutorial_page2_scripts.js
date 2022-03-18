$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();

        // Check to see if the answer is right.
        if (ans1 == "Hello World!") {
			$("#resultOne").text("Correct!");
			$("#resultOne").css("background-color", "LimeGreen");
        }
        else {
			$("#resultOne").text("Not quite, remember: Hello World!");
			$("#resultOne").css("background-color", "Crimson");
        }
    });
});