var Sob = require('sob');

module.exports = function($user){
	
	var actions = {
		'DOMContentLoaded': function(e){
			return {
				name: 'init'
			};
		},
		'button.click': function(e){
			return {
				'name': 'move',
				'data': e.data
			};
		}
	};
	
	
	
	
	return $user.map(function(event){
		return actions[event.type](event);
	});
};