var chai = require('chai'),
    expect = chai.expect,
    Harness = require('../src/harness'),
    slice = Array.prototype.slice;

describe('A new Harness', function() {

    it("instantiated w/o options, should exist.", function() {
        var h = new Harness();
        expect(h).to.exist;
    });

    it("instantiate w/o options, should have options", function() {
        var h = new Harness();
        expect(h.options).to.exist;
        expect(h.options.width).to.be.above(0);
        expect(h.options.height).to.be.above(0);
        expect(h.options.imageName).to.exist;
        expect(h.options.imageFolder).to.exist;
    });

    it("should have a default filename", function() {
        var h = new Harness();
        expect(h.filename).to.include(Harness.DEFAULTS.imageName);
        expect(h.filename).to.include(Harness.DEFAULTS.imageFolder);
    });

    it("should have options set to default dimensions.", function() {
        var h = new Harness();
        expect(h.options.width).equals(Harness.DEFAULTS.width);
        expect(h.options.height).equals(Harness.DEFAULTS.height);
    });

    it("should DEFAULT values on the constructor.", function() {
        expect(Harness).to.exist;
    });
});