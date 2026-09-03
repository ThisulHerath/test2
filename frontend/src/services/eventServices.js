import axios from "axios";

// Use one deployment URL setting throughout the app. `VITE_API_URL` remains as
// a backwards-compatible fallback for existing hosting configuration.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const API_URL = `${API_BASE_URL}/events`;

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong.";

const unwrap = (request) =>
  request.then(({ data }) => data.data ?? data);

export const getEvents = (params = {}) =>
  unwrap(axios.get(API_URL, { params }));

export const getEventById = (id) =>
  unwrap(axios.get(`${API_URL}/${id}`));

export const createEvent = (eventData) =>
  unwrap(axios.post(API_URL, eventData));

export const updateEvent = (id, eventData) =>
  unwrap(axios.put(`${API_URL}/${id}`, eventData));

export const deleteEvent = (id) =>
  unwrap(axios.delete(`${API_URL}/${id}`));

export const registerForEvent = (id) =>
  unwrap(axios.post(`${API_URL}/${id}/register`, {}));

export { getErrorMessage };
