(function(factory) {
    if (typeof window === 'undefined') {
        module.exports = factory();
    } else {
        window.mean = factory();
    }
}(function() {
    // среднее арифметическое
    function arithmetic(...values) {
        var t = [].concat(...values);
        return t.reduce((p, c) => p + c, 0) / t.length;
    }

    // среднее геометрическое
    function geometric(...values) {
        var t = [].concat(...values);
        return Math.pow(t.reduce((p, c) => p * c, 1), 1 / t.length);
    }

    // среднее гармоническое
    function harmonic(...values) {
        var t = [].concat(...values);
        return t.length / t.reduce((p, c) => p + 1 / c, 0);
    }

    // среднее квадратическое
    function rms(...values) {
        var t = [].concat(...values);
        return Math.sqrt(t.reduce((p, c) => p + c * c, 0) / t.length);
    }

    return {
        arithmetic,
        geometric,
        harmonic,
        rms
    };
}));
