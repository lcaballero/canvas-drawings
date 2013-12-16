var _            = require('lodash'),
    buffer       = require('./buffer');


module.exports = (function() {

    var Renderer = function(ctx) {
        this._context = ctx || {};
        this._unhandled = []
    };

    Renderer.prototype = {
        render:function(item) {

            if (_.isString(item) && !!this._context[item]) {
                this._context[item]();
                return this;
            }

            if (!!item.method && !!item.args && !!this._context[item.method]) {
                this._context[item.method].apply(this._context, item.args);
                return this;
            }

            if ( !!item.method && !!item.value ) {
                this._context[ item.method ] = item.value;
                return this;
            }

            this.unhandled().push(item);

            return this;
        },
        unhandled:function() {
            return this._unhandled;
        }
    };

    return Renderer;

})();