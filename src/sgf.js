module.exports = function( sgf_data ) {
	var alpStart= 'a'.charCodeAt(0)
	
  var sgf = sgf_data.split(';');
  
  // INITIAL
  var initial = '{"'
      + sgf[1].replace( /\[/g, '":"' )
          .replace( /\](\n)?/g, '","' )
      + 'TR":"goban.fr"}';

  // TURNS
  // var turns = '{"turns":['
  //     + sgf.slice(2)
  //         .join( ', ' )
  //         .replace( /[A-Z\n\)]/g, '' )
  //         .replace( /[\[\]]/g, '"' )
  //     + ']}';
	var turns = sgf.slice(2).map(function(x){
			var str = x.match(/\[(.*?)\]/)[1];
			return [str.charCodeAt(0) - alpStart, str.charCodeAt(1) - alpStart];
		});
	return {
		// initial: JSON.parse(initial),
		turns: turns
	};
};