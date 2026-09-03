import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";
import { getErrorMessage, getEventById, updateEvent } from "../services/eventServices";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getEventById(id).then(setEvent).catch((requestError) => setError(getErrorMessage(requestError)));
  }, [id]);

  const handleUpdateEvent = async (updatedData) => {
    setSaving(true);
    setError("");
    try {
      await updateEvent(id, { ...updatedData, capacity: Number(updatedData.capacity) });
      navigate(`/events/${id}`);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  if (error && !event) return <div className="not-found"><h2>{error}</h2><button onClick={() => navigate("/events")}>Back to Events</button></div>;
  if (!event) return <div className="form-page"><p>Loading event...</p></div>;

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Edit Event</h1>
        <p className="form-subtitle">Update the event information.</p>
        {error && <p className="error-message" role="alert">{error}</p>}
        <EventForm initialData={event} onSubmit={handleUpdateEvent} submitText={saving ? "Updating..." : "Update Event"} disabled={saving} />
      </div>
    </div>
  );
}

export default EditEvent;
