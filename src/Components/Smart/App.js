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

class App extends Component {
	
	// giveAName() {
	// 	this.props.dispatch( { type: 'SET_USERNAME', payload: { username: Math.floor( Math.random() * 100000 ) } } );
	// }
	
	render() {
		// TODO: dispatch seems unneccesary
		const { games, foundation, flipDeck, dealCards, pending, score } = this.props;

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
			</div>
		);
	}
}

App.propTypes = {
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
