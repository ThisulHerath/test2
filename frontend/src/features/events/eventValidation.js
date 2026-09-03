export const EVENT_CATEGORIES = ['Workshop', 'Competition', 'Seminar', 'Social']

export function validateEvent(values) {
  const errors = {}
  if (!values.title?.trim()) errors.title = 'Title is required.'
  if (!values.description?.trim()) errors.description = 'Description is required.'
  if (!values.location?.trim()) errors.location = 'Location is required.'
  if (!EVENT_CATEGORIES.includes(values.category)) errors.category = 'Select a valid category.'
  const date = new Date(values.date)
  if (!values.date || Number.isNaN(date.getTime())) errors.date = 'Enter a valid date.'
  else if (date.getTime() < new Date().setHours(0, 0, 0, 0)) errors.date = 'Date cannot be in the past.'
  if (!Number.isInteger(Number(values.capacity)) || Number(values.capacity) <= 0) errors.capacity = 'Capacity must be greater than 0.'
  return errors
}
