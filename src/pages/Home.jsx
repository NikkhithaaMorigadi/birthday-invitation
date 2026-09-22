import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <nav className="navbar">
        <div className="logo">
          🎂 InviteMe
        </div>

        <button
          className="nav-create-btn"
          onClick={() => navigate("/create")}
        >
          Create Invitation
        </button>
      </nav>

      <section className="hero">

        <div className="balloon balloon-one">🎈</div>
        <div className="balloon balloon-two">🎈</div>
        <div className="balloon balloon-three">🎈</div>

        <div className="hero-content">

          <span className="small-title">
            ✨ MAKE IT SPECIAL ✨
          </span>

          <h1>
            Create a Birthday
            <br />
            <span>Invitation</span>
          </h1>

          <p>
            Create a beautiful, personalized birthday invitation
            with photos, animations and location sharing.
          </p>

          <button
            className="create-btn"
            onClick={() => navigate("/create")}
          >
            Create My Invitation
            <span> → </span>
          </button>

        </div>

        <div className="birthday-card">

          <div className="card-decoration">
            🎈 🎉 🎈
          </div>

          <p>YOU'RE INVITED</p>

          <h2>
            Birthday
            <br />
            Celebration
          </h2>

          <div className="cake">
            🎂
          </div>

          <p className="card-footer">
            A special day deserves a special invitation
          </p>

        </div>

      </section>

      <section className="features">

        <div className="feature">
          <div>📸</div>
          <h3>Add Photos</h3>
          <p>
            Add your favorite memories to your invitation.
          </p>
        </div>

        <div className="feature">
          <div>✨</div>
          <h3>Beautiful Animations</h3>
          <p>
            Make your invitation come alive with animations.
          </p>
        </div>

        <div className="feature">
          <div>📍</div>
          <h3>Share Location</h3>
          <p>
            Add your venue and Google Maps location.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;