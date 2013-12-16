var Canvas  = require('canvas'),
    fs      = require('fs'),
    path    = require('path'),
    _       = require('lodash');


module.exports = (function(){

    var Harness = function(opts) {
        this.options = _.defaults(opts || {}, {}, Harness.DEFAULTS);
        this.canvas = new Canvas(this.options.width, this.options.height);
        this.filename = path.join(
            process.cwd(),
            this.options.imageFolder,
            this.options.imageName);

        this.openStream(fs.createWriteStream(this.filename));
    };

    Harness.DEFAULTS = {
        width:200,
        height:200,
        imageFolder:'images',
        imageName:'out.png'
    };

    Harness.prototype = {
        openStream:function(out) {
            var filename = this.filename;
            this.out = out;
            var stream = this.stream = this.canvas.pngStream();
            this.stream.on('data', function(chunk) { out.write(chunk); });
            this.stream.on('end', function() {
                console.log("finished writing file:", filename);
                console.log("closing out");
                out.end();
            });
            this.stream.on('finish', function() {
                console.log("finished all writes.");
            });
            this.stream.on('error', function(err) {
                console.log('error:', err);
            })
        },
        getContext:function() {
            return this.context = this.context || this.canvas.getContext('2d');
        }
    };

    return Harness;

})();