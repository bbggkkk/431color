const { Color, Hsl } = require('./dist/Color');

console.log(new Color('rgba(255,255,255,1)').hue(124).saturation(50).darken(20).get('rgb'));

exports.Color = Color;
exports.Hsl = Hsl;