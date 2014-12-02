var config = {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
	attributeOldValue: true,
	characterDataOldValue: true
};

// inspired by http://jsfiddle.net/TjXEG/900/
function getCaretPosition( el ) {
	var sel = document.getSelection();

	if ( !sel || !sel.rangeCount ) {
		return 0;
	}

	var range = sel.getRangeAt( 0 ),
		clone = range.cloneRange();

	clone.selectNodeContents( el );
	clone.setEnd( range.endContainer, range.endOffset );

	return clone.toString().length;
}

function Observer( el ) {
	this.el = el;
	this.mo = new MutationObserver( this.handleMutations.bind( this ) );
	this.mo.observe( this.el, config );
	this.locked = false;
}

Observer.prototype = {
	handleMutations: function( mutations ) {
		if ( this.locked ) {
			this.locked = false;
			return;
		}

		mutations.forEach( function( mutation ) {
			console.log( mutation.type, mutation );
		} );
	},

	lock: function() {
		this.locked = true;
	},

	unlock: function() {
		this.locked = false;
	}
};

module.exports = Observer;