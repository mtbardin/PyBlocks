$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();
        let ans2 = $("#inputTwo").val();

        // Check to see if the answer is right.
        if ((ans1 == "30" || ans1 == "31") && ans2 == "Hello World!") {
			$("#resultOne").text("Correct!");
			$("#resultOne").css("background-color", "LimeGreen");
        }
        else {
			if(ans1 == "10"){
				$("#resultOne").text("Not quite, try rewording the statement. It needs to be 'Hello World!', without quotation marks.");
				$("#resultOne").css("background-color", "Crimson");
			}
			
			if(ans2 == "Hello World!"){
				$("#resultOne").text("Not quite, try a different number. It needs to be printed 15 times.");
				$("#resultOne").css("background-color", "Crimson");
			}
			
			if(ans1 != "10" && ans2 != "Hello World!"){
				$("#resultOne").text("Wrong on both counts, but I'm sure you'll get it next time!");
				$("#resultOne").css("background-color", "Crimson");
			}
        }
    });
});