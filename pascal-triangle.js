var pascalTriangle = (function() {
    var mem = [
        [ 1 ],
        [ 1, 1 ]
    ];

    var get = function(n, all) {
        return all ? mem.slice(0, n) : mem[n];
    };

    return function recursive(n, all) {
        if (n < 0) {
            return null;
        }

        if (mem.length >= n + 1) {
            return get(n, all);
        }

        var prev = recursive(n - 1, false),
            s = [ 1 ];

        for (var i = 1; i < prev.length; i++) {
            s.push(prev[i - 1] + prev[i]);
        }

        s.push(1);

        mem.push(s);

        return get(n, all);
    }
})();
