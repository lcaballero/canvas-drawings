var chai = require('chai'),
    _ = require('lodash'),
    VectorStream = require('../src/vector-stream')
    expect = chai.expect;


describe('a vector-stream', function() {

    it('should have default props', function() {
        var vs = new VectorStream();
        expect(vs.buffer).to.be.ok
    });

    it('should have 1 item after writing 1 item', function() {
        var vs = new VectorStream();
        vs.write(1);

        expect(vs.buffer.length()).equals(1);
    });

    it('should have 3 item after writing 3 item at once.', function() {
        var vs = new VectorStream();
        vs.write(1, 2, 3);

        expect(vs.buffer.length()).equals(3);
    });

    it('should, after flush, have 0 things buffered.', function() {
        var vs = new VectorStream();
        vs.write(1, 2, 3);
        vs.flush();

        expect(vs.buffer.length()).equals(0);
    });

    it('should, after buffering 3 things, then flushing, have 3 written items.', function() {
        var vs = new VectorStream();
        vs.write(1, 2, 3);
        vs.flush();

        expect(vs.written.length()).equals(3);
    });


})

