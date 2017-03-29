/* генератор линейных рекуррентных последовательностей
 *
 * числа Фибоначчи : LRS({ 1: 1, 2: 1 }, [ 0, 1 ])
 * числа Люка : LRS({ 1: 1, 2: 1 }, [ 2, 1 ])
 * числа Пелля : LRS({ 1: 2, 2: 1 }, [ 0, 1 ])
 * a(n) = -2*a(n-2) + 3*a(n-3), a(0) = 4, a(1) = -5, a(2) = 1 : LRS({ 2: -2, 3: 3 }, [ 4, -5, 1 ])
 */
var LRS = function(form, start) {
    var mem = start.slice(0);

    return function recursive(n) {
        if (n < 0) {
            return NaN;
        }

        if (mem.length > n) {
            return mem[n];
        }

        var s = 0;

        for (var i in form) {
            s += recursive(n - i) * form[i];
        }

        mem.push(s);

        return s;
    }
};
