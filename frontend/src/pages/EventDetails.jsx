import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, getErrorMessage, getEventById, registerForEvent } from "../services/eventServices";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    getEventById(id).then(setEvent).catch((requestError) => setError(getErrorMessage(requestError)));
  }, [id]);

  const handleRegister = async () => {
    setWorking(true);
    setError("");
    try {
      setEvent(await registerForEvent(id));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setWorking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;
    setWorking(true);
    try {
      await deleteEvent(id);
      navigate("/events");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setWorking(false);
    }
  };

  if (error && !event) return <div className="not-found"><h2>{error}</h2><button onClick={() => navigate("/events")}>Back to Events</button></div>;
  if (!event) return <div className="details-page"><p>Loading event...</p></div>;

  const availableSeats = event.capacity - event.registrations;
  const isFull = availableSeats <= 0;

  return (
    <div className="details-page">
      <div className="details-container">
        <span className="event-category">{event.category}</span>
        <h1>{event.title}</h1>
        <p className="details-description">{event.description}</p>
        <div className="event-info">
          <div><strong>Date</strong><p>{new Date(event.date).toLocaleDateString()}</p></div>
          <div><strong>Location</strong><p>{event.location}</p></div>
          <div><strong>Capacity</strong><p>{event.capacity} people</p></div>
          <div><strong>Registered</strong><p>{event.registrations} people</p></div>
        </div>
        <div className="availability">{isFull ? "Event is full" : `${availableSeats} seats available`}</div>
        {error && <p className="error-message" role="alert">{error}</p>}
        <button type="button" onClick={handleRegister} disabled={isFull || working}>{isFull ? "Event Full" : working ? "Working..." : "Register"}</button>
        <button type="button" className="edit-btn" onClick={() => navigate(`/events/${id}/edit`)}>Edit Event</button>
        <button type="button" onClick={handleDelete} disabled={working}>Delete Event</button>
        <button type="button" className="back-btn" onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    </div>
  );
}

export default EventDetails;
