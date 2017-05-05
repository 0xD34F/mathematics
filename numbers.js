var Numbers = (function() {
    var primes = [2, 3];

    // проверка, является ли число простым
    function isPrime(n) {
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
            if (isPrime(i)) {
                primes.push(i);
            }

            if (n % i === 0) {
                return false;
            }
        }

        return true;
    }

    // получение n-ого или n первых простых чисел
    function getPrime(n, all) {
        var i = primes[primes.length - 1] + 1;

        while (primes.length < n) {
            if (isPrime(i)) {
                primes.push(i);
            }
            i++;
        }

        return all ? primes.slice(0, n) : primes[n - 1];
    }

    // разложение числа на простые множители
    function factorization(n, grouped) {
        var s = [],
            i = 0,
            p = 0;

        while (n > 1) {
            if (n % p === 0) {
                s.push(p);
                n /= p;
            } else {
                p = getPrime(++i);
            }
        }

        if (grouped) {
            var g = {};
            for (i = 0; i < s.length; i++) {
                g[s[i]] = (g[s[i]] || 0) + 1;
            }
            return g;
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

    // наибольший общий делитель
    function gcd(a, b) {
        var fa = factorization(a, true),
            fb = factorization(b, true);

        var d = 1;
        for (var i in fa) {
            if (fb[i]) {
                d *= Math.pow(i, (fa[i] < fb[i]) ? fa[i] : fb[i]);
            }
        }

        return d;
    }

    return {
        _list: function() {
            return primes.slice(0);
        },
        gcd: gcd,
        factorization: factorization,
        getPrime: getPrime,
        isPrime: isPrime,
        isSemiprime: isSemiprime,
        isSphenic: isSphenic,
        isSmooth: isSmooth
    };
})();
