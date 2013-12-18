var Buffer   = require('./buffer'),
    _        = require('lodash');


module.exports = (function() {

    var EMPTY_RENDERER = {
        render: _.identity
    };

    var VectorStream = function(renderer, config) {
        this.buffer = Buffer();
        this.written = Buffer();
        this.renderer = renderer || EMPTY_RENDERER;
        this.config = config || {};
    };

    VectorStream.prototype = {
        flush:function() {
            for (var i = 0, n = this.buffer.length(); i < n; i++) {
                var item = this.buffer.shift();
                item = this.renderer.render(item);
                this.written.add( item );
            }
        },
        write:function() {
            var args = Array.prototype.slice.call( arguments );
            args = _.flatten(args);

            for (var i = 0, n = args.length; i < n; i++) {
                var item = args[i];
                if (!item) { continue; }
                item = !!item && _.isFunction( item )
                    ? item(this)
                    : item;

                if ( !!item ) {
                    this.buffer.add( item  );
                }
            }

            return this;
        }
    };

    return VectorStream;
})();