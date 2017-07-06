(function(exports) {
    var factorial = (function() {
        var mem = [1];

        return function(n) {
            var len = mem.length;
            if (len > n) {
                return mem[n];
            }

            var f = mem[len - 1];

            for (var i = len; i <= n; i++) {
                mem.push(f *= i);
            }

            return f;
        }
    })();

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

    // числа Каталана
    function catalan(n) {
        return Math.round(combinations(2 * n, n) / (n + 1));
    }

    // перестановки с фиксированными элементами
    function rencontres(n, k) {
        if (n < k) {
            return NaN;
        }

        var s = 0;

        for (var i = 0; i <= n - k; i++) {
            s += Math.pow(-1, i) / factorial(i);
        }

        return Math.round(s * factorial(n) / factorial(k));
    }

    // числа Эйлера первого рода
    function eulerian1(n, k) {
        if (n < k) {
            return 0;
        }

        var s = 0;

        for (var i = 0; i < k + 1; i++) {
            s += Math.pow(-1, i) * Math.pow(k + 1 - i, n) * combinations(n + 1, i);
        }

        return s;
    }

    // числа Эйлера второго рода
    function eulerian2(n, k) {
        if (n < k) {
            return 0;
        }

        if (k == 0) {
            return 1;
        }

        return (2 * n - k - 1) * eulerian2(n - 1, k - 1) + (k + 1) * eulerian2(n - 1, k);
    }

    // числа Деланноя
    function delannoy(n, k) {
        if (n === 0 || k === 0) {
            return 1;
        }

        return delannoy(n - 1, k) + delannoy(n - 1, k - 1) + delannoy(n, k - 1);
    }

    Object.assign(exports, {
        factorial,
        combinations,
        combinationsR,
        permutations,
        stirling1,
        stirling2,
        bell,
        catalan,
        eulerian1,
        eulerian2,
        delannoy,
        rencontres
    });
})(typeof window === 'undefined' ? module.exports : (window.combinatorics = {}));
