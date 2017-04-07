// треугольник Паскаля
var pascalTriangle = (function() {
    var mem = [
        [ 1 ]
    ];

    // .slice - чтобы нельзя было испортить данные извне
    var get = function(n, all) {
        if (!all) {
            return mem[n].slice(0);
        }

        var t = [];
        for (var i = 0; i < n; i++) {
            t.push(mem[i].slice(0));
        }

        return t;
    };

    return function recursive(n, all) {
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
})();
