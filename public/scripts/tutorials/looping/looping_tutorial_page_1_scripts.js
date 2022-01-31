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

    // Listen for when the submit button for Try It two is clicked.
    $("#submitButtonTwo").click(function () {
        // Get the info the user has submitted.
        let ans = $("#inputTwo").val();

        // Check to see if the answer is right.
        if (ans == "6") {
            $("#resultTwo").text("Correct!");
            $("#resultTwo").css("background-color", "LimeGreen");
        }
        else {
            $("#resultTwo").text("Incorrect, try again.");
            $("#resultTwo").css("background-color", "Crimson");
        }
    });
});