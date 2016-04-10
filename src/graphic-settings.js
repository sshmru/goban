var settings = {
	width: 424.2,
	height: 454.5,
	spacingX: 22,
	spacingY: 23.7,
	lineWidth: 1,
	starDiameter: 4,
	stoneDiameter: 22.5
};
Object.keys(settings).forEach(function(k){
	settings[k] = settings[k] * 2;
});

settings.moveNumbers = true;

module.exports = settings;
