var fs       = require('fs'),
    path     = require('path'),
    exec     = require('child_process').exec;


var dir = path.join(process.cwd(), 'drawings');

console.log('watching code for drawings:', dir);

fs.watch(dir, function(event, filename) {

    console.log('event is:', event);
    console.log('filename:', !!filename);

    if (!!filename) {
        if (/.js$/.test(filename)) {
            var name = filename.replace(/\.js$/, "");
            exec('node ' + path.join(__dirname, 'main.js') + " " + name,
                function(err, stdout, stderr) {
                    console.log('stdout:', stdout);
                    console.log('stderr:', stderr);
                    if (!err) {
                        console.log('exec err:', err);
                    }
                })
            console.log("wanting to render:", filename);
        }
        console.log('filename provided: ' + filename);
    } else {
        console.log('filename not provided');
    }
});