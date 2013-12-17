var chai = require('chai'),
    buffer = require('../src/buffer'),
    expect = chai.expect,
    _ = require('lodash'),
    _ = require('../src/lodash-mixins')(_);

describe('Lodash mixin', function() {

    describe('zipMerge', function() {

        it('should exist.', function() {
            expect(_.zipMerge).exists
        })

        it("should merge 2 arrays.", function() {
            var a = _.zipMerge([1,2], [3,4]);

            expect(a).to.have.length(2);
            expect(a[0]).to.include.members([1,3]);
            expect(a[1]).to.include.members([2,4]);
        });

        it("should merge 2 arrays with merge fn.", function() {
            var a = _.zipMerge([1,2], [3,4], function(a,b) {
                return { a:a, b:b };
            });

            expect(a).to.have.length(2);
            expect(a[0].a).equals(1);
            expect(a[0].b).equals(3);
            expect(a[1].a).equals(2);
            expect(a[1].b).equals(4);
        });
    });
});
