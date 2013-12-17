


module.exports = function(_) {

    /**
     * Takes the data provided in parallel arrays and passes those
     * values to the provided callback until one of the arrays no
     * longer contains items to provide.
     *
     * zipMerge([data, ...], [callback]);
     */
    _.mixin({
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
    });

    return _;
};