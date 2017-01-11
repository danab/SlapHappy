import { ItemTypes } from '../utils/constants';

const canDrop = ( props, monitor ) => {
	let topCardIdx;
	let targetCardIdx;
	if ( monitor.getItemType() === ItemTypes.CARD_PILE ) {
		const draggedPile = monitor.getItem().pile;
		topCardIdx = draggedPile.first();
		targetCardIdx = props.idx;
	} else {
		topCardIdx = monitor.getItem().idx;
		targetCardIdx = props.idx;
	}

	const suitA = Math.floor( topCardIdx / 13 );
	const suitB = Math.floor( targetCardIdx / 13 );

	const valA = topCardIdx % 13;
	const valB = targetCardIdx % 13;

	const oppositeSuits = ( suitA + suitB ) % 2;
	const oneLess = valA + 1 === valB;

	return oppositeSuits && oneLess;
};

export default canDrop;
