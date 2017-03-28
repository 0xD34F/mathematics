var Primes = (function() {
    var primes = [2, 3, 5, 7, 11];

    // проверка, является ли число простым
    function test(n) {
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

        for (i = p + 1; i < max; i++) {
            if (test(i)) {
                primes.push(i);
            }

            if (n % i === 0) {
                return false;
            }
        }

        return true;
    }

    // получение n первых простых чисел
    function get(n) {
        var i = primes[primes.length - 1] + 1;
        while (primes.length < n) {
            test(i++);
        }

        return primes.slice(0, n);
    }

    return {
        _list: function() {
            return primes.slice(0);
        },
        test: test,
        get: get
    };
})();
