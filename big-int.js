(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.BigInt = factory();
    }
}(function() {
    function BigInt(a) {
        if (a instanceof BigInt) {
            return a;
        }

        if (typeof a === 'number') {
            a = a.toString();
        }

        if (typeof a !== 'string' || !/^-?0|([1-9][0-9]*)$/.test(a)) {
            throw new TypeError('incorrect value');
        }

        var b = Object.create(BigInt.prototype);

        b.sign = a[0] === '-';
        b.val = b.sign ? a.slice(1) : a;
// to-do: fix '-0'
        return b;
    }

    function BigIntParam(f) {
        return function(x) {
            return f.call(this, BigInt(x));
        };
    }

    Object.assign(BigInt.prototype, {
        toString: function() {
            return (this.sign ? '-' : '') + this.val;
        },
        neg: function() {
            return BigInt((this.sign ? '' : '-') + this.val);
        },
        abs: function() {
            return BigInt(this.val);
        },
        eq: BigIntParam(function(x) {
            return this.sign === x.sign && this.val === x.val;
        }),
        ne: function(x) {
            return !this.eq(x);
        },
        lt: BigIntParam(function(x) {
            if (this.sign !== x.sign) {
                return this.sign;
            }

            var diff = this.val.length - x.val.length;
            if (diff) {
                return this.sign === (diff > 0);
            }

            for (var i = 0; i < this.val.length; i++) {
                diff = this.val[i] - x.val[i];
                if (diff) {
                    return this.sign === (diff > 0);
                }
            }

            return false;
        }),
        lte: function(x) {
            return this.eq(x) || this.lt(x);
        },
        gt: function(x) {
            return !this.lte(x);
        },
        gte: function(x) {
            return !this.lt(x);
        },
        add: BigIntParam(function(x) {
            var p = 0,
                q = this.sign === x.sign ? 1 : -1,
                a = this.val.split('').reverse(),
                b = x.val.split('').reverse(),
                len = Math.max(a.length, b.length),
                result = [],
                sign;

            if (this.abs().lt(x.abs())) {
                [ a, b ] = [ b, a ];
                sign = x.sign;
            } else {
                sign = this.sign;
            }

            for (var i = 0; (i < len) || p > 0; i++) {
                var ai = a[i] | 0,
                    bi = b[i] | 0,
                    s = ai + bi * q + p;

                result.unshift((s < 0) ? (10 + s) : (s % 10));
                p = ((s < 0) || (s >= 10)) ? q : 0;
            }

            while (result[0] === 0) {
                result.shift();
            }

            return BigInt((sign ? '-' : '') + (result.join('') || '0'));
        }),
        sub: function(x) {
            return this.add(BigInt(x).neg());
        },
        mul: BigIntParam(function(x) {
            var a = this.val.split('').reverse(),
                b = x.val.split('').reverse(),
                sign = this.sign !== x.sign,
                sum = BigInt(0);

            for (var i = 0; i < a.length; i++) {
                var r = [],
                    p = 0,
                    ai = +a[i];

                for (var j = 0; j < b.length; j++) {
                    var bj = +b[j],
                        m = ai * bj + p;

                    r.unshift(m % 10);
                    p = (m / 10) | 0;
                }

                if (p) {
                    r.unshift(p);
                }

                sum = sum.add(r.concat(Array(i).fill('0')).join(''));
            }

            return sign ? sum.neg() : sum;
        }),
        div: BigIntParam(function(x) {
            var pos = x.val.length,
                divisor = x.abs(),
                dividend = BigInt(this.val.slice(0, pos)),
                sign = this.sign !== x.sign,
                result = [];

            if (dividend.lt(divisor)) {
                dividend.val += this.val[pos++] || '';
            }

            while (pos <= this.val.length) {
                var quotient = null;
                for (var i = 9; ; i--) {
                    quotient = divisor.mul(i);
                    if (quotient.lte(dividend)) {
                        break;
                    }
                }

                result.push(i);
                dividend = dividend.sub(quotient);
                if (dividend.eq(0)) {
                    dividend.val = this.val[pos++] || '';
                } else {
                    dividend.val += this.val[pos++] || '';
                }
            }

            return BigInt((sign ? '-' : '') + (result.join('') || '0'));
        })
    });

    return BigInt;
}));
