import { Company } from './company.model';
import { Request, Response } from 'express';
import * as path from 'path';

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, website } = req.body;
    const status = 'active';

    const company = await Company.create({
      name,
      email,
      website,
      status,
    });

    return res.json(company);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const companies = await Company.findAll();
    return res.json(companies);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const id = req.params.companyId;

    const companies = await Company.findOne({
      where: { id },
    });

    return res.json(companies);
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.companyId;
    const payload = req.body;

    const company = await Company.findOne({
      where: { id },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    const updatedCompany = await company.update(payload);
    return res.json(updatedCompany);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.companyId;

    const company = await Company.findOne({
      where: { id },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    const deletedCompany = await Company.destroy({
      where: { id },
    });

    if (deletedCompany) {
      return res.json(`Deleted company ${id}`);
    }
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const uploadLogo = async (req, res) => {
  const files = req.files;
  const id = req.params.companyId;
  let fileName = '';

  Object.keys(files).forEach(key => {
    fileName = files[key].name;
    const filepath = path.join(
      __dirname,
      '../..',
      'public/uploads',
      files[key].name,
    );
    files[key].mv(filepath, err => {
      if (err) return res.status(500).json({ status: 'error', message: err });
    });
  });

  const company = await Company.findOne({
    where: { id },
  });

  if (!company) {
    throw new Error('Company not found');
  }

  const payload = {
    logo: `http://localhost:3000/public/uploads/${fileName}`,
  };

  const updatedCompany = await company.update(payload);
  return res.json(updatedCompany);
};

export default {
  create,
  findAll,
  findById,
  update,
  deleteOne,
  uploadLogo,
};
