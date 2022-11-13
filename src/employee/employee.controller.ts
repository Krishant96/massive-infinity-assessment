import { Employee } from './employee.model';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
  const company = req.params.companyId;
  const { first_name, last_name, email, phone } = req.body;
  const status = 'active';

  console.log(req.params.companyId);

  try {
    const employee = await Employee.create({
      first_name,
      last_name,
      company,
      email,
      phone,
      status,
    });

    return res.json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const findAll = async (req: Request, res: Response) => {
  const company = req.params.companyId;
  try {
    const employees = await Employee.findAll({
      where: { company },
    });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const company = req.params.companyId;
    const id = req.params.employeeId;

    const employees = await Employee.findOne({
      where: { company, id },
    });

    return res.json(employees);
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const update = async (req: Request, res: Response) => {
  const company = req.params.companyId;
  const id = req.params.employeeId;
  const payload = req.body;

  try {
    const employee = await Employee.findOne({
      where: { company, id },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    const updatedEmployee = await employee.update(payload);
    return res.json(updatedEmployee);
  } catch (err) {
    return res.status(500).json({ err: 'An error occured' });
  }
};

const deleteOne = async (req: Request, res: Response) => {
  const company = req.params.companyId;
  const id = req.params.employeeId;

  try {
    const employee = await Employee.findOne({
      where: { company, id },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    const deletedEmployee = await Employee.destroy({
      where: { company, id },
    });

    if (deletedEmployee) {
      return res.json(`Deleted employee ${id}`);
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
