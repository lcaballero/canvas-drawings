var vs           = require('./vector-stream/src'),
    Vec          = vs.Vec,
    SimpleSetup  = vs.SimpleSetup,
    _            = require('lodash'),
    _            = require('./vector-stream/src/lodash-mixins')(_),
    nject        = require('nject');


require('./vector-stream/src/extensions');

var opts = {
    width                   : 450,
    height                  : 300,
    _2PI                    : Math.PI * 2,
    steps                   : 34,
    base_color              : [150,0,0,1],
    base_green_component    : 140,
    horizontal_size         : Vec(50,0),
    vertical_size           : Vec(0,15)
};

function dwg(
    width, height, _2PI, steps, base_color, base_green_component,
    horizontal_size, vertical_size) {

    console.log(
        'during import resolution',
        width, height, _2PI, steps, base_color, base_green_component,
        horizontal_size, vertical_size);

    return function() {
        console.log(
            'during execution',
            width, height, _2PI, steps, base_color, base_green_component,
            horizontal_size, vertical_size);

        var vs = SimpleSetup({
            imageName:'vlade-2.png',
            width: width,
            height: height
        });

        function toCanvasCenter(w, h) {
            return [
                {method:'translate', args:[w/2, h/2]},
                {method:'scale', args:[1,-1]}
            ]
        };

        function fn( e, i, color, h, v ) {
            return [
                'save',
                {method:'rotate', args:[e.arc]},
                {method:'translate', args:[90, 0]},
                {method:'strokeStyle', value:color},
                {method:'fillStyle', value:color},
                'beginPath',
                {method:'moveTo', args:[0, v.y]},
                {method:'lineTo', args:[h.x, 0]},
                {method:'lineTo', args:[0, -v.y]},
                {method:'lineTo', args:[-h.x, 0]},
                {method:'lineTo', args:[0, v.y]},
                'fill',
                'restore'
            ];
        };

        function zipping() {
            var as = _.range( 0, _2PI, _2PI / steps );
            var bs = _.range( .25, 1, .75 / steps );
            return _.zipMerge(as, bs, function(a,b) {
                return {arc:a, opacity:b, scale:b}
            });
        };

        function f(e,i) {
            return fn(
                e,
                i,
                base_color
                    .alpha(e.opacity)
                    .green( base_green_component + (i*2) )
                    .toColor(),
                horizontal_size.scale(e.scale, e.scale),
                vertical_size.scale(e.scale, e.scale));
        };

        function selectMany() {
            var z = zipping();
            var r = [];

            for (var i = 0; i < z.length; i++) {
                var e = z[i];
                var a = f(e,i);

                for (var j = 0; j < a.length; j++) {
                    var k = a[j];
                    r.push(k);
                }
            }

            return r;
        };

        function clear(w,h,color) {
            color = color || '#ffffff';
            return [
                {method:'fillStyle', value:color},
                {method:'fillRect', args:[0,0,w,h]}
            ];
        }

        vs.write(
                clear(width, height),
                toCanvasCenter(width, height),
                selectMany())
            .flush();

    };
};

module.exports = _.resolve(opts, dwg);

console.log('end dwg imports');