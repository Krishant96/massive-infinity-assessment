import { User } from './user.model';
import { Request, Response } from 'express';
import utils from '../lib/utils';

const create = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const saltHash = utils.genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const status = 'active';

    const user = await User.create({
      email: email,
      hash: hash,
      salt: salt,
      role: role,
      status: status,
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const user = await User.findAll();
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const findById = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const user = await User.findOne({
      where: { id },
    });

    return res.json(user);
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const payload = req.body;

    if (payload.role) {
      throw new Error('User role cannot be modified');
    }

    if (payload.role) {
      throw new Error('User role cannot be modified');
    }

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await user.update(payload);
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const deletedUser = await User.destroy({
      where: { id },
    });

    if (deletedUser) {
      return res.json(`Deleted user ${id}`);
    }
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

export default {
  create,
  findAll,
  findById,
  update,
  deleteOne,
};
