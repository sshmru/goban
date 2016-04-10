var Sob = require('sob');
var settings = require('./graphic-settings.js');
var PIXI  = require('pixi.js');

var getTexture = function(color, color2, empty){
	var texture = new PIXI.Graphics();
	if(empty){
		texture.lineStyle(1, 0x000000, 0);
		texture.beginFill(0x000000, 0);
		texture.drawCircle(0, 0, settings.stoneDiameter/2);
		return texture.generateTexture();
	}
	
	texture.beginFill(0x000000, 0.9);
	texture.lineStyle(1, 0x000000, 0);
	texture.drawCircle(-2, 4, -2+settings.stoneDiameter/2);
	
	texture.lineStyle(1, color2, 0.7);
	texture.beginFill(color, 1);
	texture.drawCircle(0, 0, -2+settings.stoneDiameter/2);
	texture.endFill();
	// texture.filters = [dropShadowFilter];
	return texture.generateTexture();
};
// var white = getTexture(0xffffff ,0x000000);
var white = getTexture(0xe4e4dd ,0x000000);
// var black = getTexture(0x000000, 0xffffff);
var black = getTexture(0x190808, 0xffffff);
// var none = PIXI.Texture.EMPTY;
var none = getTexture(null, null, true);

// var dropShadowFilter = new PIXI.filters.DropShadowFilter();

var Stone = function(x, y, color){
	var texture = !color ? none :
		color === 1 ? white : black;
	PIXI.Sprite.call(this, texture);
	this.color = color;
	this.anchor.set(0.5, 0.5);
	this.interactive = true;
	
	this.$events = new Sob()
		.merge( new Sob.fromEvent(this, 'mousedown') )
		.merge( new Sob.fromEvent(this, 'touchstart') );
};
Stone.prototype = Object.create(PIXI.Sprite.prototype);

Stone.prototype.setColor = function(color){
	if(this.color === color)
		return;
	var texture = !color ? none :
		color === 1 ? black : white;
	this.texture = texture;
};

module.exports = Stone;