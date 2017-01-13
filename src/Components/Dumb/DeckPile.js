import React, {
	PropTypes,
} from 'react';

import DraggableCard from '../Smart/DraggableCard';
import Card from './Card';

const DeckPile = ( { pile, dumb } ) => {

	if ( !pile.size ) { return null; }
	const cards = pile.slice( -3 );
	return (
		<div className="active-pile">
			{ cards.map( (val,i) => {
				if ( dumb ) {
					return <div className="draggable-card"><Card key={ `card-${val}` } idx={ val } /></div>;
				} else {
					return <DraggableCard key={ `card-${val}` } idx={ val } draggable={ i + 1 === cards.size }  />;
				}
			})}
		</div>
	);
};

DeckPile.propTypes = {
	dumb: PropTypes.bool,
	pile: PropTypes.object.isRequired
};

export default DeckPile;
