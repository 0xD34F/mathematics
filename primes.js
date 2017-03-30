var Primes = (function() {
    var primes = [2, 3];

    // проверка, является ли число простым
    function test(n) {
        if (n < 2) {
            return false;
        }

        if (primes.indexOf(n) !== -1) {
            return true;
        }

        var max = Math.ceil(Math.sqrt(n)),
            p = 0;

        for (var i = 0; i < primes.length; i++) {
            p = primes[i];

            if (p > max) {
                return true;
            }

            if (n % p === 0) {
                return false;
            }
        }

        for (i = p + 1; i <= max; i++) {
            if (test(i)) {
                primes.push(i);
            }

            if (n % i === 0) {
                return false;
            }
        }

        return true;
    }

    // получение n-ого или n первых простых чисел
    function get(n, all) {
        var i = primes[primes.length - 1] + 1;

        while (primes.length < n) {
            if (test(i)) {
                primes.push(i);
            }
            i++;
        }

        return all ? primes.slice(0, n) : primes[n - 1];
    }

    // разложение числа на простые множители
    function factorization(n) {
        var s = [],
            i = 0,
            p = 0;

        while (n > 1) {
            if (n % p === 0) {
                s.push(p);
                n /= p;
            } else {
                p = get(++i);
            }
        }

        return s;
    }

    // является ли число полупростым
    function isSemiprime(n) {
        return factorization(n).length === 2;
    }

    // является ли число сфеническим
    function isSphenic(n) {
        var f = factorization(n);
        return f.length === 3 && f[0] !== f[1] && f[1] !== f[2];
    }

    // является ли число гладким
    function isSmooth(n, B) {
        return factorization(n).pop() <= B;
    }

    return {
        _list: function() {
            return primes.slice(0);
        },
        test: test,
        get: get,
        factorization: factorization,
        isSemiprime: isSemiprime,
        isSphenic: isSphenic,
        isSmooth: isSmooth
    };
})();
