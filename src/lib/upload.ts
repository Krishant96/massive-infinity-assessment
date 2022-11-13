export const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    return res
      .status(400)
      .json({ status: 'false', message: 'File does not exist' });

  next();
};
