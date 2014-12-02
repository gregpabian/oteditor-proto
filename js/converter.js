var Delta = require( 'rich-text' ).Delta,
	_ = require( 'lodash' ),
	Normalizer = require( './normalizer' );

var TAG_MAP = {
	'b': 'strong',
	'i': 'em'
};

var defaultTranslations = {
	'strong': {
		tag: false,
		bold: true
	},

	'em': {
		tag: false,
		italic: true
	}
};


// Available representations:

// as an operation:
// {
//     insert: 'Foo',
//     attributes: {
//         italic: true
//     }
// }

// as a clean HTML:
// <em>Foo</em>

// as a dirty HTML:
// <span style="font-style: italic">Foo</span>

function Converter() {
	this.e2o = {};
	this.o2e = {};
	this.e2d = {};
	this.d2e = {};

	this.translations = {};
	this.customTypes = {};
	this.customUID = 2;
}

Converter.prototype = {
	addTranslation: function( srcTag, attributes ) {
		this.translations[ srcTag ] = attributes;
	},

	// callback should return an Element
	registerCustomElement: function( callback ) {
		this.customTypes[ this.customUID ] = callback;

		return this.customUID++;
	},

	deltaToCleanDom: function( delta, el ) {
		var parent = el || document.createDocumentFragment();
	},

	deltaToDom: function( delta, el ) {
		var parent = el || document.createDocumentFragment(),
			elements = [ parent ];

		delta.ops.forEach( function( op ) {
			if ( !op.insert ) {
				return;
			}

			var attrs = op.attributes,
				elem;

			// an element
			if ( typeof op.insert == 'number' ) {
				// regular element
				if ( op.insert === 1 ) {
					if ( !attrs ) {
						return;
					}

					// open tag
					if ( attrs.open ) {
						elem = document.createElement( attrs.tag );

						elements[ 0 ].appendChild( elem );
						elements.unshift( elem );

						Object.keys( attrs )
							.filter( function( attr ) {
								return [ 'open', 'close', 'tag' ].indexOf( attr ) === -1;
							} )
							.forEach( function( attr ) {
								if ( attr in elem ) {
									elem[ attr ] = attrs[ attr ];
								} else {
									elem.setAttribute( attr, attrs[ attr ] );
								}
							} );
					}

					// close tag
					if ( attrs.close ) {
						elements.shift();

						if ( !elements.length ) {
							elements.push( parent );
						}
					}
					// custom element
				} else if ( this.customTypes[ op.insert ] ) {
					elem = this.customTypes[ op.insert ]( op.attributes );
					elements[ 0 ].appendChild( elem );
				} else {
					console.warn( 'Unknown element type' );
				}
				// a formatted text
			} else {
				if ( attrs ) {
					// TODO that's dumb - use transformation frunctions
					// TODO filter and apply other attributes
					if ( attrs.bold ) {
						elem = document.createElement( 'strong' );
					}
					if ( attrs.italic ) {
						elem = document.createElement( 'em' );
					} else {
						elem = document.createElement( 'span' );
					}


					elem.textContent = op.insert;
					// plain text
				} else {
					elem = document.createTextNode( op.insert );
				}

				elements[ 0 ].appendChild( elem );
			}
		} );

		return parent;
	},

	domToDelta: function( dom ) {
		var ops = [];

		var children = dom.childNodes;

		[].forEach.call( children, function( child ) {
			var tag;

			if ( child.nodeType === 1 ) {
				tag = child.tagName.toLowerCase();

				// use mapping value
				if ( TAG_MAP[ tag ] ) {
					tag = TAG_MAP[ tag ];
				}

				// translate
				if ( this.translations[ tag ] ) {
					// TODO do it better

					// ordinary element
				} else {
					// empty element
					if ( tag in Normalizer.EMPTY ) {
						ops.push( {
							insert: 1,
							attributes: {
								tag: tag,
								open: true,
								close: true
							}
						} );

						// not-empty element
					} else {
						// opening tag
						ops.push( {
							insert: 1,
							attributes: {
								tag: tag,
								open: true
							}
						} );

						// operations for child nodes
						if ( child.childNodes.length ) {
							ops = ops.concat( this.domToDelta( child ).ops );
						}

						// closing tag
						ops.push( {
							insert: 1,
							attributes: {
								tag: tag,
								close: true
							}
						} );
					}
				}
			} else if ( child.nodeType === 3 ) {
				ops.push( {
					insert: child.textContent
				} );
			}
		}, this );

		return new Delta( ops );
	}
};

module.exports = Converter;