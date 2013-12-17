/*******************************************************************************
 ******************************************************************************/
String.prototype.toColorArray = function() {

    var x = /#([a-gA-G0-9]{2})([a-gA-G0-9]{2})([a-gA-G0-9]{2})([a-gA-G0-9]{2})?/;

    var a = x.exec( this.toString() ).slice(1);

    if (!a[3]) {
        a.pop()
    }

    for (var i = 0; i < a.length; i++) {
        a[i] = parseInt( a[i], 16 );
    }

    return a;
};

/*******************************************************************************
 * Escapes reserved regex characters
 ******************************************************************************/
Array.prototype.toColor = function() {

    var n = this.length <= 3 ? 3 : 4;

    var pieces = this.concat( [0,0,0,0] ).slice(0,n);

    if (!this.length) {
        return "rgb(" + pieces.join() + ")";
    } else if (this.length <= 3) {
        return "rgb(" + pieces.join() + ")";
    } else if (this.length >= 4) {
        return "rgba(" + pieces.join() + ")";
    }
    return void(0);
};

/*******************************************************************************
 * Sets / Gets the red component of the array.
 ******************************************************************************/
Array.prototype.red = function() {
    switch (arguments.length) {
        case 1: this[0] = arguments[0]; return this;
        case 0: return this[0];
    }
};
/*******************************************************************************
 * Sets / Gets the green component of the array.
 ******************************************************************************/
Array.prototype.green = function() {
    switch (arguments.length) {
        case 1: this[1] = arguments[0]; return this;
        case 0: return this[1];
    }
};
/*******************************************************************************
 * Sets / Gets the blue component of the array.
 ******************************************************************************/
Array.prototype.blue = function() {
    switch (arguments.length) {
        case 1: this[2] = arguments[0]; return this;
        case 0: return this[2];
    }
};
/*******************************************************************************
 * Sets / Gets the alpha component of the array.
 ******************************************************************************/
Array.prototype.alpha = function() {
    switch (arguments.length) {
        case 1: this[3] = arguments[0]; return this;
        case 0: return this.length == 3 ? 0 : this[3];
    }
};