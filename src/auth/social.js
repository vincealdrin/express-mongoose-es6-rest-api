import request from 'request';
import { toRes, setUserInfo, generateToken } from './../lib/util';

const providers = {
	facebook: 'https://graph.facebook.com/me',
	google: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
	github: 'https://api.github.com/user'
};

export default (req, res) => {
	const success = toRes(res);
	const fail = toRes(res, 404);
	const { network, socialToken } = req.body;
	const user = setUserInfo(req.body);
	const requestOption = {
		url: providers[network],
		qs: {
			access_token: socialToken,
			fields: 'first_name,last_name,email'
		}
	};

	request(requestOption, (err, { statusCode }, body) => {
		if (!err && statusCode === 200) {
			success(null, {
				token: `JWT ${generateToken(user)}`,
				user: { ...user, ...JSON.parse(body) }
			});
		} else {
			fail(err);
		}
	});
}
