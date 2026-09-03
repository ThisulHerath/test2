import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { createEvent, getErrorMessage } from "../services/eventServices";

function CreateEvent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreateEvent = async (eventData) => {
    setSaving(true);
    setError("");
    try {
      await createEvent({ ...eventData, capacity: Number(eventData.capacity) });
      navigate("/events");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Create New Event</h1>
        <p className="form-subtitle">Add a new event to the campus event manager.</p>
        {error && <p className="error-message" role="alert">{error}</p>}
        <EventForm onSubmit={handleCreateEvent} submitText={saving ? "Creating..." : "Create Event"} disabled={saving} />
      </div>
    </div>
  );
}

export default CreateEvent;
