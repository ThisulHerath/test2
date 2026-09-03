import { useParams, useNavigate } from "react-router-dom";

const mockEvents = [
  {
    _id: "1",
    title: "AI Workshop",
    description: "Learn the basics of Artificial Intelligence.",
    date: "2026-09-10",
    location: "Main Auditorium",
    category: "Workshop",
    capacity: 100,
    registrations: 45,
  },
  {
    _id: "2",
    title: "Coding Competition",
    description: "Test your programming skills in our coding challenge.",
    date: "2026-09-15",
    location: "Computer Lab 05",
    category: "Competition",
    capacity: 50,
    registrations: 30,
  },
  {
    _id: "3",
    title: "Tech Seminar",
    description: "Explore the latest trends in technology.",
    date: "2026-09-20",
    location: "Lecture Hall 02",
    category: "Seminar",
    capacity: 150,
    registrations: 80,
  },
  {
    _id: "4",
    title: "Freshers Social",
    description: "A fun social event for university students.",
    date: "2026-09-25",
    location: "University Ground",
    category: "Social",
    capacity: 200,
    registrations: 120,
  },
];

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = mockEvents.find((event) => event._id === id);

  if (!event) {
    return (
      <div className="not-found">
        <h2>Event not found</h2>
        <button onClick={() => navigate("/events")}>
          Back to Events
        </button>
      </div>
    );
  }

  const availableSeats = event.capacity - event.registrations;

  return (
    <div className="details-page">
      <div className="details-container">
        <span className="event-category">
          {event.category}
        </span>

        <h1>{event.title}</h1>

        <p className="details-description">
          {event.description}
        </p>

        <div className="event-info">
          <div>
            <strong>📅 Date</strong>
            <p>
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <strong>📍 Location</strong>
            <p>{event.location}</p>
          </div>

          <div>
            <strong>👥 Capacity</strong>
            <p>{event.capacity} people</p>
          </div>

          <div>
            <strong>🎟️ Registered</strong>
            <p>
              {event.registrations} people
            </p>
          </div>
        </div>

        <div className="availability">
          {availableSeats > 0
            ? `${availableSeats} seats available`
            : "Event is full"}
        </div>

        <button
            className="edit-btn"
            onClick={() => navigate(`/events/${event._id}/edit`)}
            >
            ✏️ Edit Event
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/events")}
        >
          ← Back to Events
        </button>
      </div>
    </div>
  );
}

export default EventDetails;