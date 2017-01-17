import React, {
	Component,
	PropTypes,
} from 'react';

import Pile from './Pile';

class Piles extends Component {
	render() {
		return (
			<div className="piles">
				{ this.props.piles.map( (pile, i) => {
					return <Pile key={`pile-${i}`} idx={ i } pile={ pile } piles={ this.props.piles } dumb={ this.props.dumb } />;
				})}
			</div>
		);
	}
}

Piles.propTypes = {
	dumb: PropTypes.bool,
	piles: PropTypes.object.isRequired
};

export default Piles;
