import { List, Map, fromJS } from 'immutable';

const shuffledDeck = () => {
	let deck = [];
	for( var i = 0; i < 52; i++ ) {
		deck.push( i );
	}

	// fischer-yates...clever (the second algorithm would have been fine performance-wise...but why not
	// https://bost.ocks.org/mike/shuffle/

	var m = 52, t, j;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		j = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = deck[m];
		deck[m] = deck[j];
		deck[j] = t;
	}

	return fromJS( deck );
};

const createPiles = ( cards ) => {
	let piles = [];
	// this ain't very immutable.
	let remaining = cards;
	for( var i = 0; i < 7; i++ ) {
		piles.push({ down: [] });
		for( var j = i; j > 0; j-- ) {
			piles[i].down.push( remaining.last() );
			remaining = remaining.pop();
		}
		piles[i].up = [ remaining.last() ];
		remaining = remaining.pop();
	}

	// piles[0].up = [ 12, 24, 10, 22 ];
	return fromJS( piles );
};

export const createGame = () => {

	const fullDeck = shuffledDeck();
// we will deal the first 28 cards, so grab the last 24...
	const startingDeck = fullDeck.slice( 28 );
	const deck = Map( { down: startingDeck, up: fromJS([]) } );

	const piles = createPiles( fullDeck.slice( 0, 28) );

	return Map( {deck, piles } );
};

export const foundation = fromJS( [ [], [], [], [], [], [], [], [] ] );

export default {
	games: List.of( createGame(), createGame() ),
	foundation,
	user: {}
};
