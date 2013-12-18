var vs           = require('./vector-stream/src'),
    Vec          = vs.Vec,
    SimpleSetup  = vs.SimpleSetup,
    _            = require('lodash'),
    _            = require('./vector-stream/src/lodash-mixins')(_);


require('./vector-stream/src/extensions');

module.exports = function() {

    var width = 450;
    var height = 300;
    var _2PI = Math.PI * 2;
    var steps = 34;
    var base_color = [150,0,0,1];
    var base_green_component = 140;
    var horizontal_size = Vec(50,0);
    var vertical_size = Vec(0,15);

    var vs = SimpleSetup({
        imageName:'vlade.png',
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
        var bs = _.range(.25, 1, .75 / steps );
//        var rs = [];
//
//        for (var i = 0; i < as.length; i++) {
//            var a = as[i];
//            var b = bs[i];
//            rs.push({ arc:a, opacity:b, scale:b });
//        }
        return _.zipMerge(as, bs, function(a,b) {
            return {arc:a, opacity:b, scale:b}
        });

        return rs;
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

    function clear(w,h) {
        return [
            {method:'fillStyle', value:'#ffffff'},
            {method:'fillRect', args:[0,0,w,h]}
        ];
    }

    vs.write(
        clear(width, height),
        toCanvasCenter(width, height),
        selectMany());
    vs.flush();

};