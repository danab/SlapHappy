import React, {
	Component,
	PropTypes,
} from 'react';

import FoundationPile from '../Smart/FoundationPile';

class Foundation extends Component {
	render() {
		return (
			<div className="foundation">
				{ this.props.foundation.map( (pile, i) => {
					return <FoundationPile key={ `foundation-${i}` } idx={ i } pile={ pile } />;
				})}
			</div>
		);
	}
}

Foundation.propTypes = {
	foundation: PropTypes.object.isRequired
};

export default Foundation;
