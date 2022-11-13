import fs = require('fs');
import path = require('path');
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../user/user.model';

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({
    where: { id: payload.sub },
  })
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, undefined));
});

export const passportJwt = passport => {
  passport.use(strategy);
};
