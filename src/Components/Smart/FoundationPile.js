import React, {
	Component,
	PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import Card from '../Dumb/Card';
import { ItemTypes } from '../../utils/constants';
import canDropFoundation from '../../utils/canDropFoundation';
import { deckToFoundation, pileToFoundation } from '../../actions/actions';

const pileTarget = {
	drop( props, monitor ) {
		const type = monitor.getItemType();
		const foundationIdx = props.idx;

		if ( type === ItemTypes.CARD_PILE ) {
			const { pile, pileIdx } = monitor.getItem();
			const card = pile.last();
			props.pileToFoundation( card, foundationIdx, pileIdx );
		} else if ( type === ItemTypes.CARD ) {
			props.deckToFoundation( monitor.getItem().idx, foundationIdx );
		}

	},
	canDrop: canDropFoundation
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

class FoundationPile extends Component {
	render() {
		const { connectDropTarget, pile } = this.props;
		return connectDropTarget(
			<div className="foundation-pile">
				{
					( pile.size ) ?
						<Card idx={ pile.last() } />
						:
						<div className="card deck-card empty"></div>
				}
			</div>
		);
	}
}

FoundationPile.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	pile: PropTypes.object.isRequired
};

const DroppableFoundationPile = DropTarget( [ItemTypes.CARD_PILE, ItemTypes.CARD], pileTarget, collect )( FoundationPile );// Ugh. Double up...seems a bad idea

// This seems like a bad idea doing two partial application thingys in once, must be in this order
const ConnectedDroppableFoundationPile = connect( null, { deckToFoundation, pileToFoundation } )( DroppableFoundationPile );

export default ConnectedDroppableFoundationPile;
