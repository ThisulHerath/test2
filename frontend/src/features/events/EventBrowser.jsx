import { useEffect, useMemo, useState } from 'react'
import { RegisterButton } from './RegisterButton'
import { SearchFilter } from './SearchFilter'
import { getEvents, registerForEvent } from './eventService'

const formattedDate = (date) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))

export function EventBrowser() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [registeringId, setRegisteringId] = useState('')

  useEffect(() => {
    getEvents()
      .then(({ events: loaded, isMock }) => {
        setEvents(loaded)
        if (isMock) setNotice({ type: 'info', text: 'Showing sample events until the API is available.' })
      })
      .catch((error) => setNotice({ type: 'error', text: error.message }))
      .finally(() => setLoading(false))
  }, [])

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase()
    return events.filter((event) => {
      const searchable = `${event.title} ${event.description} ${event.location}`.toLowerCase()
      return (category === 'All' || event.category === category) && (!term || searchable.includes(term))
    })
  }, [events, search, category])

  async function handleRegister(id) {
    setRegisteringId(id)
    setNotice(null)
    try {
      const updated = await registerForEvent(id)
      setEvents((items) => items.map((event) => event._id === id ? { ...event, ...updated } : event))
      setNotice({ type: 'success', text: 'Registration successful.' })
    } catch (error) {
      setNotice({ type: 'error', text: error.message })
    } finally {
      setRegisteringId('')
    }
  }

  return <section className="events-page">
    <h1>Upcoming events</h1>
    {notice && <p className={`notice notice-${notice.type}`} role="status">{notice.text}</p>}
    <SearchFilter search={search} category={category} onSearchChange={setSearch} onCategoryChange={setCategory} />
    {loading ? <p>Loading events…</p> : filteredEvents.length === 0 ? <p className="empty-state">No events match your search.</p> : <div className="events-grid">
      {filteredEvents.map((event) => <article className="event-card" key={event._id}>
        <span className="event-category">{event.category}</span><h2>{event.title}</h2><p className="event-description">{event.description}</p>
        <div className="event-meta"><span>{formattedDate(event.date)}</span><span>{event.location}</span><span>{event.registrations} / {event.capacity} registered</span></div>
        <RegisterButton event={event} isRegistering={registeringId === event._id} onRegister={handleRegister} />
      </article>)}
    </div>}
  </section>
}
