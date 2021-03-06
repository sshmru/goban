var Sob = require('sob');
var PIXI  = require('pixi.js');
var settings = require('./settings.js');

var RAF = new Sob(function(next){
	var cb = function(){
		next();
		requestAnimationFrame(cb);
	};
	requestAnimationFrame(cb);
});

module.exports = function(document){
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	var getFittingSize = function(baseW, baseH, w, h){
		var ratio = baseW/baseH;
		return {
			width: w/h >= ratio ? h*ratio : w,
			height: w/h >= ratio ? h : w/ratio
		};
	};
	var size = getFittingSize(settings.width, settings.height, window.innerWidth, window.innerHeight);
	var stage = new PIXI.Container();
	stage.width = settings.width;
	stage.height = settings.height;
	stage.interactive = true;
	stage.scale.set(size.width / settings.width, size.height/ settings.height);
	
	

	window.renderer = PIXI.autoDetectRenderer(size.width, size.height, {view: canvas, antialias: true});
	RAF.sub(function(){
		renderer.render(stage);
	});
	
	
	var board = new PIXI.Sprite.fromImage('board.jpg');
	board.interactive = true;
	
	var nextMove = 2;
	var moves = new Sob.fromEvent(board, 'mousedown');
	moves.sub(function(){
		nextMove = 1 + (nextMove % 2);
	});
	
	var lines = new PIXI.Graphics();
	lines.lineStyle(settings.lineWidth, 0x000000, 1);
	var iters = settings.lines - 1;
	lines.drawRect(settings.spacingX/2, settings.spacingY/2, iters*settings.spacingX, iters*settings.spacingY);
	for(var i = 0; i < iters; i++){
		lines.moveTo(settings.spacingX/2 , settings.spacingY/2 + i*settings.spacingY);
		lines.lineTo(settings.spacingX/2 +  iters*settings.spacingX, settings.spacingY/2 + i*settings.spacingY);
		
		lines.moveTo(settings.spacingX/2 +  i*settings.spacingX, settings.spacingY/2);
		lines.lineTo(settings.spacingX/2 +  i*settings.spacingX, settings.spacingY/2 + iters*settings.spacingY);
	}
	lines.lineStyle(settings.starDiameter, 0x000000, 1);
	for(var i = 3; i < 19; i+=6){
		for(var j = 3; j < 19; j+=6){
			lines.drawCircle(settings.spacingX/2 +  i*settings.spacingX, settings.spacingY/2 + j*settings.spacingY, 0.5);
		}
	}
	lines.endFill();
	
	board.addChild(lines);
	
	
	var Stone = (function(){
		// var dropShadowFilter = new PIXI.filters.DropShadowFilter();
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
		
		var Stone = function(x, y, color){
			var texture = !color ? none :
				color === 1 ? white : black;
			PIXI.Sprite.call(this, texture);
			this.anchor.set(0.5, 0.5);
			this.interactive = true;
			this.clicks = new Sob.fromEvent(this, 'mousedown');
			this.clicks.sub(this.onclick.bind(this));
		};
		Stone.prototype = Object.create(PIXI.Sprite.prototype);
		Stone.prototype.onclick = function(){
			// var num = Math.round(Math.random()*100000)%3;
			var num = nextMove;
			this.setColor(num);
		};
		Stone.prototype.setColor = function(color){
			var texture = !color ? none :
				color === 1 ? white : black;
			this.texture = texture;
		};
		
		return Stone;
	})();
	
	var fillBoard = function(random){
		for(var i = 0; i < settings.lines; i++){
			for(var j = 0; j < settings.lines; j++){
				var x = settings.spacingX/2 + i*settings.spacingX;
				var y = settings.spacingY/2 + j*settings.spacingY;
				var stone  = new Stone(x, y, random ? Math.round(Math.random()*100000)%3 : 0 );
				// var stone = new PIXI.Graphics();
				// stone.lineStyle(2, 0x000000, 1);
				// stone.beginFill(0xffffff, 0.7);
				// stone.drawCircle(0, 0, settings.stoneDiameter/2)
				// stone.endFill();
				stone.x = x;
				stone.y = y;

				board.addChild(stone);
			}
		}
	};
	fillBoard()
	// RAF.sub(fillBoard)

	// 
	// PIXI.ticker.shared.add(function(){
	// 	stone.position.x = Math.random()*10
	// 	stone.position.y = Math.random()*10
	// });
	
	stage.addChild(board);
};

