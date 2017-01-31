import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import { List } from 'immutable';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import '../../App.css';

import Deck from '../Dumb/Deck';
import Foundation from '../Dumb/Foundation';
import Piles from '../Dumb/Piles';
import CustomDragLayer from './CustomDragLayer';

import { dealCards, flipDeck } from '../../shared/actions/actions';

class Timer extends Component {

	// ht: http://stackoverflow.com/a/34584078/768757
	componentDidMount() {
		this.interval = setInterval( () => {
			if ( this.props.end - Date.now() < 0 ) {
				clearInterval(this.interval);
			}
			this.forceUpdate();
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { end } = this.props;
		let seconds = Math.round( ( end - Date.now() ) / 100 ) / 10;

		//
		if ( seconds < 0 ) {
			seconds = '0.0';
		} else if ( seconds > 10 ) {
			seconds = Math.round( seconds );
		}

		return (
			<div id="timer" className={ seconds < 10 ? 'alert' : null }>
				{ seconds }
			</div>
		);
	}
}

Timer.propTypes = {
	end: PropTypes.number.isRequired
};

class App extends Component {
	
	// giveAName() {
	// 	this.props.dispatch( { type: 'SET_USERNAME', payload: { username: Math.floor( Math.random() * 100000 ) } } );
	// }
	
	render() {
		// TODO: dispatch seems unneccesary
		const { status, timer, games, foundation, flipDeck, dealCards, pending, score } = this.props;

		// if ( !this.props.user.username ) {
		// 	return ( <div onClick={ this.giveAName.bind(this) }> Get a username </div> );
		// }
		if ( pending ) {
			return ( <div> Looking for a match. </div> );
		}

		const yourDeck = games.getIn([ 0, 'deck' ]);
		const yourPiles = games.getIn([ 0, 'piles' ]);

		const opponentDeck = games.getIn([ 1, 'deck' ]);
		const opponentPiles = games.getIn([ 1, 'piles' ]);

		return (
			<div id="App">
				<div className="game">
					<CustomDragLayer />
					<Deck deck={ yourDeck } { ...{ flipDeck, dealCards } } />
					<Piles piles={ yourPiles } />
					<Foundation foundation={ foundation } />
				</div>
				<div id="opponent-game" className="game">
					<Deck deck={ opponentDeck } dumb />
					<Piles piles={ opponentPiles } dumb/>
				</div>
				<div id="scores">
					<h1> Score </h1>
					<h3>
						You: { score.get(0) }
					</h3>
					<h3>
						Opponent: { score.get(1) }
					</h3>
				</div>
				<Timer end={ timer } />
				{ !status ?
					<div id="game-over">
						<div id="game-over-inside">
							{ score.get( 0 ) > score.get( 1 ) ?
								'You win!' : score.get( 0 ) === score.get( 1 ) ?
									'Tie Game.'
									:
									'You lose.'
							}
						</div>
					</div>
					:
					null
				}
			</div>
		);
	}
}

App.propTypes = {
	score: PropTypes.object,
	status: PropTypes.string,
	timer: PropTypes.number,
	dealCards: PropTypes.func,
	flipDeck: PropTypes.func,
	foundation: PropTypes.instanceOf( List ).isRequired,
	games: PropTypes.instanceOf( List ),
	pending: PropTypes.bool
};

const ConnectedApp = connect( state => state, { dealCards, flipDeck })(App);

// const DragAndDropConnectedApp = DragDropContext( HTML5Backend )( ConnectedApp );
const DragAndDropConnectedApp = DragDropContext( TouchBackend( { enableMouseEvents: true } ) )( ConnectedApp );

export default DragAndDropConnectedApp;
