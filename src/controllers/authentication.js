import jwt from 'jsonwebtoken';
import { jwtSecret } from './../passport/config';

const generateJwt = user => jwt.sign(user, jwtSecret, {
	expiresIn: '5 days',
});

const setUserInfo = ({ id, email, username }) => ({
	id,
	username,
	email,
});

const respond = (res, obj, code = 200) => res.status(code).json(obj);

export const login = (req, res) => {
	const userInfo = setUserInfo(req.user);
	respond(res, {
		token: `JWT ${generateJwt(userInfo)}`,
		userInfo
	});
};

export const register = () => {

};
