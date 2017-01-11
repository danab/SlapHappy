import { ItemTypes } from '../utils/constants';
import canLift from './canLift';

const canDrop = ( props, monitor ) => {
	const foundationPile = props.pile;
	let cardIdx;
	if ( monitor.getItemType() === ItemTypes.CARD_PILE ) {

		const draggedPile = monitor.getItem().pile;

		// can only drag a card at a time.
		if ( draggedPile.size !== 1 ) { return false; }

		cardIdx = draggedPile.last();

	} else if ( monitor.getItemType() === ItemTypes.CARD ) {
		cardIdx = monitor.getItem().idx;
	}

	return canLift( foundationPile, cardIdx );
};

export default canDrop;