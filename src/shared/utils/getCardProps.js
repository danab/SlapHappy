const suits = [ '♣', '♦', '♠','♥' ];
const nums = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];

const getProps = ( idx ) => {
	const suit = suits[ Math.floor( idx / 13 ) ];	
	const num = nums[ idx % 13 ];
	const color = ( Math.floor( idx / 13 ) % 2 ) ? 'red' : 'black';
	
	return { num, suit, color };
};

export default getProps;