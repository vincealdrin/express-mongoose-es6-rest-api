import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../config/main.json';

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
export const toRes = (res, status = 200) => (err, thing) => {
	if (err) return res.status(500).send(err);

	if (thing && typeof thing.toObject === 'function') {
		thing = thing.toObject();
	}

	res.status(status).json(thing);
};

/**	Extracts user's info on Express Request object.
 *	@param {express.Request.body} req.body	Express HTTP Response
 *
 *	@example
 *		const newUserInfo = setUserInfo(req.body);
 */
export const setUserInfo = ({ username, first_name, last_name, email }) => ({
	username,
	first_name,
	last_name,
	email,
});

/**	Generates JSON Web Token for the user.
 *	@param {object} user	User's info
 *
 */
const jwtSignOption = {
	expiresIn: '5 days',
	issuer: 'VNC'
};
export const generateToken = user => jwt.sign(user, JWT_SECRET, jwtSignOption);
