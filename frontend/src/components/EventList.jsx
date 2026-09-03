import EventCard from "./EventCard";

function EventList({ events, onViewDetails }) {
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
        />
      ))}
    </div>
  );
}

export default EventList;