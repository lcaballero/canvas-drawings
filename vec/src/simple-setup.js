var Harness = require('./harness'),
    VectorStream = require('./vector-stream'),
    Renderer = require('./renderer'),
    _ = require('lodash');


module.exports = function(options) {

    var h = new Harness(options);
    var r = new Renderer(h.getContext());
    var vs = new VectorStream(r);

    return vs;
};