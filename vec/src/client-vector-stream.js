//**************************************************************************
;(function($, undefined) {

    /**
     *
     */
    function toContext( item ) {

        if ( item.constructor == String ) {
            this.context[ item ].apply( this.context, [] );
            return this;
        }

        if ( !!item.method && !!item.args ) {
            this.context[ item.method ].apply(
                this.context, item.args || [] );
            return this;
        }

        if ( !!item.method && !!item.value ) {
            this.context[ item.method ] = item.value;
            return this;
        }

        return this;
    };

    ////////////////////////////////////////////////////////////////////////
    function block( block_name ) {
        return this.blocks[ block_name ] =
            this.blocks[ block_name ] || [];
    };

    ////////////////////////////////////////////////////////////////////////
    function flushBlock( geom ) {
        for (var i = 0; i < geom.length; i++) {
            this.toContext( geom[i] );
        }
    };

    /**
     * This function writes all of the stored commands in the buffer and
     * sends them to the context.
     */
    function flush() {

        var buf = this.buffer;

        while ( !!buf.length ) {

            var item = buf.shift();

            // Save the name of the block, and push geometry into
            // the block array until the end of the block.
            if (item.method == "beginBlock") {

                this.block_name = item.method;

                // Clear the block name and flush the geometry to the context.
            } else if (item.method == "endBlock") {

                this.block_name = null;
                this.flushBlock( this.block( this.block_name ) );
            }

            // Until end block, but while until then collect block geometry
            if (!!this.block_name) {

                this.block( this.block_name ).push( item );

                // Write out normal non-block geometry to the context.
            } else {

                this.toContext( item );
                this.written.push( item );
            }
        }

        return this;
    };

    ////////////////////////////////////////////////////////////////////////
    function write( op ) {

        var vals = Array.prototype.slice.call( arguments );
        var args = [];

        for (var i = 0; i < vals.length; i++) {
            var item = vals[i];
            item = !!item && item.constructor == Function
                ? item( this )
                : item;

            if ( !!item ) {
                args = args.concat( item );
            }
        }

        this.buffer = this.buffer.concat( args );

        return this;
    };

    ////////////////////////////////////////////////////////////////////////
    function init( canvas ) {

        this.canvas = canvas;
        this.context = canvas[0].getContext("2d");

        this.buffer = [];
        this.written = [];
        this.blocks = {};
        this.block_name = null;

        return this;
    };

    ////////////////////////////////////////////////////////////////////////
    function Stream() { };

    Stream.prototype = {
        toContext:toContext,
        flush:flush,
        write:write,
        block:block
    };
    Stream.prototype.constructor = Stream;

    ////////////////////////////////////////////////////////////////////////
    $.fn.stream = function() {
        var key = "Vector.Stream";
        var s = this.data( key );

        if (!s) {
            s = new Stream();
            init.apply( s, [ this ] );
            this.data( key, s );
        }

        return s;
    };

    $.fn.stream.fn = Stream.prototype;

})(jQuery);


//**************************************************************************
;(function($, undefined) {

    $.fn.stream.fn.toCanvasCenter = function() {
        return this.write(
            function(sw) {
                var center = sw.canvas.toCenter();
                return { method:"translate", args:[center.x, center.y] };
            });
    };

})(jQuery);