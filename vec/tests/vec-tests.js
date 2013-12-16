var chai = require('chai'),
    Vec = require('../src/').Vec,
    expect = chai.expect;

describe('A new Vec', function() {

    it("should have the components.", function() {
        var a = Vec(1,2);
        expect(a.x).equals(1);
        expect(a.y).equals(2);
    });

    it('should add vectors.', function() {
        var a = Vec(2,1);
        var b = Vec(3,4);

        var c = a.add(b);

        expect(c.x).equals(5);
        expect(c.y).equals(5);
    });

    it('should vectors via translateX.', function() {
        var a = Vec();
        var b = a.translateX(1);

        expect(b.x).equals(1);
        expect(b.y).equals(0);
    });

    it('should vectors via translateY.', function() {
        var a = Vec();
        var b = a.translateY(1);

        expect(b.x).equals(0);
        expect(b.y).equals(1);
    });

    it('should scale vectors.', function() {
        var a = Vec(2,2);
        var b = a.scale(.5);

        expect(b.x).equals(1);
        expect(b.y).equals(2);
    });

    it('should scaleX vectors.', function() {
        var a = Vec(2,2);
        var b = a.scaleX(.5);

        expect(b.x).equals(1);
        expect(b.y).equals(2);
    });

    it('should scaleY vectors.', function() {
        var a = Vec(2,2);
        var b = a.scaleY(.5);

        expect(b.x).equals(2);
        expect(b.y).equals(1);
    });

    it('should recognize a zero vector.', function() {
        expect(Vec().isNull()).to.be.true
    });

    it('should have a property for isVec.', function() {
        expect(Vec().isVec).to.be.true
    });

    it('should show that a null vector has no direction.', function() {
        var a = Vec();

        expect(a.isNull()).to.be.true;
        expect(a.isRightward()).to.be.false;
        expect(a.isLeftward()).to.be.false;
        expect(a.isUpward()).to.be.false;
        expect(a.isDownward()).to.be.false;
        expect(a.isVertical()).to.be.false;
        expect(a.isHorizontal()).to.be.false;
    });


});
