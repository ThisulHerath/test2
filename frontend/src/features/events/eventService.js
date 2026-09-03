import axios from 'axios'
import { mockEvents } from './mockEvents'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 5000,
})

const messageFor = (error) => error.response?.data?.message || error.message || 'Something went wrong.'
const shouldUseMocks = (error) => !error.response && import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export async function getEvents() {
  try {
    const { data } = await api.get('/events')
    return { events: data.data ?? data.events ?? data, isMock: false }
  } catch (error) {
    if (shouldUseMocks(error)) return { events: mockEvents, isMock: true }
    throw new Error(messageFor(error), { cause: error })
  }
}

export async function registerForEvent(eventId) {
  try {
    const { data } = await api.post(`/events/${eventId}/register`)
    return data.event ?? data
  } catch (error) {
    if (shouldUseMocks(error)) {
      const event = mockEvents.find((item) => item._id === eventId)
      if (!event || event.registrations >= event.capacity) throw new Error('This event is full.', { cause: error })
      event.registrations += 1
      return event
    }
    throw new Error(messageFor(error), { cause: error })
  }
}
