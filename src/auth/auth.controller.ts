import { User } from '../user/user.model';
import { Request, Response, NextFunction } from 'express';
import utils from '../lib/utils';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  User.findOne({
    where: { email },
  })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'Could not find user' });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt,
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({
          status: false,
          msg: 'You entered the wrong password',
        });
      }
    })
    .catch(err => {
      next(err);
    });
};

export default {
  login,
};
