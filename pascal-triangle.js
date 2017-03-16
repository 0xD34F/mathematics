var pascalTriangle = (function() {
    var mem = {
        1: [ 1 ],
        2: [ 1, 1 ]
    };

    var get = function(n, all) {
        if (!all) {
            return mem[n];
        }

        var t = [];
        for (var i = 1; i <= n; i++) {
            t.push(mem[i]);
        }

        return t;
    };

    return function recursive(n, all) {
        if (n < 1) {
            return NaN;
        }

        if (mem.hasOwnProperty(n)) {
            return get(n, all);
        }

        var prev = recursive(n - 1, false),
            s = [ 1 ];

        for (var i = 1; i < prev.length; i++) {
            s.push(prev[i - 1] + prev[i]);
        }

        s.push(1);

        mem[n] = s;

        return get(n, all);
    }
})();
