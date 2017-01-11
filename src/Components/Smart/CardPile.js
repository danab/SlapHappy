import React, {
	PropTypes,
} from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../utils/constants';
import Card from '../Dumb/Card';
import DroppableCard from '../Smart/DroppableCard';

const cardSource = {
	beginDrag( { pile, idx } ) {
		return { pile, pileIdx: idx };
	}
};

const collect = ( connect, monitor ) => {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
};

const CardPile = ( { connectDragSource, isDragging, pile, idx } ) => {
	const subPiles = ( pile.shift().size ) ? <DraggablePile pile={ pile.shift() } idx={ idx } /> : null;
	return connectDragSource(
		<div className="card-pile">
			<div style={{ display: isDragging ? 'none' : 'block' }}>
				{ ( pile.size === 1 ) ? <DroppableCard pileIdx={ idx } idx={ pile.first() }/> :
					<Card idx={ pile.first() }/> }
				{ subPiles }
			</div>
		</div>
	);
};

CardPile.propTypes = {
	pile: PropTypes.object.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

const DraggablePile = DragSource( ItemTypes.CARD_PILE, cardSource, collect )(CardPile);

export default DraggablePile;
