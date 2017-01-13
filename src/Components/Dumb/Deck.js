import React, {
	Component,
	PropTypes,
} from 'react';

import DeckPile from './DeckPile';

class Deck extends Component {

	deal() {
		if ( this.props.dumb ) { return; }
		if ( this.props.deck.get('down').size ) {
			this.props.dealCards();
		} else {
			this.props.flipDeck();
		}
	}

	render() {
		const downDeck = this.props.deck.get('down');
		const topDeckClassName = (downDeck.size) ? 'deck-card back-of-card' : 'deck-card empty-deck';
		return (
			<div className="deck">
				<div>
					<div onClick={ this.deal.bind( this ) } className={ topDeckClassName }>&nbsp;</div>
				</div>
				<DeckPile pile={ this.props.deck.get('up') } dumb={ this.props.dumb } />
			</div>
		);
	}
}

Deck.propTypes = {
	dealCards: PropTypes.func,
	deck: PropTypes.object.isRequired,
	dumb: PropTypes.bool,
	flipDeck: PropTypes.func
};

export default Deck;
