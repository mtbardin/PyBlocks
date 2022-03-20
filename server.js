"use strict";
const express = require("express");
//use the application off of express.
let app = express();

const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const baseDir = 'public';
app.use(express.static(baseDir));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Include and use cookie-parser.
const cookieParser = require('cookie-parser');
const { request } = require("https");
app.use(cookieParser());

// library for generating unique identifier.
const uuid = require("uuid")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Manually create a route for the blockly library in node_modules.
app.use('/scripts', express.static(__dirname + '/node_modules/blockly/'));

// Manually create a route for the assets.
app.use('/assets', express.static('assets'));

// define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname + "/views/home_page.html");

    // Create a date 10 years from now to make sure the cookie never expires.
    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 10);

    // Remove a cookie.
    //response.clearCookie(`name`);

    // Get the user's cookies.
    let cookie = request.cookies;
    console.log("cookie list: ", cookie);

    // If the user has never accessed the site before.
    if (cookie.hasVisited !== "true") {
        console.log("A new visitor has accessed the site. Generating Cookies.");

        // generate the data and set the cookies.
        let userId = uuid.v4();
        let lastVisit = new Date().toISOString().slice(0, 10);

        // create the cookies.
        response.cookie(`userId`, `${userId}`, {
            expires: expireDate,
            //secure: true,
            //httpOnly: true,
            sameSite: 'lax'
        });

        response.cookie(`hasVisited`, `true`, {
            expires: expireDate,
            //secure: true,
            //httpOnly: true,
            sameSite: 'lax'
        });

        response.cookie(`lastVisit`, `${lastVisit}`, {
            expires: expireDate,
            //secure: true,
            //httpOnly: true,
            sameSite: 'lax'
        });

        console.log(`Cookies have been created for ${userId}.`);
    }
    // If the user has accessed the site before.
    else {
        console.log(`${cookie.userId} has visited the site before. Updating Cookies...`);

        // Update the values.
        let lastVisit = new Date().toISOString().slice(0, 10);

        // Update the cookies.
        response.cookie(`lastVisit`, `${lastVisit}`, {
            expires: expireDate,
            //secure: true,
            //httpOnly: true,
            sameSite: 'lax'
        });

        console.log(`${cookie.userId}'s cookies are updated.`);
    }
});

// define the route for "/coding_page"
app.get("/coding_page.html", function (request, response) {
    let path = "/views/coding_page.html";
    redirector(request, response, path);
});

// define the route for "/base_tutorial"
app.get("/basics_tutorial", function (request, response) {
    let path = "/views/tutorials/basics_tutorial.html";
    redirector(request, response, path);
});

// Temporarily define the route for "/interactive_demo"
// accessed by the TBD section.
app.get("/interactive_tutorial", function (request, response) {
    let path = "/views/tutorials/interactive_tutorial.html";
    redirector(request, response, path);
});

// define the routes for the basics tutorials.
app.get("/tut_basics_1", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/basics/tut_basics_1.html");
});
app.get("/tut_basics_2", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/basics/tut_basics_2.html");
});
app.get("/tut_basics_3", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/basics/tut_basics_3.html");
});

// define the routes for the variables tutorials.
app.get("/tut_variables_1", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/variables/tut_variables_1.html");
});
app.get("/tut_variables_2", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/variables/tut_variables_2.html");
});
app.get("/tut_variables_3", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/variables/tut_variables_3.html");
});

// define the routes for the branching tutorials.
app.get("/tut_branching_page1", function (request, response) {
    let path = "/views/tutorials/branching/tut_branching_page1.html";
    redirector(request, response, path);
});
app.get("/tut_branching_page2", function (request, response) {
    let path = "/views/tutorials/branching/tut_branching_page2.html";
    redirector(request, response, path);
});
app.get("/tut_branching_page3", function (request, response) {
    let path = "/views/tutorials/branching/tut_branching_page3.html";
    redirector(request, response, path);
});
app.get("/tut_branching_page4", function (request, response) {
    let path = "/views/tutorials/branching/tut_branching_page4.html";
    redirector(request, response, path);
});
app.get("/tut_branching_page5", function (request, response) {
    let path = "/views/tutorials/branching/tut_branching_page5.html";
    redirector(request, response, path);
});

// define the routes for the looping tutorials.
app.get("/looping_tutorial_page_1", function (request, response) {
    let path = "/views/tutorials/looping/looping_tutorial_page_1.html";
    redirector(request, response, path);
});
app.get("/looping_tutorial_page_2", function (request, response) {
    let path = "/views/tutorials/looping/looping_tutorial_page_2.html";
    redirector(request, response, path);
});
app.get("/looping_tutorial_page_3", function (request, response) {
    let path = "/views/tutorials/looping/looping_tutorial_page_3.html";
    redirector(request, response, path);
});
app.get("/looping_tutorial_page_4", function (request, response) {
    let path = "/views/tutorials/looping/looping_tutorial_page_4.html";
    redirector(request, response, path);
});
app.get("/looping_tutorial_page_5", function (request, response) {
    let path = "/views/tutorials/looping/looping_tutorial_page_5.html";
    redirector(request, response, path);
});

