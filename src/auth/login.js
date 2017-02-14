import { toRes, setUserInfo, generateToken } from './../lib/util';

export default (req, res) => {
	const user = setUserInfo(req.user);
	const success = toRes(res);

	success(null, {
		token: `JWT ${generateToken(user)}`,
		user
	});
}
