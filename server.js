"use strict";
const express = require("express");

const path = require('path');
const fs = require('fs');

const baseDir = 'public';

//use the application off of express.
let app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//define the route for "/"
 app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname+"/views/home_page.html");
 });

//define the route for "/coding_page"
app.get("/coding_page.html", function (request, response) {
    //show this file when the "/" is requested
    response.sendFile(__dirname + "/views/coding_page.html");
});

//define the route for "/base tutorial"
app.get("/1", function (request, response) {
    //show this file when the "/" is requested
    response.sendFile(__dirname + "/views/tutorials/tut_branching.html");
});

app.put('*', function (req, res) {
    let str = req.path;
    const flag = str.split("%20");
    console.log(flag);

    if (flag[0] == "/save") {
        var code_path = "/code/" + flag[1];
        console.log("saving:", code_path);
        let body = '';
        req.on('data', function (data) { body += data; });
        req.on('end', function () {
            fs.writeFileSync(path.join(baseDir, code_path), body);
            res.send('saved');
        });
    }
    if (flag[0] == "/run") {
        console.log("running");

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

        exeCode(flag[1]);
    }
});

app.use(express.static(baseDir));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(8000, () => {
    console.log('listening on: 8000');
});