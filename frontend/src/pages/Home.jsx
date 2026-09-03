import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Campus Event Manager</h1>

        <p>
          Discover and participate in exciting campus events.
        </p>

        <button onClick={() => navigate("/events")}>
          Explore Events
        </button>
      </section>

      <section className="home-info">
        <h2>What can you do?</h2>

        <div className="features">
          <div>
            <h3>📅 Discover Events</h3>
            <p>Find upcoming events happening on campus.</p>
          </div>

          <div>
            <h3>🎯 Join Events</h3>
            <p>Register for events you are interested in.</p>
          </div>

          <div>
            <h3>🚀 Create Events</h3>
            <p>Create and manage campus events easily.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;