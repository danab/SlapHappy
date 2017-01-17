import { isDroppable } from './canDropPile';

// this is very similar to canDropPile.js, and should probably be refactored to allow both.
const canMove = ( piles, topCard, pileIdx ) => {

	return piles.findIndex( ( pile, idx ) => {
		// can't move to own pile
		if ( idx === pileIdx ) { return false; }

		// kings can only be moved to empty piles
		if ( pile.get('up').size === 0 ) {
			return topCard % 13 === 12;
		}

		const bottomCard = pile.get('up').last();

		// can we drop a pile on a pile?
		return isDroppable( topCard, bottomCard );
	});

};

export default canMove;
