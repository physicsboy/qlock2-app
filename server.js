const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/angular-heroku-template'));
// Start the app by listening on the default

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/angular-heroku-template/index.html'));
});

// Heroku port
app.listen(process.env.PORT || 8080);