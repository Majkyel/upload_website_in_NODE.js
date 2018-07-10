var fs = require('fs');
var fse = require('fs-extra');
var formidable = require('formidable');

exports.upload = function (request, response) {
    console.log('Start handling the upload request.'.yellow);
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fse.copySync(files.upload.path, 'test.png');
        fs.readFile('templates/upload.html', function (err, html) {
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(html);
            response.end();
        });
    });
}

exports.welcome = function (request, response) {
    console.log('Start handling the welcome request.'.yellow);
    fs.readFile('templates/start.html', function (err, html) {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(html);
        response.end();
    });
}

exports.css = function(request, response) {
    console.log('Start handling css request');
    fs.readFile('templates/css/main.css', function(err, css) {
        response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
        response.write(css);
        response.end();
    });
}

exports.error = function (request, response) {
    console.log('ERROR!'.red);
    response.write('404!');
    response.end();
}

exports.show = function (request, response) {
    fs.readFile('test.png', 'binary', function (error, file) {
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.write(file, 'binary');
        response.end();
    });
}
