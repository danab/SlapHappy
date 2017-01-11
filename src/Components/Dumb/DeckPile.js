import React, {
	PropTypes,
} from 'react';

// Is this a dumb component if it includes a "Smart Component"... I'm missing something here...
import DraggableCard from '../Smart/DraggableCard';

const DeckPile = ( { pile } ) => {

	if ( !pile.size ) { return null; }
	const cards = pile.slice( -3 );
	return (
		<div id="active-pile">
			{ cards.map( (val,i) => {
				return <DraggableCard key={ `card-${val}` } idx={ val } draggable={ i + 1 === cards.size }  />;
			})}
		</div>
	);
};

DeckPile.propTypes = {
	pile: PropTypes.object.isRequired
};

export default DeckPile;
