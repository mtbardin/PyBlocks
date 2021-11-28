"use strict";
const express = require("express");
//use the application off of express.
let app = express();

const path = require('path');
const fs = require('fs');

const baseDir = 'public';
app.use(express.static(baseDir));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
    response.sendFile(__dirname+"/views/home_page.html");
 });

// define the route for "/coding_page"
app.get("/coding_page.html", function (request, response) {
    response.sendFile(__dirname + "/views/coding_page.html");
});

// define the route for "/base_tutorial"
app.get("/basics_tutorial", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/basics_tutorial.html");
});

// Temporarily define the route for "/interactive_demo"
// accessed by the TBD section.
app.get("/interactive_tutorial", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/interactive_tutorial.html");
});

// define the route for "/Branching"
app.get("/Branching", function (request, response) {
    response.sendFile(__dirname + "/views/tutorials/tut_branching.html");
});

// define the route for "/xml_craft"
app.get("/xml_craft", function (request, response) {
    response.sendFile(__dirname + "/views/xml_craft.html");
});

// Socket.IO code.
io.on('connection', function (socket) {
    //console.log("connected");

    socket.on('save', (fileName, code, callback) => {
        //console.log("In Server, Save");
        var code_path = "/code/" + fileName;
        console.log("saving:", code_path);

        //let body = '';
        //body += code;
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
    socket.on('saveWorkspace', (userID, fileName, code, callback) => {
        var codePath = "/user_workspaces/" + userID;
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

});

// Start the server at localhost and port 8000.
server.listen(8000, () => {
    console.log('listening on: 8000');
});