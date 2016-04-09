var parse_sgf = function( sgf_data ) {
  var sgf = sgf_data.split(';');
  
  // INITIAL
  var initial = '{"'
      + sgf[1].replace( /\[/g, '":"' )
          .replace( /\](\n)?/g, '","' )
      + 'TR":"goban.fr"}';
  alert( initial );


  // TURNS
  var turns = '{"turns":['
      + sgf.slice(2)
          .join( ', ' )
          .replace( /[A-Z\n\)]/g, '' )
          .replace( /[\[\]]/g, '"' )
      + ']}';
  alert( turns );
 
}