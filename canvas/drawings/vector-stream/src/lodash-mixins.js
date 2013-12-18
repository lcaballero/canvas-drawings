var nject = require('nject');


module.exports = function(_) {

    _.mixin({
        /**
         * Takes the data provided in parallel arrays and passes those
         * values to the provided callback until one of the arrays no
         * longer contains items to provide.
         *
         * zipMerge([data, ...], [callback]);
         */
        zipMerge: function() {
            var args = Array.prototype.slice.call(arguments);
            var arrays = _.filter(args, _.isArray);
            var min= _.min(_.map(arrays, function(a) { return a.length; }));
            var merger = args[args.length - 1];

            if (_.isFunction(merger)) {
                var rs = [];
                for (var i = 0; i < min; i++) {
                    var vals = _.map(arrays, function(ar) { return ar[i]});
                    var item = merger.apply(null, vals)
                    rs.push(item);
                }
                return rs;
            } else {
                var rs = [];
                for (var i = 0; i < min; i++) {
                    var vals = _.map(arrays, function(ar) { return ar[i]});
                    rs.push(vals);
                }
                return rs;
            }
        }

        /**
         * Creates constants from the options provided and injects them
         * into the given function.
         * @param opts
         */
        , resolve: function(opts, fn) {
            var tree = new nject.Tree();
            for (var p in opts) {
                tree.constant(p, opts[p]);
            }
            console.log('registering fn');
            tree.register('fn', fn);

            console.log('resolving fn')
            tree.resolve(function(err, resolved) {
                if (!!err) {
                    console.log(err, resolved);
                } else {
                    console.log(resolved)
                    fn = resolved.fn
                }
            });
            return fn();
        }
    });

    return _;
};