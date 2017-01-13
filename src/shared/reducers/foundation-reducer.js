import { DECK_TO_FOUNDATION } from '../actions/types';

const foundation = ( state = [], action ) => {
	switch( action.type ) {
	case DECK_TO_FOUNDATION:
		{
			let {foundationIdx, card} = action.payload;
			return state
				.set(foundationIdx, state.get(foundationIdx).push(card));
		} case 'PILE_TO_FOUNDATION': {
			let { foundationIdx, card } = action.payload;
			return state.set( foundationIdx, state.get( foundationIdx ).push( card ) );
		}
	default:
		return state;
	}
};

export default foundation;