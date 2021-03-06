﻿(function(exports) {
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

        return d.sort((a, b) => a - b);
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

    // является ли число квадратным
    function isSquare(n) {
        var r = Math.sqrt(n) | 0;
        return r * r === n;
    }

    // является ли число прямоугольным
    function isPronic(n) {
        var r = Math.sqrt(n) | 0;
        return r * (r + 1) === n;
    }

    // является ли число треугольным
    function isTriangular(n) {
        return isPronic(n * 2);
    }

    // является ли число шестиугольным
    function isHexagonal(n) {
        var r = (Math.sqrt(8 * n + 1) + 1) / 4;
        return r === (r | 0);
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
    function rad(n) {
        return Object.keys(factorization(n, true)).reduce((p, c) => p * c, 1);
    }

    // функция Мёбиуса
    function mobius(n) {
        if (!isSquareFree(n)) {
            return 0;
        }

        return (factorization(n).length & 1) ? -1 : 1;
    }

    // функция Мертенса
    function mertens(n) {
        return [...Array(n)].reduce((p, c, i) => p + mobius(i + 1), 0);
    }

    // аликвотная сумма
    function aliquotSum(n) {
        return divisors(n).reduce((p, c) => p + c) - n;
    }

    // является ли число совершенным
    function isPerfect(n) {
        return aliquotSum(n) === n;
    }

    // является ли число полусовершенным
    function isSemiperfect(n) {
        var d = divisors(n).slice(0, -1),
            m = Math.pow(2, d.length);

        for (var s = 1; s < m; s++) {
            if (d.reduce((p, c, i) => p + ((s & (1 << i)) ? c : 0), 0) === n) {
                return true;
            }
        }

        return false;
    }

    // является ли число недостаточным
    function isDeficient(n) {
        return aliquotSum(n) < n;
    }

    // является ли число избыточным
    function isAbundant(n) {
        return aliquotSum(n) > n;
    }

    // являются ли числа дружественными
    function isAmicable(a, b) {
        return (aliquotSum(a) === b) && (aliquotSum(b) === a);
    }

    Object.assign(exports, {
        gcd,
        lcm,
        rad,
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
        isSquare,
        isPronic,
        isTriangular,
        isHexagonal,
        isCoprime,
        aliquotSum,
        isPerfect,
        isSemiperfect,
        isDeficient,
        isAbundant,
        isAmicable,
        mobius,
        mertens
    });
})(typeof window === 'undefined' ? module.exports : (window.numbers = {}));
