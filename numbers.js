(function(exports) {
    var primes = [2, 3];

    // является ли число простым
    function isPrime(n) {
        if (n < primes[0]) {
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

        for (i = p + 2; i <= max; i += 2) {
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
        var i = primes[primes.length - 1] + 2;

        while (primes.length < n) {
            if (isPrime(i)) {
                primes.push(i);
            }
            i += 2;
        }

        return all ? primes.slice(0, n) : primes[n - 1];
    }

    // разложение числа на простые множители
    function factorization(n, grouped) {
        var s = [],
            i = 0,
            p = getPrime(1);

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

    // собственные делители числа
    function divisors(n) {
        if (n < 1) {
            return null;
        }

        var max = Math.sqrt(n),
            d = [];
            x = 1;

        while (x <= max) {
            if (n % x === 0) {
                d.push(x);
                if (x !== max) {
                    d.push(n / x);
                }
            }

            x++;
        }

        return d.sort(function(a, b) {
            return a - b;
        });
    }

    // является ли число почти простым
    function isAlmostPrime(n, K) {
        return factorization(n).length === K;
    }

    // является ли число полупростым
    function isSemiprime(n) {
        return isAlmostPrime(n, 2);
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

    // является ли число полнократным
    function isPowerful(n) {
        var f = factorization(n, true);
        for (var i in f) {
            if (f[i] < 2) {
                return false;
            }
        }

        return true;
    }

    // является ли число свободным от квадратов
    function isSquareFree(n) {
        var f = factorization(n, true);
        for (var i in f) {
            if (f[i] > 1) {
                return false;
            }
        }

        return true;
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

    // наименьшее общее кратное
    function lcm(a, b) {
        return a * b / gcd(a, b);
    }

    // являются ли числа взаимно простыми
    function isCoprime(a, b) {
        return gcd(a, b) === 1;
    }

    // радикал числа
    function radical(n) {
        var f = factorization(n, true),
            r = 1;

        for (var i in f) {
            r *= i;
        }

        return r;
    }

    // функция Мёбиуса
    function mobius(n) {
        if (!isSquareFree(n)) {
            return 0;
        }

        return (factorization(n).length & 1) ? -1 : 1;
    }

    Object.assign(exports, {
        gcd,
        lcm,
        radical,
        factorization,
        divisors,
        getPrime,
        isPrime,
        isAlmostPrime,
        isSemiprime,
        isSphenic,
        isSmooth,
        isPowerful,
        isSquareFree,
        isCoprime,
        mobius
    });
})(typeof window === 'undefined' ? module.exports : (window.numbers = {}));
