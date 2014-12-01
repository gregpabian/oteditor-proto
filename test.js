var $ = document.querySelector.bind( document ),
	textarea = $( '#ta' ),
	input = $( '#in' ),
	div = $( '#div' );


var observer = new MutationObserver( function( mutations ) {
	mutations.forEach( function( mutation ) {
		console.log( mutation );
	} );
} );

var config = {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
	attributeOldValue: true,
	characterDataOldValue: true,
	attributeFilter: true
};

observer.observe( textarea, config );
observer.observe( input, config );
observer.observe( div, config );

// var delta = new Delta( [ {
// 	insert: 'Gandalf',
// 	attributes: {
// 		bold: true
// 	}
// }, {
// 	insert: ' the '
// }, {
// 	insert: 'Grey',
// 	attributes: {
// 		color: '#ccc'
// 	}
// } ] );

// var death = new Delta()
// 	.retain( 4, {
// 		color: '#f00'
// 	} )
// 	.retain( 8 )
// 	.delete( 4 )
// 	.insert( 'White', {
// 		color: '#fff'
// 	} );

// delta.compose( death );

// console.log( delta );