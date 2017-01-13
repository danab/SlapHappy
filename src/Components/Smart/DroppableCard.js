import React, {
	Component,
	PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { DropTarget } from 'react-dnd';

import { deckToPile, pileToPile, pileToFoundation } from '../../shared/actions/actions';
import { ItemTypes } from '../../shared/utils/constants';
import canDrop from '../../shared/utils/canDropPile';
import canLift from '../../shared/utils/canLift';
import Card from '../Dumb/Card';

const cardTarget = {
	drop( props, monitor ) {
		const type = monitor.getItemType();
		const item = monitor.getItem();

		if ( type === ItemTypes.CARD_PILE ) {
			props.pileToPile( item.pile, props.pileIdx, item.pileIdx );
		} else if ( type === ItemTypes.CARD ) {
			props.deckToPile( item.idx, props.pileIdx );
		}
	},
	canDrop: canDrop
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

// droppable cards also can be lifted to the foundation, so add some doubleclick options...
class DropCard extends Component {

	attemptLift() {
		const foundationIdx = this.props.foundation.findIndex( ( pile ) => {
			return canLift( pile, this.props.idx );
		});
		
		if ( foundationIdx !== -1 ) {
			this.props.pileToFoundation( this.props.idx, foundationIdx, this.props.pileIdx );
		}

	}

	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div onDoubleClick={ this.attemptLift.bind(this) } className="droppable-card">
				<Card idx={ this.props.idx } />
			</div>
		);
	}
}

DropCard.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	deckToPile: PropTypes.func.isRequired,
	foundation: PropTypes.instanceOf( List ),
	idx: PropTypes.number.isRequired,
	pileToFoundation: PropTypes.func.isRequired,
	pileToPile: PropTypes.func.isRequired,
	pileIdx: PropTypes.number.isRequired
};

const DroppableCard = DropTarget( [ ItemTypes.CARD, ItemTypes.CARD_PILE ], cardTarget, collect )( DropCard );

const ConnectedDroppableCard = connect( ( { foundation } ) => ( { foundation } ), { pileToFoundation, pileToPile, deckToPile })( DroppableCard );

export default ConnectedDroppableCard;
