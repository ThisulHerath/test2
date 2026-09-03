import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

function CreateEvent() {
  const navigate = useNavigate();

  const handleCreateEvent = (eventData) => {
    console.log("Event data:", eventData);

    // Backend connect කරනකොට:
    // createEvent(eventData)

    alert("Event created successfully!");

    navigate("/events");
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Create New Event</h1>

        <p className="form-subtitle">
          Add a new event to the campus event manager.
        </p>

        <EventForm onSubmit={handleCreateEvent} />
      </div>
    </div>
  );
}

export default CreateEvent;