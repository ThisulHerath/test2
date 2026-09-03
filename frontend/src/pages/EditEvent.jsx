import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";

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
    description: "Test your programming skills.",
    date: "2026-09-15",
    location: "Computer Lab 05",
    category: "Competition",
    capacity: 50,
    registrations: 30,
  },
];

function EditEvent() {
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

  const handleUpdateEvent = (updatedData) => {
    console.log("Updated event:", updatedData);

    // Backend ready වුණාම:
    // updateEvent(id, updatedData)

    alert("Event updated successfully!");

    navigate(`/events/${id}`);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Edit Event</h1>

        <p className="form-subtitle">
          Update the event information.
        </p>

        <EventForm
          initialData={event}
          onSubmit={handleUpdateEvent}
          submitText="Update Event"
        />
      </div>
    </div>
  );
}

export default EditEvent;