(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.Complex = factory();
    }
}(function() {
    function Complex(re, im) {
        var c = Object.create(Complex.prototype);

        if (re instanceof Complex) {
            re = r.re;
            im = r.im;
        }

        c.re = re;
        c.im = im;

        return c;
    }

    function complexParam(f) {
        return function(re, im) {
            return f.call(this, re instanceof Complex ? re : Complex(re, im));
        };
    }

    Complex.prototype.equals = complexParam(function(c) {
        return (this.re === c.re) && (this.im === c.im);
    });

    Complex.prototype.add = complexParam(function(c) {
        return Complex(this.re + c.re, this.im + c.im);
    });

    Complex.prototype.sub = complexParam(function(c) {
        return Complex(this.re - c.re, this.im - c.im);
    });

    Complex.prototype.mul = complexParam(function(c) {
        return Complex(this.re * c.re - this.im * c.im, this.im * c.re + this.re * c.im);
    });

    Complex.prototype.div = complexParam(function(c) {
        var d = c.re * c.re + c.im * c.im;
        return Complex((this.re * c.re + this.im * c.im) / d, (this.im * c.re - this.re * c.im) / d);
    });

    return Complex;
}));
