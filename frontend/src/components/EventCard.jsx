function EventCard({ event, onViewDetails, onRegister, isRegistering }) {
  const isFull = event.registrations >= event.capacity;

  return (
    <div className="event-card">
      <div className="event-card-content">
        <span className="event-category">
          {event.category}
        </span>

        <h3>{event.title}</h3>

        <p>{event.description}</p>

        <p>
          📅 {new Date(event.date).toLocaleDateString()}
        </p>

        <p>📍 {event.location}</p>

        <p>
          👥 {event.registrations} / {event.capacity} registered
        </p>

        <button onClick={() => onViewDetails(event._id)}>
          View Details
        </button>
        <button
          type="button"
          onClick={() => onRegister(event._id)}
          disabled={isFull || isRegistering}
        >
          {isFull ? "Event Full" : isRegistering ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default EventCard;