import {
	DECK_TO_FOUNDATION,
	PILE_TO_FOUNDATION, 
	PILE_TO_PILE,
	DECK_TO_PILE,
	DEAL_CARDS,
	FLIP_DECK,
	LOOK_FOR_NEW_GAME
} from './types';

export const deckToFoundation = ( card, foundationIdx ) => {
	return {
		self: true,
		type: DECK_TO_FOUNDATION,
		payload: {
			card, foundationIdx
		}
	};
};

export const pileToFoundation = ( card, foundationIdx, pileIdx ) => {
	return {
		self: true,
		type: PILE_TO_FOUNDATION,
		payload: { card, foundationIdx, pileIdx }
	};
};

export const pileToPile = ( draggedPile, newPileIdx, oldPileIdx ) => {
	return {
		self: true,
		type: PILE_TO_PILE,
		payload: { draggedPile: draggedPile.toJS(), newPileIdx, oldPileIdx }
	};
};

export const deckToPile = ( card, pileIdx ) => {
	return {
		self: true,
		type: DECK_TO_PILE,
		payload: { card, pileIdx }
	};
};

export const dealCards = () => {
	return {
		self: true,
		type: DEAL_CARDS
	};
};

export const flipDeck = () => {
	return {
		self: true,
		type: FLIP_DECK
	};
};

export const lookForNewGame = () => {
	return {
		self: true,
		type: LOOK_FOR_NEW_GAME
	};
};
