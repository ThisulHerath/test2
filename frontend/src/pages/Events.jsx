import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

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

function Events() {
  const navigate = useNavigate();

  const [events] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleViewDetails = (id) => {
    navigate(`/events/${id}`);
  };

  // Search + Filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>

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

      <EventList
        events={filteredEvents}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}

export default Events;