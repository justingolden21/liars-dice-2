/**
 * Get a random die roll (1-6)
 * Return random int between 1-6 inclusive
 */
function getRoll() {
	return Math.floor(Math.random() * 6) + 1;
}

export default getRoll;
