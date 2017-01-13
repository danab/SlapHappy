const canLift = ( pile, card ) => {
	if ( pile.size === 0 ) { return card % 13 === 0; }

	const topCard = pile.last();
	return Math.floor( topCard / 13 ) === Math.floor( card / 13 ) && ( topCard + 1 === card );
};

export default canLift;
