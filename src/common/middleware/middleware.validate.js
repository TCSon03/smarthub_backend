export const validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const errors = validationResult.error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    next();
  };
};
