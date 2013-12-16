var chai = require('chai'),
    buffer = require('../src/buffer'),
    expect = chai.expect;

describe('A new buffer', function() {

    it("object should be non-null.", function() {
        var buf = buffer();
        expect(buf).to.be.ok;
    });

    it("should have default props.", function() {
        var buf = buffer();
        expect(buf.length()).equals(0);
    });

    it("should be initialized when a data array is provided.", function() {
        var buf = buffer([1,2,3]);
        expect(buf.length()).equals(3);
    });

    it("should be initialized with var args are provided.", function() {
        var buf = buffer(1,2,3);
        expect(buf.length()).equals(3);
    });

});

