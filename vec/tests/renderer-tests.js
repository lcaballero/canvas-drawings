var chai = require('chai'),
    VectorStream = require('../src/vector-stream'),
    Renderer = require('../src/renderer'),
    expect = chai.expect,
    slice = Array.prototype.slice;

describe('A new renderer', function() {

    it("should initialize by default.", function() {
        var r = new Renderer();
        expect(r).to.be.ok;
        expect(r._context).to.exist;
        expect(r._unhandled).to.exist;
        expect(r.unhandled).is.a.function;
    });

    it("should log as unhandled unexpected type..", function() {
        var r = new Renderer()
        r.render(1);

        expect(r.unhandled()).to.have.length(1);
    });


    it("should, after having written 3 things, flushed, called appropriate context methods.",
    function() {
        var r = new Renderer();
        var vs = new VectorStream(r);
        vs.write(1,2,3)
        vs.flush();

        expect(r.unhandled()).to.have.length(3);
    });

    it("should, after written 1 array with 3 things and flushed, called context methods.",
    function() {
        var r = new Renderer();
        var vs = new VectorStream(r);

        vs.write([1,2,3])
        vs.flush();

        expect(r.unhandled()).to.have.length(3);
    });

    it("should call method of context.",
        function() {
            var called = false;
            var args = [1,2,3];
            var params = null;

            var ctx = {
                lineTo:function() {
                    params = Array.prototype.slice.call(arguments);
                    called = true;
                }
            };
            var r = new Renderer(ctx);
            var vs = new VectorStream(r);

            vs.write({method:"lineTo", args:args})
            vs.flush();

            expect(called).is.true;
            expect(params).to.include.members(args);
        });

    it("should call method if only string is in stream.",
        function() {
            var called = false;
            var ctx = { beginPath:function() { called = true; } };
            var r = new Renderer(ctx);
            var vs = new VectorStream(r);

            vs.write("beginPath")
            vs.flush();

            expect(called).is.true;
        });

    it("should set a value if method and value properties object is in the stream.",
        function() {
            var value = "#000";
            var ctx = {};
            var r = new Renderer(ctx);
            var vs = new VectorStream(r);

            vs.write({method:"strokeStyle", value:value})
            vs.flush();

            expect(ctx.strokeStyle).equals(value);
        });

    it("should write stream of geom objects to the context.",
        function() {
            var value = "#000";
            var moveTo = [0,0];
            var lineTo = [100,100];

            var ctx = {
                streamed:{},
                beginPath:function() { this.streamed.beginPath = true; },
                moveTo:function() { this.streamed.moveTo = slice.call(arguments); },
                lineTo:function() { this.streamed.lineTo = slice.call(arguments); },
                stroke:function() { this.streamed.stroke = true; }
            };
            var r = new Renderer(ctx);
            var vs = new VectorStream(r);

            vs.write([
                "beginPath",
                    {method:"strokeStyle", value:value},
                    {method:"moveTo", args:moveTo},
                    {method:"lineTo", args:lineTo},
                "stroke"
            ]);
            vs.flush();

            expect(ctx.streamed.beginPath).to.be.true;
            expect(ctx.strokeStyle).equals(value);
            expect(ctx.streamed.moveTo).to.include.members(moveTo);
            expect(ctx.streamed.lineTo).to.include.members(lineTo);
            expect(ctx.streamed.stroke).to.be.true;
            expect(r.unhandled()).to.have.length(0);
        });

});
