import EventCard from "./EventCard";

function EventList({ events, onViewDetails, onRegister, registeringId }) {
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          isRegistering={registeringId === event._id}
        />
      ))}
    </div>
  );
}

export default EventList;