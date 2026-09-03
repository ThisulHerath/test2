import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/events`;

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