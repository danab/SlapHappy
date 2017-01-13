import express from 'express';
const app = express();
const http = require( 'http' ).Server( app );
const io = require( 'socket.io' )( http );

import { createGame, foundation } from './src/shared/utils/initialize';
import { START_NEW_GAME } from './src/shared/actions/types';

app.use(express.static('build'));

app.get( '/', function( req, res ) {
	res.sendFile(__dirname + '/build/index.html');
});

let users = [];
let games = [];
let gameId = 0;

io.on( 'connect', function( socket ) {

	users.push( socket.id );
	console.log( `${users.length} user${(users.length === 1)?'':'s'} looking for a game`); // eslint-disable-line no-console

	if ( users.length >= 2 ) {
		startNewGame();
	}

	socket.on('action', function (action) {
		const gameId = socket.gameId;

		delete action.self;

		console.log( `broadcast ${action.type} to ${gameId}` ); // eslint-disable-line no-console
		socket.broadcast.to( gameId ).emit( 'action', action );

		// TODO: Check foundation before confirming
	});

	socket.on( 'disconnect', () => {
		// remove user if they are looking for a game.
		if ( users.indexOf( socket.id ) !== -1 ) {
			users.splice( users.indexOf( socket.id ), 1 );
			console.log( `${users.length} user${(users.length === 1)?'':'s'} looking for a game`); // eslint-disable-line no-console
		}

		// remove user from game?


		// if last player in game, remove game from games and 
	});

});

const startNewGame = () => {
	const [ id0, id1 ] = users;
	const socket0 = io.sockets.connected[ id0 ];
	const socket1 = io.sockets.connected[ id1 ];

	// this may be unneccesary
	socket0.gameId = gameId;
	socket1.gameId = gameId;

	// join the "game"
	socket0.join( gameId );
	socket1.join( gameId );

	const game0 = createGame();
	const game1 = createGame();

	console.log( `Created new game-${gameId}`); //eslint-disable-line no-console
	socket0.emit( 'action', {
		type: START_NEW_GAME,
		payload: {
			games: [ game0.toJS(), game1.toJS() ],
			gameId: gameId
		}
	});
	socket1.emit( 'action', {
		type: START_NEW_GAME,
		payload: {
			games: [ game1.toJS(), game0.toJS() ],
			gameId: gameId
		}
	});

	games[ gameId ] = foundation;
	
	// because I don't completely understand the async nature of javascript
	// ...could a third user have snuck in here? I dunno.
	users.splice( 0, 2 );

	// rev for the next game
	gameId++;
};

const port = 3003;
http.listen( port, function() {
	console.log( `listening on *:${port}` ); // eslint-disable-line no-console
});
