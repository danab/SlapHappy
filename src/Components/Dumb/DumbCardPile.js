import React, {
	PropTypes,
} from 'react';

import Card from './Card';

const CardPile = ( { pile } ) => {
	const subPiles = ( pile.shift().size ) ? <CardPile pile={ pile.shift() } /> : null;
	return (
		<div className="card-pile">
			<Card idx={ pile.first() } />
			{ subPiles }
		</div>
	);
};

CardPile.propTypes = {
	pile: PropTypes.object.isRequired
};

export default CardPile;
