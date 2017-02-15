import React, {
	Component,
	PropTypes,
} from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { lookForNewGame } from '../../shared/actions/actions';

class GameStatus extends Component {
	render() {
		const { score } = this.props;
		return (
			<div id="game-over">
				<div id="game-over-inside">
					<div id="game-status">
						{ score.get( 0 ) > score.get( 1 ) ?
							'You win!' : score.get( 0 ) === score.get( 1 ) ?
							'Tie Game.'
							:
							'You lose.'
						}
					</div>
					<div id="restart">
						<a onClick={ this.props.lookForNewGame }> Look For New Game</a>
					</div>
				</div>
			</div>
		);
	}
}

GameStatus.propTypes = {
	lookForNewGame: PropTypes.func.isRequired,
	score: PropTypes.instanceOf( List )
};
GameStatus.defaultProps = {};

const ConnectedGameStatus = connect( state => ({ score: state.score }), { lookForNewGame } )( GameStatus );

export default ConnectedGameStatus;
