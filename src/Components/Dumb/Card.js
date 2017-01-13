import React, { PropTypes } from 'react';
import getProps from '../../shared/utils/getCardProps';


const Card = ( { idx } ) => {
	const { num, suit, color } = getProps( idx );
	return (
		<div style={ {color} } className="card deck-card">
			<div className="upper-suit">
				{ num + suit }
			</div>
			<div className="big-val"> { suit } </div>
		</div>
	);	
};

Card.propTypes = {
	idx: PropTypes.number.isRequired
};

export default Card;