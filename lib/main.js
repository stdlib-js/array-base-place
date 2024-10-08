/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isComplexDataType = require( '@stdlib/array-base-assert-is-complex-floating-point-data-type' );
var isBooleanDataType = require( '@stdlib/array-base-assert-is-boolean-data-type' );
var arraylike2object = require( '@stdlib/array-base-arraylike2object' );
var reinterpretComplex = require( '@stdlib/strided-base-reinterpret-complex' );
var reinterpretBoolean = require( '@stdlib/strided-base-reinterpret-boolean' );
var countTruthy = require( '@stdlib/array-base-count-truthy' );


// FUNCTIONS //

/**
* Replaces elements in an indexed array with provided values.
*
* @private
* @param {Collection} x - input array
* @param {Collection} mask - mask array
* @param {Collection} values - values to set
* @returns {Collection} input array
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 0, 1, 1, 0 ];
* var values = [ 20, 30 ];
*
* var out = indexed( x, mask, values );
* // returns [ 1, 20, 30, 4 ]
*/
function indexed( x, mask, values ) {
	var iv;
	var N;
	var i;

	N = values.length;
	iv = 0;
	for ( i = 0; i < x.length; i++ ) {
		if ( mask[ i ] ) {
			x[ i ] = values[ iv ];
			iv = ( iv+1 ) % N;
		}
	}
	return x;
}

/**
* Replaces elements of an accessor array with provided values.
*
* @private
* @param {Object} x - input array object
* @param {Object} mask - mask array object
* @param {Object} values - values object
* @returns {Collection} input array
*
* @example
* var toAccessorArray = require( '@stdlib/array-base-to-accessor-array' );
* var arraylike2object = require( '@stdlib/array-base-arraylike2object' );
*
* var x = toAccessorArray( [ 1, 2, 3, 4 ] );
*
* var mask = toAccessorArray( [ 0, 1, 1, 0 ] );
* var values = toAccessorArray( [ 20, 30 ] );
*
* var out = accessors( arraylike2object( x ), arraylike2object( mask ), arraylike2object( values ) );
*
* var v = x.get( 0 );
* // returns 1
*
* v = x.get( 1 );
* // returns 20
*/
function accessors( x, mask, values ) {
	var xdata;
	var mdata;
	var vdata;
	var xset;
	var mget;
	var vget;
	var iv;
	var N;
	var i;

	xdata = x.data;
	mdata = mask.data;
	vdata = values.data;

	xset = x.accessors[ 1 ];
	mget = mask.accessors[ 0 ];
	vget = values.accessors[ 0 ];

	N = vdata.length;
	iv = 0;
	for ( i = 0; i < xdata.length; i++ ) {
		if ( mget( mdata, i ) ) {
			xset( xdata, i, vget( vdata, iv ) );
			iv = ( iv+1 ) % N;
		}
	}
	return xdata;
}

/**
* Replaces elements in a complex array with provided values.
*
* @private
* @param {Collection} x - real-valued floating-point input array view
* @param {Object} mask - mask array object
* @param {Collection} values - real-valued floating-point values array view
* @returns {Collection} input array view
*
* @example
* var Float64Array = require( '@stdlib/array-float64' );
* var arraylike2object = require( '@stdlib/array-base-arraylike2object' );
*
* var x = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] );
*
* var mask = [ 1, 0, 1, 0 ];
* var values = new Float64Array( [ 10.0, 20.0, 50.0, 60.0 ] );
*
* var out = complex( x, arraylike2object( mask ), values );
* // returns <Float64Array>[ 10.0, 20.0, 3.0, 4.0, 50.0, 60.0, 7.0, 8.0 ]
*/
function complex( x, mask, values ) {
	var mdata;
	var mget;
	var iv;
	var N;
	var i;

	mdata = mask.data;
	mget = mask.accessors[ 0 ];

	N = values.length;
	iv = 0;
	for ( i = 0; i < x.length; i += 2 ) {
		if ( mget( mdata, i/2 ) ) {
			x[ i ] = values[ iv ];
			x[ i+1 ] = values[ iv+1 ];
			iv = ( iv+2 ) % N;
		}
	}
	return x;
}

