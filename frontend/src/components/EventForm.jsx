import { useState } from "react";

function EventForm({
  initialData = {},
  onSubmit,
  submitText = "Create Event",
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    location: initialData.location || "",
    category: initialData.category || "",
    capacity: initialData.capacity || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Event Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description"
          rows="5"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Workshop">Workshop</option>
            <option value="Competition">Competition</option>
            <option value="Seminar">Seminar</option>
            <option value="Social">Social</option>
          </select>
        </div>

        <div className="form-group">
          <label>Capacity</label>

          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Enter capacity"
            min="1"
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={disabled}>
        {submitText}
      </button>
    </form>
  );
}

export default EventForm;