// таблица Витхоффа
(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.wythoffArray = factory();
    }
}(function() {
    // золотое сечение
    var gr = (1 + Math.sqrt(5)) / 2;

    function getElement(m, n, previous) {
        return n > 1
            ? previous[n - 2] + previous[n - 1]
            : Math.floor(Math.floor((m + 1) * gr) * Math.pow(gr, n + 1));
    }

    return function(m, n) {
        var t = new Array(m);
        for (var i = 0; i < m; i++) {
            t[i] = new Array(n);
            for (var j = 0; j < n; j++) {
                t[i][j] = getElement(i, j, t[i]);
            }
        }

        return t;
    };
}));
