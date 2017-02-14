import jwt from 'jsonwebtoken';
import { toRes, setUserInfo } from './../lib/util';
import { JWT_SECRET } from './../config/main.json';

const jwtSignOption = {
	expiresIn: '5 days'
};
const generateToken = user => jwt.sign(user, JWT_SECRET, jwtSignOption);

export default (req, res) => {
	const user = setUserInfo(req.user);
	const success = toRes(res);

	success({
		token: `JWT ${generateToken(user)}`,
		user
	});
}