/**
* Replaces elements in a boolean array with provided values.
*
* @private
* @param {Uint8Array} x - input array
* @param {Object} mask - mask array object
* @param {Uint8Array} values - values to set
* @returns {Uint8Array} input array
*
* @example
* var arraylike2object = require( '@stdlib/array-base-arraylike2object' );
* var Uint8Array = require( '@stdlib/array-uint8' );
*
* var x = new Uint8Array( [ 0, 1, 1, 0 ] );
*
* var mask = [ 1, 0, 0, 1 ];
* var values = new Uint8Array( [ 1, 1 ] );
*
* var out = boolean( x, arraylike2object( mask ), values );
* // returns <Uint8Array>[ 1, 1, 1, 1 ]
*/
function boolean( x, mask, values ) {
	var mdata;
	var mget;
	var iv;
	var N;
	var i;

	mdata = mask.data;
	mget = mask.accessors[ 0 ];

	N = values.length;
	iv = 0;
	for ( i = 0; i < x.length; i++ ) {
		if ( mget( mdata, i ) ) {
			x[ i ] = values[ iv ];
			iv = ( i+1 ) % N;
		}
	}
	return x;
}


// MAIN //

/**
* Replaces elements of an array with provided values according to a provided mask array.
*
* @param {Collection} x - input array
* @param {Collection} mask - mask array
* @param {Collection} values - values to set
* @param {string} mode - string specifying behavior when the number of values does not equal the number of truthy mask values
* @throws {Error} insufficient values to satisfy mask array
* @throws {Error} number of values does not equal the number of truthy mask values
* @returns {Collection} input array
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 0, 1, 1, 0 ];
* var values = [ 20, 30 ];
*
* var out = place( x, mask, values, 'strict' );
* // returns [ 1, 20, 30, 4 ]
*
* var bool = ( out === x );
* // returns true
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 0, 1, 1, 0 ];
* var values = [ 30 ];
*
* var out = place( x, mask, values, 'strict_broadcast' );
* // returns [ 1, 30, 30, 4 ]
*
* var bool = ( out === x );
* // returns true
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 1, 1, 0, 1 ];
* var values = [ 20, 30 ];
*
* var out = place( x, mask, values, 'repeat' );
* // returns [ 20, 30, 3, 20 ]
*
* var bool = ( out === x );
* // returns true
*/
function place( x, mask, values, mode ) {
	var xo;
	var mo;
	var vo;
	var M;

	M = values.length;
	if ( mode === 'strict' ) {
		if ( countTruthy( mask ) !== M ) {
			throw new Error( 'invalid arguments. Number of values does not equal the number of truthy values in the mask array.' );
		}
	} else if ( mode === 'broadcast' ) {
		if ( M !== 1 && countTruthy( mask ) > M ) {
			throw new Error( 'invalid arguments. Insufficient values to satisfy mask array.' );
		}
	} else if ( mode === 'strict_broadcast' ) {
		if ( M !== 1 && countTruthy( mask ) !== M ) {
			throw new Error( 'invalid arguments. Number of values does not equal the number of truthy values in the mask array.' );
		}
	} else if ( mode === 'non_strict' ) {
		if ( countTruthy( mask ) > M ) {
			throw new Error( 'invalid arguments. Insufficient values to satisfy mask array.' );
		}
	}
	xo = arraylike2object( x );
	mo = arraylike2object( mask );
	vo = arraylike2object( values );
	if (
		xo.accessorProtocol ||
		mo.accessorProtocol ||
		vo.accessorProtocol
	) {
		// Note: we only explicitly support select dtype pairs, as this function should not be concerned with casting rules, etc. That is left to userland...
		if ( isComplexDataType( xo.dtype ) && isComplexDataType( vo.dtype ) ) {
			complex( reinterpretComplex( x, 0 ), mo, reinterpretComplex( values, 0 ) ); // eslint-disable-line max-len
			return x;
		}
		if ( isBooleanDataType( xo.dtype ) && isBooleanDataType( vo.dtype ) ) {
			boolean( reinterpretBoolean( x, 0 ), mo, reinterpretBoolean( values, 0 ) ); // eslint-disable-line max-len
			return x;
		}
		accessors( xo, mo, vo );
		return x;
	}
	indexed( x, mask, values );
	return x;
}


// EXPORTS //

module.exports = place;
