var Harness = require('./harness'),
    VectorStream = require('./vector-stream'),
    Renderer = require('./renderer'),
    _ = require('lodash');


module.exports = function(config) {

    var h = new Harness(config);
    var r = new Renderer(h.getContext());
    var vs = new VectorStream(r, config);

    return vs;
};