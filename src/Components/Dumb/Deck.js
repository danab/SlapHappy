import React, {
	Component,
	PropTypes,
} from 'react';

import DeckPile from './DeckPile';

class Deck extends Component {

	deal() {
		if ( this.props.deck.get('down').size ) {
			this.props.dispatch( { type: 'DEAL_CARDS' } );
		} else {
			this.props.dispatch( { type: 'FLIP_DECK' } );
		}
	}

	render() {
		const downDeck = this.props.deck.get('down');
		const topDeckClassName = (downDeck.size) ? 'deck-card back-of-card' : 'deck-card empty-deck';
		return (
			<div id="deck">
				<div>
					<div onClick={ this.deal.bind( this ) } className={ topDeckClassName }>&nbsp;</div>
				</div>
				<DeckPile pile={ this.props.deck.get('up') } />
			</div>
		);
	}
}

Deck.propTypes = {
	deck: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

export default Deck;
