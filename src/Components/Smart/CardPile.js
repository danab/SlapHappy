import React, {
	Component,
	PropTypes,
} from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { ItemTypes } from '../../shared/utils/constants';
import canMove from '../../shared/utils/canMovePile';

import { pileToPile } from '../../shared/actions/actions';

import Card from '../Dumb/Card';
import DroppableCard from '../Smart/DroppableCard';


const cardSource = {
	beginDrag( { pile, idx } ) {
		return { pile, pileIdx: idx };
	}
};

const collect = ( connect, monitor ) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

class CardPile extends Component {
	attemptMove( e ) {
		e.stopPropagation();

		const { piles, pile, pileToPile, idx } = this.props;
		const moveTo = canMove( piles, pile.first(), idx );

		if ( moveTo !== -1 ) {
			pileToPile( pile, moveTo, idx );
		}

	}
	render() {
		const { connectDragSource, isDragging, pile, idx, piles } = this.props;
		const subPiles = ( pile.shift().size ) ? <ConnectedDraggablePile piles={ piles } pile={ pile.shift() } idx={ idx } /> : null;
		return connectDragSource(
			<div onClick={ this.attemptMove.bind(this) } className="card-pile">
				<div style={{ display: isDragging ? 'none' : 'block' }}>
					{ ( pile.size === 1 ) ? <DroppableCard pileIdx={ idx } idx={ pile.first() }/> :
						<Card idx={ pile.first() }/> }
					{ subPiles }
				</div>
			</div>
		);
	}
}

CardPile.propTypes = {
	idx: PropTypes.number.isRequired,
	isDragging: PropTypes.bool,
	pile: PropTypes.object.isRequired,
	pileToPile: PropTypes.func.isRequired,
	piles: PropTypes.instanceOf( List ).isRequired,
	connectDragSource: PropTypes.func.isRequired
};

const DraggablePile = DragSource( ItemTypes.CARD_PILE, cardSource, collect )(CardPile);

const ConnectedDraggablePile = connect( null, { pileToPile } )( DraggablePile );
export default ConnectedDraggablePile;
