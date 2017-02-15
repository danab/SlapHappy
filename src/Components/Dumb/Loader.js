import React, {
	Component
} from 'react';

// shamelessly taken from https://codepen.io/jczimm/pen/vEBpoL
// please check his stuff... http://jczimm.com/
class Loader extends Component {
	render() {
		return (
			<div className="showbox">
				<div className="loader">
					<svg className="circular" viewBox="25 25 50 50">
						<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="10" strokeMiterlimit="10"/>
					</svg>
				</div>
				<div id="loader-text">
					Looking For A Match...
				</div>
			</div>
		);

	}
}

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
