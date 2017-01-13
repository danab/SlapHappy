import React, {
	Component,
	PropTypes,
} from 'react';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../../shared/utils/constants';

import Card from '../Dumb/Card';
import CardPile from '../Dumb/DumbCardPile';

function collect (monitor) {
	return {
		isDragging: monitor.isDragging(),
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		sourceOffset: monitor.getSourceClientOffset()
	};
}

var layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%'
};


class CustomDragLayer extends Component {

	getLayerStyles() {
		const { sourceOffset } = this.props;

		return {
			transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
		};
	}

	render() {

		const { isDragging, itemType, item } = this.props;

		if (!isDragging ) { return null; }

		return (
			<div style={ layerStyles }>
				<div style={ this.getLayerStyles() }>
					{ ( itemType === ItemTypes.CARD ) ?
						<Card { ...item } />
						:
						<CardPile { ...item } />
					}
				</div>
			</div>
		);
	}
}

CustomDragLayer.propTypes = {
	sourceOffset: PropTypes.object,
	isDragging: PropTypes.bool,
	itemType: PropTypes.string,
	item: PropTypes.object
};

export default DragLayer( collect )( CustomDragLayer );
