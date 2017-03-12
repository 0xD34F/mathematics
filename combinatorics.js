var Combinatorics = (function() {
    function factorial(n) {
        var f = 1;

        for (var i = 1; i <= n; i++) {
            f *= i;
        }

        return f;
    }

    // сочетания
    function combinations(n, k) {
        return factorial(n) / factorial(n - k) / factorial(k);
    }

    // сочетания с повторениями
    function combinationsR(n, k) {
        return combinations(n + k - 1, k);
    }

    // перестановки
    function permutations(n, k) {
        return k < n ? (factorial(n) / factorial(n - k)) : 0;
    }

    // числа Стирлинга первого рода (со знаком)
    function stirling1(n, k) {
        if (n === 0 || k === 0) {
            return n === k ? 1 : 0;
        }

        return stirling1(n - 1, k - 1) - (n - 1) * stirling1(n - 1, k);
    }

    // числа Стирлинга второго рода
    function stirling2(n, k) {
        if (k > n) {
            return NaN;
        }

        var s = 0;
        for (var i = 0; i <= k; i++) {
            s += Math.pow(-1, k + i) * combinations(k, i) * Math.pow(i, n);
        }

        return s / factorial(k);
    }

    // числа Белла
    function bell(n) {
        if (n < 0) {
            return NaN;
        }

        var prev, next = [ 1 ];

        for (var i = 2; i <= n; i++) {
            prev = next;
            next = [ prev[prev.length - 1] ];
            for (var j = 0; j < prev.length; j++) {
                next.push(next[next.length - 1] + prev[j]);
            }
        }

        return next.pop();
    }

    return {
        factorial: factorial,
        combinations: combinations,
        combinationsR: combinationsR,
        permutations: permutations,
        stirling1: stirling1,
        stirling2: stirling2,
        bell: bell
    };
})();
