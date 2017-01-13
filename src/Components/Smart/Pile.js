import React, {
	Component,
	PropTypes,
} from 'react';
import { connect } from 'react-redux';

import { flipCardPile } from '../../shared/actions/actions';

import CardPile from './CardPile';
import DumbCardPile from '../Dumb/DumbCardPile';
import EmptyPile from './EmptyPile';

class Pile extends Component {

	attemptFlipCard() {
		const { pile, idx, flipCardPile, dumb } = this.props;

		if ( dumb ) { return; }

		if ( pile.get('up').size === 0 ) {
			flipCardPile( idx );
		}
	}

	render() {
		const { idx, pile, dumb } = this.props;

		const outOfDown = pile.get('down').size === 0;
		const outOfUp = pile.get('up').size === 0;
		
		if ( outOfDown && outOfUp ) {
			return <EmptyPile idx={ idx } />;
		}
		
		const upClass = ( outOfDown ) ? 'up-cards no-down' : 'up-cards';
		return (
			<div className="pile">
				{ pile.get('down').map( (card) => {
					return <div onClick={ this.attemptFlipCard.bind( this )} key={ `down-${card}` } className="deck-card back-of-card pile-card-down">&nbsp;</div>;
				})
				}
				<div className={ upClass }>
					{ pile.get('up').size ?
						( dumb ) ?
							<DumbCardPile pile={ pile.get('up') } idx={ idx } />
							:
							<CardPile pile={ pile.get('up') } idx={ idx } />
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
	flipCardPile: PropTypes.func.isRequired,
	idx: PropTypes.number.isRequired,
	pile: PropTypes.object.isRequired
};

export default connect( null, { flipCardPile } )( Pile );
