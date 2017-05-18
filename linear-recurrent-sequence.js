/* линейные рекуррентные последовательности
 *
 * числа Фибоначчи : LRS({ 1: 1, 2: 1 }, [ 0, 1 ])
 * числа Люка : LRS({ 1: 1, 2: 1 }, [ 2, 1 ])
 * числа Пелля : LRS({ 1: 2, 2: 1 }, [ 0, 1 ])
 * a(n) = -2*a(n-2) + 3*a(n-3), a(0) = 4, a(1) = -5, a(2) = 1 : LRS({ 2: -2, 3: 3 }, [ 4, -5, 1 ])
 * a(n) = a(n-1) + 5, a(0) = 1 : LRS({ 1: 1 }, [ 1 ], 5)
 */
var LRS = function(form, start, inhomogeneous) {
    var mem = start.slice(0);

    // получение n-ого элемента или n первых элементов последовательности
    return function recursive(n, all) {
        if (n < 0) {
            return NaN;
        }

        if (mem.length <= n) {
            var s = 0;

            for (var i in form) {
                s += recursive(n - i) * form[i];
            }

            if (inhomogeneous !== undefined) {
                if (inhomogeneous instanceof Function) {
                    s += inhomogeneous(n);
                } else if (!isNaN(inhomogeneous)) {
                    s += +inhomogeneous;
                }
            }

            mem.push(s);
        }

        return all ? mem.slice(0, n) : mem[n];
    }
};
