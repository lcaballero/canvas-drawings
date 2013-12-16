var vs = require('./vector-stream/src'),
    Harness = vs.Harness,
    Renderer = vs.Renderer,
    VectorStream = vs.VectorStream;


module.exports = function() {

    var harness = new Harness({
        imageName:'drawing-3.png',
        width:600,
        height:400
    });

    var r = new Renderer(harness.getContext());
    var vs = new VectorStream(r);

    vs.write([
        "beginPath",
            {method:"strokeStyle", value:"#000fff"},
            {method:"moveTo", args:[0,0]},
            {method:"lineTo", args:[100,100]},
            {method:"lineTo", args:[0, 200]},
            {method:"lineTo", args:[200, 150]},
            {method:"lineTo", args:[200, 0]},
            {method:'lineTo', args:[50,30]},
            {method:'lineTo', args:[75,100]},
            {method:'lineTo', args:[75,120]},
            {method:'lineTo', args:[600,400]},
        "stroke",

        {method:'strokeStyle', value:'#00ffff'},
        'beginPath',
            {method:'moveTo', args:[0,0]},
            {method:'lineTo', args:[75,120]},
        'stroke',

        'beginPath',
            {method:'moveTo', args:[600,0]},
            {method:'lineTo', args:[0, 400]},
            {method:'lineTo', args:[100,125]},
            {method:'lineTo', args:[110,130]},
        'stroke'
    ]);
    vs.flush();

};
