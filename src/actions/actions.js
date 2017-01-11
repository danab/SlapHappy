import { FLIP_CARD_PILE, DECK_TO_FOUNDATION, PILE_TO_FOUNDATION, PILE_TO_PILE, DECK_TO_PILE } from './types';

export const flipCardPile = ( pileIdx ) => {
	return {
		type: FLIP_CARD_PILE,
		payload: { pileIdx }
	};
};

export const deckToFoundation = ( card, foundationIdx ) => {
	return {
		type: DECK_TO_FOUNDATION,
		payload: {
			card, foundationIdx
		}
	};
};

export const pileToFoundation = ( card, foundationIdx, pileIdx ) => {
	return {
		type: PILE_TO_FOUNDATION,
		payload: { card, foundationIdx, pileIdx }
	};
};

export const pileToPile = ( draggedPile, newPileIdx, oldPileIdx ) => {
	return {
		type: PILE_TO_PILE,
		payload: { draggedPile, newPileIdx, oldPileIdx }
	};
};

export const deckToPile = ( card, pileIdx ) => {
	return {
		type: DECK_TO_PILE,
		payload: { card, pileIdx }
	};
};
