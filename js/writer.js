function Writer( target ) {
	this.target = target;
}

Writer.prototype = {
	write: function( delta ) {
		var elements = [ this.target ];

		delta.ops.forEach( function( op ) {
			var attr,
				elem;

			if ( !op.insert ) {
				return;
			}

			// block element
			if ( op.insert === 1 ) {
				if ( !( attr = op.attributes ) ) {
					return;
				}

				// open tag
				if ( attr.open ) {
					elem = document.createElement( attr.tag );

					elements[ 0 ].appendChild( elem );
					elements.unshift( elem );
				}

				// close tag
				if ( attr.close ) {
					elements.shift();

					if ( !elements.length ) {
						elements.push( this.target );
					}
				}
				// custom element
			} else if ( op.insert === 2 ) {
				// NOP
				// text
			} else {
				// formatted text
				if ( ( attr = op.attributes ) ) {
					if ( attr.bold ) {
						elem = document.createElement( 'b' );
					} else if ( attr.italic ) {
						elem = document.createElement( 'i' );
					} else {
						elem = document.createElement( 'span' );
					}

					// TODO apply other attributes

					elem.textContent = op.insert;
					// plain text
				} else {
					elem = document.createTextNode( op.insert );
				}

				elements[ 0 ].appendChild( elem );
			}
		}, this );
	}
};

module.exports = Writer;