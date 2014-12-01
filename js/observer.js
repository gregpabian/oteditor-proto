var config = {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
	attributeOldValue: true,
	characterDataOldValue: true
};

// inspired by http://jsfiddle.net/TjXEG/900/
function getCaretPosition( elem ) {
	var sel = document.getSelection();

	if ( !sel || !sel.rangeCount ) {
		return 0;
	}

	var range = sel.getRangeAt( 0 ),
		clone = range.cloneRange();

	clone.selectNodeContents( elem );
	clone.setEnd( range.endContainer, range.endOffset );

	return clone.toString().length;
}

function Observer( target ) {
	this.target = target;
	this.mo = new MutationObserver( this.handleMutations );
	this.mo.observe( this.target, config );
}

Observer.prototype = {
	handleMutations: function( mutations ) {
		mutations.forEach( function( mutation ) {
			console.log( mutation.type, mutation );
		} );
	}
};

module.exports = Observer;