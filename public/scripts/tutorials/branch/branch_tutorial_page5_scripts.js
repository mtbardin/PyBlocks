$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val();
        let ans2 = $("#inputTwo").val();
        let ans3 = $("#inputThr").val();

        // Check to see if the answer is right.
		if (ans1 == "15") {
			if (ans2 != ans1){
					if (ans3 == ans2){
						$("#resultOne").text("Correct!");
						$("#resultOne").css("background-color", "LimeGreen");
					}
					else{
						$("#resultOne").text("Incorrect, check your second print statement.");
						$("#resultOne").css("background-color", "Crimson");
						
					}
			}
			else{
				$("#resultOne").text("Incorrect, you have to change the value of x, not leave it the same.");
				$("#resultOne").css("background-color", "Crimson");
			}
        }
        else {
            $("#resultOne").text("Incorrect, try checking the initial value of x. It's given above the 'if'.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });
});