// define the route for "/xml_craft"
app.get("/xml_craft", function (request, response) {
    let path = "/views/xml_craft.html";
    redirector(request, response, path);
});

// If the user has never visited the site before we want to make sure 
// to redirect them to the home page for the first time.
function redirector(req, res, pagePath) {
    // Get the user's cookies.
    let cookie = req.cookies;

    // If the user has accessed the site before.
    if (cookie.hasVisited === "true") {
        // Deliver the correct page.
        res.sendFile(__dirname + pagePath);
    }
    // If the user has never accessed the site before.
    else {
        // Redirect the user to the home page
        res.redirect("/");
    }
}

// Socket.IO code.
io.on('connection', function (socket) {
    socket.on('save', (fileName, code, callback) => {
        //console.log("In Server, Save");
        var code_path = "/code/" + fileName;
        console.log("saving:", code_path);
        
        fs.writeFileSync(path.join(baseDir, code_path), code);
        callback({
            status: "File Saved."
        });
    });

    socket.on('run', (fileName, callback) => {
        var exeCode = function (fileName) {
            const { spawn } = require("child_process");

            // run cmd command with node.js
            const codeDir = "public\\code\\";
            const runPy = spawn("python", [codeDir + "auto_comp.py", codeDir + fileName]);

            runPy.stdout.on("data", data => {
                console.log(`stdout: ${data}`);

                io.emit('progOut', { output: data.toString() });
            });

            runPy.stderr.on("data", data => {
                console.log(`stderr: ${data}`);
            });

            runPy.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });

            runPy.on("close", code => {
                console.log(`child process exited with code ${code}`);
            });
        };

        exeCode(fileName);

        callback({
            status: "File Executed."
        });
    });

    // Save Workspace Server Side Code.
    socket.on('saveWorkspace', (userId, fileName, code, callback) => {
        var codePath = "/user_workspaces/" + userId;
        //console.log(path.join(baseDir, codePath));

        if (!fs.existsSync(path.join(baseDir, codePath))) {
            fs.mkdir(path.join(baseDir, codePath), { recursive: true }, (err) => {
                if (err) throw err;
            });
        }  

        codePath += "/" + fileName + "/";
        console.log("Saving:", codePath);

        fs.writeFile(path.join(baseDir, codePath), code, function (err) {
            if (err) throw err;
        });

        callback({
            status: "Workspace Saved."
        });
    });

    // Load Workspace Server Side Code.
    socket.on('loadWorkspace', (filePath, callback) => {
        console.log("Loading:", filePath);

        fs.readFile(path.join(baseDir, filePath), function (err, data) {
            if (err) throw err;

            socket.emit('loadWorkspaceData', data.toString());
        });

        callback({
            status: "Workspace Loaded."
        });
    });

    // Delete a certain file off the server.
    // *dangerous*
    socket.on('deleteFile', (filePath, callback) => {
        console.log(`Deleting ${path.join(baseDir, filePath)}`);

        fs.unlink(path.join(baseDir, filePath), (err) => {
            if (err) {
                console.error(err)
                return
            }
            // File successfuly removed.
        });

        callback({
            status: "File Deleted"
        });
    });

    // Send items in a directory.
    socket.on('getSaveDir', (filePath, userId, callback) => {
        console.log(`Sending ${userId}'s Directory: `);

        let fileNames = getDir(filePath);
        socket.emit('deliverSaveDir', fileNames);

        callback({
            status: "Directory Sent."
        });
    });

    // Send items in a directory.
    socket.on('getLoadDir', (filePath, userId, callback) => {
        console.log(`Sending ${userId}'s Directory: `);

        let fileNames = getDir(filePath);
        socket.emit('deliverLoadDir', fileNames);

        callback({
            status: "Directory Sent."
        });
    });
});

function getDir(filePath) {
    try {
        // Check if the user has a folder on the server.
        if (!fs.existsSync(path.join(baseDir, filePath))) {
            // If they don't, then make one.
            fs.mkdirSync(path.join(baseDir, filePath), { recursive: true }, (err) => {
                if (err) throw err;
            });

            // Send the contents.
            return fs.readdirSync(path.join(baseDir, filePath));
        }
        else {
            // If they do just send the contents.
            return fs.readdirSync(path.join(baseDir, filePath));
        }
    } catch (err) {
        console.error('Error occured while getting directory: ', err);
    }
}

// Start the server at localhost and port 8000.
server.listen(8000, () => {
    console.log('listening on: 8000');
});