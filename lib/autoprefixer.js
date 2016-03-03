var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');

exports.act = function(buffer, encoding, callback) {
    var bone = this.bone;
    var options = this.options();
    var css = buffer.toString();

    postcss([ autoprefixer(options) ]).process(css).then(function (result) {
        result.warnings().forEach(function (warn) {
            console.warn(warn.toString());
        });
        callback(null, result.css);
    });
};

exports.filter = {
    ext: '.css'
};