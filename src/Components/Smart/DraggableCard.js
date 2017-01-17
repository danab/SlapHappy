import React, {
	Component,
	PropTypes,
} from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { deckToFoundation, deckToPile } from '../../shared/actions/actions';
import canLift from '../../shared/utils/canLift';
import canMove from '../../shared/utils/canMovePile';

import Card from '../Dumb/Card';

const cardSource = {
	beginDrag( props ) {
		return { ...props };
	},
	canDrag(props) {
		return props.draggable;
	}
};

const collect = ( connect, monitor ) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

class DragCard extends Component {

	attemptLift() {

		const foundationIdx = this.props.foundation.findIndex( ( pile ) => {
			return canLift( pile, this.props.idx );
		});

		if ( foundationIdx !== -1 ) {
			this.props.deckToFoundation( this.props.idx, foundationIdx );
		}

	}

	attemptMove() {
		if ( !this.props.draggable ) { return false; }

		const { piles, idx, deckToPile } = this.props;

		const moveTo = canMove( piles, idx );

		if ( moveTo !== -1 ) {
			deckToPile( idx, moveTo );
		}

	}

	render() {
		const { idx, connectDragSource, isDragging } = this.props;

		return connectDragSource(
			<div className="draggable-card" onClick={ this.attemptMove.bind(this) } onDoubleClick={ this.attemptLift.bind(this) }>
				{ !isDragging ? <Card idx={ idx } /> : null }
			</div>
		);
	}
}

DragCard.propTypes = {
	draggable: PropTypes.bool.isRequired,
	idx: PropTypes.number.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	deckToFoundation: PropTypes.func.isRequired,
	deckToPile: PropTypes.func.isRequired,
	foundation: PropTypes.instanceOf( List ),
	piles: PropTypes.instanceOf( List ),
	isDragging: PropTypes.bool
};


const DraggableCard = DragSource( 'CARD', cardSource, collect )( DragCard );
const ConnectedDraggableCard = connect( ( { foundation, games } ) => ( { foundation, piles: games.getIn( [ '0', 'piles' ] ) } ), { deckToFoundation, deckToPile })( DraggableCard );

export default ConnectedDraggableCard;

