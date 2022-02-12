"use strict";

$(window).load(function () {
    // Get the current time when loading the page.
    let startDate = new Date();
    let elapsedTime = 0;

    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").on("click.eval", function () {
        // Get the time when the button was clicked.
        let endDate = new Date();

        // Find out how long its been since the page was loaded and add it to the total time on page.
        let spentTime = endDate.getTime() - startDate.getTime();
        elapsedTime += spentTime;

        // Use the calculated time.
        // Planned to add it to a database.
        alert("It took " + parseMilliseconds(elapsedTime) + " to submit an answer to the first question.");

        // Remove the timer for this button.
        $("#submitButtonOne").off("click.eval");
    });

    // Listen for when the submit button for Try It two is clicked.
    $("#submitButtonTwo").click(function () {
        // Get the time when the button was clicked.
        let endDate = new Date();

        // Find out how long its been since the page was loaded and add it to the total time on page.
        let spentTime = endDate.getTime() - startDate.getTime();
        elapsedTime += spentTime;

        // Use the calculated time.
        // Planned to add it to a database.
        alert("It took " + parseMilliseconds(elapsedTime) + " to submit an answer to the first question.");

        // Remove the timer for this button.
        $("#submitButtonOne").off("click.eval");
    });
});

// Helper function to change the passed time from milliseconds to a human readable format.
function parseMilliseconds(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / 1000 / 60) % 60);
    let hours = Math.floor((ms / 1000 / 60 / 60) % 60);

    let builtStr = [
        ("00" + hours).slice(-2),
        ("00" + minutes).slice(-2),
        ("00" + seconds).slice(-2)
    ].join(':');

    return builtStr;
}
