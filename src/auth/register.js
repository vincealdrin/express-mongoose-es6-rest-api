import { toRes, setUserInfo } from './../lib/util';
import User from './../models/user';


export default (req, res) => {
	const success = toRes(res);
	const fail = toRes(res, 409);
	const newUserInfo = setUserInfo(req.body);

	User.findOne({ username: newUserInfo.username })
		.then(user => {
			if (!user) {
				const newUser = new User(newUserInfo);

				newUser.save()
					.then(() => {
						success(null, { user: newUserInfo });
					})
					.catch(err => {
						fail(err);
					});
				return;
			}
			fail({ error: 'User already exists.' });
		})
		.catch(fail);
}
