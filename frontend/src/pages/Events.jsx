import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { getErrorMessage, getEvents, registerForEvent } from "../services/eventServices";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registeringId, setRegisteringId] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((requestError) => setError(getErrorMessage(requestError)))
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/events/${id}`);
  };

  const handleRegister = async (id) => {
    setRegisteringId(id);
    setError("");
    try {
      const updatedEvent = await registerForEvent(id);
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event._id === id ? { ...event, ...updatedEvent } : event
        )
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setRegisteringId("");
    }
  };

  // Search + Filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>

      {error && <p className="error-message" role="alert">{error}</p>}

      <div className="event-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <Filter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {loading ? <p>Loading events...</p> : <EventList
        events={filteredEvents}
        onViewDetails={handleViewDetails}
        onRegister={handleRegister}
        registeringId={registeringId}
      />}
    </div>
  );
}

export default Events;