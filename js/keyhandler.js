var KEY_MAP = {
	ENTER: 13,
	Y: 89,
	Z: 90
};

function KeyHandler( target ) {
	this.target = target;
	this.handlers = {};
	this.attach();
}

KeyHandler.KEY_MAP = KEY_MAP;

KeyHandler.prototype = {
	handle: function( event ) {
		console.log( 'keydown', event.keyCode, 'ctrl:', event.ctrlKey );

		var handler = this.handlers[ ( event.ctrlKey ? 'CTRL+' : '' ) + event.keyCode ];

		if ( handler ) {
			handler( event );
		}
	},

	addHandler: function( key, handler ) {
		if ( key.indexOf( 'CTRL+' ) === 0 ) {
			key = 'CTRL+' + KEY_MAP[ key.replace( 'CTRL+', '' ) ];
		} else {
			key = KEY_MAP[ key ];
		}

		this.handlers[ key ] = handler;
	},

	attach: function() {
		this.target.addEventListener( 'keydown', this.handle.bind( this ), false );
	}
};

module.exports = KeyHandler;