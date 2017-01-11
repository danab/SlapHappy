import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import { List, Map } from 'immutable';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import '../../App.css';

import Deck from '../Dumb/Deck';
import Foundation from '../Dumb/Foundation';
import Piles from '../Dumb/Piles';
import CustomDragLayer from './CustomDragLayer';

class App extends Component {
	render() {
		// TODO: dispatch seems unneccesary
		const { deck, piles, foundation, dispatch } = this.props;
		return (
			<div id="App">
				<CustomDragLayer />
				<Deck deck={ deck } dispatch={ dispatch } />
				<Piles piles={ piles } />
				<Foundation foundation={ foundation } />
			</div>
		);
	}
}

App.propTypes = {
	deck: PropTypes.instanceOf( Map ).isRequired,
	dispatch: PropTypes.func.isRequired,
	foundation: PropTypes.instanceOf( List ).isRequired,
	piles: PropTypes.instanceOf( List ).isRequired
};

const ConnectedApp = connect( (state) => state )(App);

// const DragAndDropConnectedApp = DragDropContext( HTML5Backend )( ConnectedApp );
const DragAndDropConnectedApp = DragDropContext( TouchBackend( { enableMouseEvents: true } ) )( ConnectedApp );

export default DragAndDropConnectedApp;
