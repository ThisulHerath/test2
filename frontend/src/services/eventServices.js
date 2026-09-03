import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

export const getEvents = () => axios.get(API_URL);

export const getEventById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createEvent = (eventData) =>
  axios.post(API_URL, eventData);

export const updateEvent = (id, eventData) =>
  axios.put(`${API_URL}/${id}`, eventData);

export const deleteEvent = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const registerForEvent = (id) =>
  axios.post(`${API_URL}/${id}/register`);