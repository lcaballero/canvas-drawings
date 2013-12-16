var _ = require('lodash');

module.exports = function() {

    var args = _.flatten( Array.prototype.slice.call( arguments ) );

    var buffer = args || [];

    return {
        length:function() {
            return buffer.length;
        },
        shift:function() {
            return buffer.shift();
        },
        add:function(op) {
            buffer.push(op);
        }
    };
};