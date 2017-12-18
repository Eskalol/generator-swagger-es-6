import passport from 'passport';
import { signToken } from '../auth.service';


export default function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }

    const token = signToken(user._id, user.role);
    res.json({ token });
    return null;
  })(req, res, next);
}
