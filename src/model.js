var Sob = require('sob');
var settings = require('./game-settings.js');

module.exports = function($intent){
	
	var state = {
		//board: [[0,1,2 ...], ...]
		//boardNumbers: [[0,1,2 ...], ...]
		//move: Number 
		//moves: [[x,y], ...]
		//turn: Number 0 - pause, 1 - black, 2 - white
		//players [{captures: Number}, {...}]
	};
	
	var ctrl = {
		init: function(){
			state.lines = settings.lines;
			state.move = settings.firstMove;
			state.turn = settings.firstTurn;
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
			state.boardNumbers = board.map(function(x){return x.slice()});
			
			ctrl.createBoard();
		},
		createBoard: function(random){
			for(var i = 0; i < state.lines; i++){
				for(var j = 0; j < state.lines; j++){
					state.board[i][j] = random ? Math.round(Math.random()*100000)%3 : 0;
				}
			}
		},
		reset: function(data){
			init();
			for(var i = 0; i < state.lines; i++){
				for(var j = 0; j < state.lines; j++){
					state.board[i][j] = data.board[i][j];
				}
			}
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
			if(ctrl.isPossibleMove(x, y, state.turn)){
				state.board[x][y] = state.turn;
				state.boardNumbers[x][y] = state.move;
				state.move ++;
				ctrl.switchTurn();
			}
		},
		isPossibleMove: function(x, y, player){
			return !state.board[x][y];
		},
		groupStones: function(){
			var b = v.state.board;
		}
	};
	
	
	
	return $intent.map(function(action){
		ctrl[action.name](action.data);
		return state;
	});
};