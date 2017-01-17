import { ItemTypes } from './constants';

const isDroppable = ( topCardVal, targetCardVal ) => {
	const suitA = Math.floor( topCardVal / 13 );
	const suitB = Math.floor( targetCardVal / 13 );

	const valA = topCardVal % 13;
	const valB = targetCardVal % 13;

	const oppositeSuits = ( suitA + suitB ) % 2;
	const oneLess = valA + 1 === valB;

	return oppositeSuits && oneLess;
};

export { isDroppable };

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

	return isDroppable( topCardIdx, targetCardIdx );
};

export default canDrop;
