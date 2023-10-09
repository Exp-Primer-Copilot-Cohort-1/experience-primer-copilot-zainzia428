// Create web server
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var fs = require('fs');

// Start server
server.listen(3000, () => {
    console.log('Server listening at port %d', 3000);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow these headers
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these methods
    next();
});

// Read comments file
var comments = [];
fs.readFile('comments.json', (err, data) => {
    if (err) throw err;
    comments = JSON.parse(data);
});

// GET: /comments
app.get('/comments', (req, res) => {
    res.status(200).send(comments);
});

// POST: /comments
app.post('/comments', (req, res) => {
    // Get data from request body
    var comment = req.body;

    // Add data to comments array
    comments.push(comment);

    // Write comments array to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    // Respond with status 201
    res.status(201).send(comment);
});

// PUT: /comments
app.put('/comments/:id', (req, res) => {
    // Get id from request
    var id = req.params.id;

    // Get data from request body
    var comment = req.body;

    // Update comment with given id
    comments[id] = comment;

    // Write comments array to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    // Respond with status 200
    res.status(200).send(comment);
});

// DELETE: /comments
app.delete('/comments/:id', (req, res) => {
    // Get id from request
    var id = req.params.id;

    // Remove comment with given id
    comments.splice(id, 1);

    // Write comments array to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    // Respond with status 200
    res.status(200).send(comments);
});