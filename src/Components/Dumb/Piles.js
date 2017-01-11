import React, {
	Component,
	PropTypes,
} from 'react';

import Pile from '../Smart/Pile';

class Piles extends Component {
	render() {
		return (
			<div id="piles">
				{ this.props.piles.map( (pile, i) => {
					return <Pile key={`pile-${i}`} idx={ i } pile={ pile } />;
				})}
			</div>
		);
	}
}

Piles.propTypes = {
	piles: PropTypes.object.isRequired
};

export default Piles;
