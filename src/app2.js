window. Sob = require('sob');

var model = require('./model.js');
var view = require('./view.js');
var intent = require('./intent.js');

var RAF = new Sob(function(next){
	var cb = function(){
		next();
		requestAnimationFrame(cb);
	};
	requestAnimationFrame(cb);
});


module.exports = function(document){
	
	var loaded = Sob.fromDOMEvent(document, 'DOMContentLoaded');
	
	var user = new Sob();
	var events = user.merge(loaded);
	
	var cycle = view(model(intent(events)));
	
	cycle.first().sub(
		function(view){
			console.log('create')
			var stage = view.stage;
			view.$events.sub(function(){
				var args = Array.prototype.slice.call(arguments);
				user.next.apply(user, args)
			});
			
			var canvas = document.createElement('canvas');
			document.body.appendChild(canvas);
			
			window.renderer = PIXI.autoDetectRenderer(stage.width, stage.height, {view: canvas, antialias: true});
			RAF.sub(function(){
				renderer.render(stage);
			});
		}
	);
	
	
	
	
	
};