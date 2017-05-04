var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');

exports.act = function(buffer, encoding, callback) {
    var bone = this.bone;
    var options = this.options();
    var css = buffer.toString();

    this.cacheable();

    postcss([ autoprefixer(options) ]).process(css).then(function (result) {
        result.warnings().forEach(function (warn) {
            bone.log.warn('bone-act-autoprefixer', warn.toString());
        });
        callback(null, result.css);
    });
};

exports.filter = {
    ext: '.css'
};