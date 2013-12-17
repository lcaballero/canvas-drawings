var chai   = require('chai'),
    expect = chai.expect,
    _      = require('lodash');
require('../src/extensions');


describe('With the extensions function', function() {

    it("alpha is found.", function() {
        expect(_.range(1,5).alpha(9)).to.include.members([9]);
    });

    it("red is set.", function() {
        expect(_.range(1,5).red(9)).to.include.members([9]);
    });

    it("green is set.", function() {
        expect(_.range(1,5).green(9)).to.include.members([9]);
    });

    it("blue is set.", function() {
        expect(_.range(1,5).blue(9)).to.include.members([9]);
    });

    it("red is found.", function() {
        expect(_.range(1,5).red()).equals(1);
    });

    it("green is found.", function() {
        expect(_.range(1,5).green()).equals(2);
    });

    it("blue is found.", function() {
        expect(_.range(1,5).blue()).equals(3);
    });

    it("alpha is found.", function() {
        expect(_.range(1,5).alpha()).equals(4);
    });

    it("converts hex w/o alpha and finds red.", function() {
        expect('#112233'.toColorArray().red()).equals(parseInt('11',16));
    });

    it("converts hex w/ alpha and finds red.", function() {
        expect('#11223344'.toColorArray().red()).equals(parseInt('11',16));
    });

    it("converts hex w/o alpha and finds green.", function() {
        expect('#112233'.toColorArray().green()).equals(parseInt('22',16));
    });

    it("converts hex w/ alpha and finds green.", function() {
        expect('#11223344'.toColorArray().green()).equals(parseInt('22',16));
    });

    it("converts hex w/o alpha and finds blue.", function() {
        expect('#112233'.toColorArray().blue()).equals(parseInt('33',16));
    });

    it("converts hex w/ alpha and finds blue.", function() {
        expect('#11223344'.toColorArray().blue()).equals(parseInt('33',16));
    });

    it("converts hex w/o alpha and finds alpha.", function() {
        expect('#112233'.toColorArray().alpha()).equals(0);
    });

    it("converts hex w/ alpha and finds alpha.", function() {
        expect('#11223344'.toColorArray().alpha()).equals(parseInt('44',16));
    });

    it("converts array.length 3 to rgb().", function() {
        expect([0,0,0].toColor()).equals('rgb(0,0,0)');
    });

    it("converts array.length 3 to rgb().", function() {
        expect([0,0,0,0].toColor()).equals('rgba(0,0,0,0)');
    });

});
