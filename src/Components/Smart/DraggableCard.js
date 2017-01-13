import React, {
	Component,
	PropTypes,
} from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { deckToFoundation } from '../../shared/actions/actions';
import canLift from '../../shared/utils/canLift';

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

	render() {
		const { idx, connectDragSource, isDragging } = this.props;

		return connectDragSource(
			<div className="draggable-card" onDoubleClick={ this.attemptLift.bind(this) }>
				{ !isDragging ? <Card idx={ idx } /> : null }
			</div>
		);
	}
}

DragCard.propTypes = {
	idx: PropTypes.number.isRequired,
	// can't mark this as required...presumably because it's connected to a different component...
	// which begs the question, are we more worried about eslint or react doing it's job...hmm..
	connectDragSource: PropTypes.func,
	deckToFoundation: PropTypes.func,
	foundation: PropTypes.instanceOf( List ),
	isDragging: PropTypes.bool
};


const DraggableCard = DragSource( 'CARD', cardSource, collect )( DragCard );
const ConnectedDraggableCard = connect( ( { foundation } ) => ( { foundation } ), { deckToFoundation })( DraggableCard );

export default ConnectedDraggableCard;

