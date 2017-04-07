// таблица Витхоффа
var wythoffArray = (function() {
    // золотое сечение
    var gr = (1 + Math.sqrt(5)) / 2;

    function getElement(m, n) {
        if (n === 1) {
            return Math.floor(Math.floor(m * gr) * gr);
        } else if (n === 2) {
            return Math.floor(Math.floor(m * gr) * gr * gr);
        } else {
            return getElement(m, n - 2) + getElement(m, n - 1);
        }
    }

    return function(m, n) {
        var t = new Array(m);
        for (var i = 0; i < m; i++) {
            t[i] = new Array(n);
            for (var j = 0; j < n; j++) {
                t[i][j] = getElement(i + 1, j + 1);
            }
        }

        return t;
    };
})();
