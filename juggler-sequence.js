// последовательности жонглёра
(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.jugglerSequence = factory();
    }
}(function() {
    return function(n) {
        var mem = [ n ];

        // получение n-ого элемента или n первых элементов последовательности
        return function(n, all) {
            if (n < 0) {
                return NaN;
            }

            if (mem.length <= n && mem[mem.length - 1] !== 1) {
                for (var i = mem.length; i <= n; i++) {
                    var prev = mem[mem.length - 1],
                        next = Math.floor(Math.pow(prev, prev & 1 ? 1.5 : 0.5));

                    mem.push(next);

                    if (next === 1) {
                        break;
                    }
                }
            }

            return all ? mem.slice(0, n) : (mem[n] || 1);
        }
    };
}));
