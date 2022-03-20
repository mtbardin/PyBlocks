$(document).ready(function () {
    // Listen for when the submit button for Try It one is clicked.
    $("#submitButtonOne").click(function () {
        // Get the info the user has submitted.
        let ans1 = $("#inputOne").val(); // Should be friend
        let ans2 = $("#inputTwo").val(); // Should be 00
        let ans3 = $("#inputThr").val(); // Should be Howdy!
        let ans4 = $("#inputFour").val();// Should be Good Morning!
        let ans5 = $("#inputFive").val();// Should be Good Afternoon.

        // Check to see if the answer is right.
        if (ans1 == "friend" || ans1 == "Friend") {
			if(ans2 == "00"){
				if(ans3 == "Howdy!"){
					if(ans4 == "Good Morning!"){
						if(ans5 == "Good Afternoon."){
							$("#resultOne").text("Correct!");
							$("#resultOne").css("background-color", "LimeGreen");
						}
						else{
							$("#resultOne").text("Incorrect, try again. Check punctuation, especially in the 'else' block.");
							$("#resultOne").css("background-color", "Crimson");
						}
					}
					else{
						$("#resultOne").text("Incorrect, try again. Make sure your punctuation is right. Or just copy and paste.");
						$("#resultOne").css("background-color", "Crimson");
					}
				}
				else{
					$("#resultOne").text("Incorrect, try again. Cowboys used to say this, which is why I do.");
					$("#resultOne").css("background-color", "Crimson");
				}
			}
			else{
				$("#resultOne").text("Incorrect, try again. Noon is simplified to 12:XX on digital calculators. What is X?");
				$("#resultOne").css("background-color", "Crimson");
			}
        }
        else {
            $("#resultOne").text("Incorrect, try again. Pay close attention to the first 'if' block comparison.");
            $("#resultOne").css("background-color", "Crimson");
        }
    });
});