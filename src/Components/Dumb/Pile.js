import React, {
	Component,
	PropTypes,
} from 'react';
import { List } from 'immutable';

import CardPile from '../Smart/CardPile';
import DumbCardPile from './DumbCardPile';
import EmptyPile from '../Smart/EmptyPile';

class Pile extends Component {

	render() {
		const { idx, pile, piles, dumb } = this.props;

		const outOfDown = pile.get('down').size === 0;
		const outOfUp = pile.get('up').size === 0;
		
		if ( outOfDown && outOfUp ) {
			return <EmptyPile idx={ idx } />;
		}
		
		const upClass = ( outOfDown ) ? 'up-cards no-down' : 'up-cards';
		return (
			<div className="pile">
				{ pile.get('down').map( (card) => {
					return <div key={ `down-${card}` } className="deck-card back-of-card pile-card-down">&nbsp;</div>;
				})
				}
				<div className={ upClass }>
					{ pile.get('up').size ?
						( dumb ) ?
							<DumbCardPile pile={ pile.get('up') } idx={ idx } />
							:
							<CardPile pile={ pile.get('up') } piles={ piles } idx={ idx } />
						:
						null
					}
				</div>
			</div>
		);
	}
}

Pile.propTypes = {
	dumb: PropTypes.bool,
	idx: PropTypes.number.isRequired,
	pile: PropTypes.object.isRequired,
	piles: PropTypes.instanceOf( List ).isRequired
};

export default Pile;
