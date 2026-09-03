const validateEvent = (req, res, next) => {
  const { title, description, date, location, category, capacity } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required and must be a non-empty string.');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Description is required and must be a non-empty string.');
  }

  if (!date) {
    errors.push('Date is required.');
  } else if (isNaN(Date.parse(date))) {
    errors.push('Date must be a valid date format.');
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    errors.push('Location is required and must be a non-empty string.');
  }

  const validCategories = ['Workshop', 'Competition', 'Seminar', 'Social', 'Other'];
  if (!category || !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}.`);
  }

  if (capacity === undefined || capacity === null || isNaN(Number(capacity))) {
    errors.push('Capacity is required and must be a number.');
  } else if (Number(capacity) <= 0) {
    errors.push('Capacity must be a positive number greater than 0.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateEventUpdate = (req, res, next) => {
  const { date, category, capacity } = req.body;
  const errors = [];

  if (date !== undefined && isNaN(Date.parse(date))) {
    errors.push('Date must be a valid date format.');
  }

  const validCategories = ['Workshop', 'Competition', 'Seminar', 'Social', 'Other'];
  if (category !== undefined && !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}.`);
  }

  if (capacity !== undefined) {
    if (isNaN(Number(capacity)) || Number(capacity) <= 0) {
      errors.push('Capacity must be a positive number greater than 0.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateEvent,
  validateEventUpdate
};
