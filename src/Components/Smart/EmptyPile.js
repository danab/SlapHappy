import React, {
	Component,
	PropTypes,
} from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { ItemTypes } from '../../utils/constants';
import { deckToPile, pileToPile } from '../../actions/actions';

const pileTarget = {
	drop( props, monitor ) {
		const item = monitor.getItem();
		const type = monitor.getItemType();
		if ( type === ItemTypes.CARD_PILE ) {
			const pile = item.pile;
			const newPileIdx = props.idx;
			const oldPileIdx = item.pileIdx;

			props.pileToPile( pile, newPileIdx, oldPileIdx );
		} else if ( type === ItemTypes.CARD ) {
			props.deckToPile( item.idx, props.idx );
		}
	},
	canDrop: ( props, monitor ) => {
		const item = monitor.getItem();
		const type = monitor.getItemType();
		let card;
		if ( type === ItemTypes.CARD_PILE ) {
			card = item.pile.first();
		} else if ( type === ItemTypes.CARD ) {
			card = item.idx;
		}

		// gotta be a king
		return card % 13 === 12;
	}
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};
class EmptyPile extends Component {
	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div className="pile">
				<div className="card deck-card empty"></div>
			</div>
		);
	}
}

EmptyPile.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	idx: PropTypes.number.isRequired
};

const DroppableEmptyPile = DropTarget( [ ItemTypes.CARD, ItemTypes.CARD_PILE ], pileTarget, collect )( EmptyPile );
const ConnectedDroppableEmptyPile = connect( null, { pileToPile, deckToPile } )( DroppableEmptyPile );

export default ConnectedDroppableEmptyPile;
