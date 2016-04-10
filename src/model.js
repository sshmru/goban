var Sob = require('sob');
var settings = require('./game-settings.js');

module.exports = function($intent){
	
	var state = {
		//board: [[0,1,2 ...], ...]
		//move: Number 
		//moves: [[x,y], ...]
		//turn: Number 0 - pause, 1 - black, 2 - white
		//players [{captures: Number}, {...}]
	};
	
	var ctrl = {
		init: function(){
			state.lines = settings.lines;
			state.move = settings.firstMove;
			state.turn = 1;
			state.players = [ctrl.createPlayer(), ctrl.createPlayer()];
			
			var l = state.lines;
			var board = [];
			for(var i = 0; i < l; i++){
				board[i] = [];
				for(var j = 0; j < l; j++){
					board[i][j] = 0;
				}
			}
			state.board = board;
			
			ctrl.randomBoard();
		},
		createPlayer: function(){
			return {
				captures: 0
			};
		},
		switchTurn: function(){
			state.turn = 1 + (state.turn) % 2;
		},
		move: function(point){
			var x = point[0];
			var y = point[1];
			console.log(point)
			if(ctrl.isPossibleMove(x, y, state.turn)){
				state.board[x][y] = state.turn;
				console.log(state.turn)
				ctrl.switchTurn();
			}
		},
		isPossibleMove: function(x, y, player){
			return !state.board[x][y];
		},
		randomBoard: function(){
			for(var i = 0; i < state.lines; i++){
				for(var j = 0; j < state.lines; j++){
					state.board[i][j] = 0//Math.round(Math.random()*100000)%3;
				}
			}
		}
	};
	
	
	
	return $intent.map(function(action){
		ctrl[action.name](action.data);
		return state;
	});
};