import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create-invitation.css";

function CreateInvitation() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    date: "",
    time: "",
    venue: "",
    location: "",
    message: ""
  });

  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try{
  const photoData = await Promise.all(
    photos.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error("Failed to read image"));
        };

        reader.readAsDataURL(file);
      });
    })
  );

    const invitationData = {
      name: formData.name,
      age: formData.age,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      location: formData.location,
      message: formData.message,
      photos: photoData
    };

  localStorage.setItem(
    "birthdayInvitation",
    JSON.stringify(invitationData)
  );

  navigate("/invitation");
  } catch (error) {
    console.error("Error saving invitation:", error);
    alert("Unable to process the photos.");
  }
};

  return (
    <div className="create-page">

      <header className="create-header">

        <div className="logo">
          🎂 InviteMe
        </div>

        <button
          onClick={() => navigate("/")}
          className="back-btn"
        >
          ← Home
        </button>

      </header>

      <div className="create-container">

        <div className="form-section">

          <h1>
            Create Your
            <span> Birthday Invitation</span>
          </h1>

          <p className="subtitle">
            Add your details and create something memorable.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Birthday Person</label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label>Time</label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Venue</label>

              <input
                type="text"
                name="venue"
                placeholder="Birthday party venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>📍 Google Maps Location</label>

              <input
                type="url"
                name="location"
                placeholder="Paste Google Maps link"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Birthday Message</label>

              <textarea
                name="message"
                placeholder="Write a special message..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />

            </div>

            <div className="form-group">

              <label>📸 Upload Photos</label>

              <div className="upload-box">

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotos}
                />

                <p>
                  Upload your favorite birthday memories
                </p>

              </div>

              {photos.length > 0 && (
                <p className="photo-count">
                  {photos.length} photo(s) selected
                </p>
              )}

            </div>

            <button
              type="submit"
              className="generate-btn"
            >
              Create Invitation ✨
            </button>

          </form>

        </div>

        <div className="preview-section">

          <div className="preview-card">

            <span>LIVE PREVIEW</span>

            <div className="preview-content">

              <div className="preview-balloons">
                🎈 🎈 🎈
              </div>

              <p>YOU'RE INVITED</p>

              <h2>
                {formData.name || "Birthday"}
              </h2>

              {formData.age && (
                <h3>
                  Turning {formData.age}
                </h3>
              )}

              <div className="preview-cake">
                🎂
              </div>

              {formData.date && (
                <p>📅 {formData.date}</p>
              )}

              {formData.time && (
                <p>⏰ {formData.time}</p>
              )}

              {formData.venue && (
                <p>📍 {formData.venue}</p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateInvitation;