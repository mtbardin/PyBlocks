(function () {
    // listen for the output of the code execution.
    let socket = io();

    // make qS a shortcut for document.querySelector
    const qS = document.querySelector.bind(document);

    // when the user clicks 'login'
    qS("#login").addEventListener('click', function () {
        let user = $("#Username").val();
        let pass = $("#Password").val();

        socket.emit('login', user, pass,
            (response) => {
                console.log(response.status);
            }
        );
    });

    // when the user clicks 'register'
    qS("#register").addEventListener('click', function () {
        let username = $("#Username").val();
        let password = $("#Password").val();

        // Use the md5 hash on the password.
        let hashedPassword = CryptoJS.MD5(password);

        console.log(hashedPassword);

        let firstName = "fName";
        let lastName = "lName";

        socket.emit('register', firstName, lastName, username, hashedPassword,
            (response) => {
                console.log(response.status);
            }
        );
    });

    socket.on('progOut', function (data) {
        // document.getElementById("output").innerHTML = data.output;

        // jQuery method of inputting data into an HTML element.
        $("#output").text(data.output);
    });
})();