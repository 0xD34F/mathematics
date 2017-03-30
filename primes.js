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
            i = 1,
            p = null;

        while (n > 1) {
            p = get(i);
            if (n % p === 0) {
                s.push(p);
                n /= p;
            } else {
                i++;
            }
        }

        return s;
    }

    return {
        _list: function() {
            return primes.slice(0);
        },
        test: test,
        get: get,
        factorization: factorization
    };
})();
