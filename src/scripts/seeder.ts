import { User } from '../user/user.model';
import utils from '../lib/utils';
import dotenv = require('dotenv');

dotenv.config();

const envMissing = (env: string): string => {
  throw `Missing ${env} variable`;
};

const superadmin = async () => {
  const email = process.env.SUPERADMIN_EMAIL || envMissing('SUPERADMIN_EMAIL');
  const password =
    process.env.SUPERADMIN_PASSWORD || envMissing('SUPERADMIN_PASSWORD');
  const role = process.env.SUPERADMIN_ROLE || envMissing('SUPERADMIN_ROLE');

  const saltHash = utils.genPassword(password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const status = 'active';

  try {
    const user = await User.create({
      email: email,
      hash: hash,
      salt: salt,
      role: role,
      status: status,
    });

    console.log('Superadmin account created ', user);
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
};

superadmin();
