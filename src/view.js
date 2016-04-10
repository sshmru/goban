var Sob = require('sob');

var PIXI  = require('pixi.js');
var settings = require('./graphic-settings.js');
var Stone = require('./Stone.js');

module.exports = function($model){
	
	var view = {
		// stage: PIXI.Container
		// $events: Sob.fromEvent
		// intersections : [[Stone, Stone,...],[]]
	};
	

	
	
	var getFittingSize = function(baseW, baseH, w, h){
		var ratio = baseW/baseH;
		return {
			width: w/h >= ratio ? h*ratio : w,
			height: w/h >= ratio ? h : w/ratio
		};
	};
	
	var updateSize = function(stage){
		var size = getFittingSize(settings.width, settings.height, window.innerWidth, window.innerHeight);
		stage.width = settings.width;
		stage.height = settings.height;
		stage.interactive = true;
		stage.scale.set(size.width / settings.width, size.height/ settings.height);
	};
	
	var drawLines = function(board, iters){
		var lines = new PIXI.Graphics();
		
		lines.lineStyle(settings.lineWidth, 0x000000, 1);
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
		
	};
	
	var fillBoard = function(board, state, $events){
		
		var bindStoneClick = function(i,j,e){
			return function(){
				$events.next({
					'type': 'button.click',
					'data': [i,j],
					'event': e
				});
			};
		};
		
		
		view.intersections = state.board.map(function(row, i){
			return row.map(function(color, j){
				var x = settings.spacingX/2 + i*settings.spacingX;
				var y = settings.spacingY/2 + j*settings.spacingY;
				var stone  = new Stone(x, y,  color);
				stone.x = x;
				stone.y = y;
				stone.$events.sub(bindStoneClick(i,j));
				
				board.addChild(stone);
				return stone;
			});
		});

	};
	
	var init = function(state){
		var stage = new PIXI.Container();
		var $events = new Sob();
		
		var board = new PIXI.Sprite.fromImage('board.jpg');
		drawLines(board, state.lines - 1);
		
		fillBoard(board, state, $events);
		
		stage.addChild(board);
		view.stage = stage;
		view.$events = $events;
		updateSize(stage);
		
	};
	
	var updateBoard = function(state){
		state.board.forEach(function(row, i){
			row.forEach(function(color, j){
				view.intersections[i][j].setColor(color);
			});
		});
	};
	
	
	return $model.map(function(state){
		if(!view.stage)
			init(state);
		else
			updateBoard(state);
		console.log('k')
		return view;
	});
};