// треугольник Паскаля
(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.pascalTriangle = factory();
    }
}(function() {
    var mem = [
        [ 1 ]
    ];

    // .slice - чтобы нельзя было испортить данные извне
    var get = function(n, all) {
        return all
            ? mem.slice(0, n).map(line => line.slice(0))
            : mem[n].slice(0);
    };

    return function recursive(n, all) {
        n |= 0;
        if (n < 0) {
            return null;
        }

        if (mem.length < n + 1) {
            var prev = recursive(n - 1, false),
                s = [ 1 ];

            for (var i = 1; i < prev.length; i++) {
                s.push(prev[i - 1] + prev[i]);
            }

            s.push(1);

            mem.push(s);
        }

        return get(n, all);
    }
}));
