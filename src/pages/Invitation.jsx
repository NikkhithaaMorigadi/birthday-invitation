import { useEffect, useState } from "react";
import "../styles/invitation.css";
import invitationData from "../data/invitationData";
function Invitation() {

  const [invitation, setInvitation] = useState(null);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // -----------------------------------------
  // Load invitation
  // -----------------------------------------

 useEffect(() => {

  console.log("Published Invitation:", invitationData);

  setInvitation(invitationData);

}, []);


  // -----------------------------------------
  // Countdown
  // -----------------------------------------

  useEffect(() => {

    if (!invitation?.date) return;

    const calculateCountdown = () => {

      let targetDate;

      if (invitation.time) {

        targetDate = new Date(
          `${invitation.date}T${invitation.time}`
        );

      } else {

        targetDate = new Date(
          `${invitation.date}T00:00:00`
        );

      }

      const now = new Date();

      const difference =
        targetDate.getTime() - now.getTime();

      if (difference <= 0) {

        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setCountdown({
        days,
        hours,
        minutes,
        seconds
      });

    };

    calculateCountdown();

    const timer = setInterval(
      calculateCountdown,
      1000
    );

    return () => clearInterval(timer);

  }, [invitation]);


  // -----------------------------------------
  // Scroll animation
  // -----------------------------------------

  useEffect(() => {

    if (!invitation) return;

    const sections =
      document.querySelectorAll(
        ".animate-section"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "show"
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };

  }, [invitation]);


  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (!invitation) {

    return (
      <div className="loading">
        Preparing your invitation...
      </div>
    );

  }


  // -----------------------------------------
  // Format date
  // -----------------------------------------

  const formattedDate =
    invitation.date
      ? new Date(
          `${invitation.date}T00:00:00`
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "2-digit",
            year: "numeric"
          }
        )
      : "";


  // -----------------------------------------
  // Location
  // -----------------------------------------

  const openLocation = () => {

    if (!invitation.location) {

      alert(
        "Location has not been added yet."
      );

      return;
    }

    window.open(
      invitation.location,
      "_blank"
    );

  };


  return (

    <div className="invitation-page">

      {/* =====================================
          HERO / COVER
      ===================================== */}

      <section className="hero-section">
         
  {/* Uploaded photo as blurred background */}
  {invitation.photos &&
    invitation.photos.length > 0 && (
      <div
        className="hero-background-image"
        style={{
          backgroundImage: `url(${invitation.photos[2]})`
        }}
      ></div>
  )}

  {/* Dark/pink overlay for readability */}
  <div className="hero-background-overlay"></div>
        {/* Decorative background */}

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        {/* Floating hearts */}

         <div className="birthday-decorations">
    <span className="decor balloon balloon-1">🎈</span>
    <span className="decor balloon balloon-2">🎈</span>
    <span className="decor balloon balloon-3">🎈</span>

    <span className="decor cake cake-1">🎂</span>
    <span className="decor cake cake-2">🧁</span>

    <span className="decor heart heart-1">❤️</span>
    <span className="decor heart heart-2">💕</span>
    <span className="decor heart heart-3">💗</span>
    <span className="decor heart heart-4">💖</span>
  </div>

        {/* Top Logo */}

        

        {/* Main Content */}

        <div className="hero-content">

          <p  className="hero-small-title" >
            ✦ YOU'RE INVITED ✦
          </p>


          <div className="hero-decoration">
            <span></span>
            <span className="heart">
              🎈🎂❤️
            </span>
            <span></span>
          </div>


          <h1 >
            {invitation.name}
          </h1>


          <div className="birthday-and">

            <span></span>

            <em >
              Birthday
            </em>

            <span></span>

          </div>


          <h2 >
            Celebration
          </h2>


          {formattedDate && (

            <p className="hero-date">
              {formattedDate}
            </p>

          )}


          {/* Countdown */}

          <div className="countdown-container">

            <div className="countdown-box">

              <strong>
                {String(
                  countdown.days
                ).padStart(2, "0")}
              </strong>

              <span>
                DAYS
              </span>

            </div>


            <div className="countdown-box">

              <strong>
                {String(
                  countdown.hours
                ).padStart(2, "0")}
              </strong>

              <span>
                HOURS
              </span>

            </div>


            <div className="countdown-box">

              <strong>
                {String(
                  countdown.minutes
                ).padStart(2, "0")}
              </strong>

              <span>
                MINUTES
              </span>

            </div>


            <div className="countdown-box">

              <strong>
                {String(
                  countdown.seconds
                ).padStart(2, "0")}
              </strong>

              <span>
                SECONDS
              </span>

            </div>

          </div>


          {/* Scroll */}

          <div className="scroll-indicator">

            <p>
              SCROLL TO EXPLORE
            </p>

            <div className="scroll-arrow">
              ↓
            </div>

          </div>

        </div>


        {/* Bottom wave */}

        <div className="hero-wave">
        </div>

      </section>


      {/* =====================================
          MEMORIES
      ===================================== */}

      <section className="photo-section animate-section">

        <p className="section-label">
          SPECIAL MOMENTS
        </p>

        <h2>
          Our Memories
        </h2>


        {invitation.photos &&
        invitation.photos.length > 0 ? (

          <div className="photo-grid">

            {invitation.photos.map(
              (photo, index) => (

                <div
                  className="photo-card"
                  key={index }
                >

                  <img
                    src={photo}
                    alt={
                      `Birthday memory ${
                        index + 1
                      }`
                    }
                  />

                </div>

              )
            )}

          </div>

        ) : (

          <p className="no-photos">
            Your special memories will appear here.
          </p>

        )}

      </section>


      {/* =====================================
          DETAILS
      ===================================== */}

      <section className="details-section animate-section">

        <p className="section-label">
          SAVE THE DATE
        </p>

        <h2>
          Birthday Details
        </h2>


        <div className="details">

          {invitation.age && (

            <div className="detail-item">

              <span>
                🎂
              </span>

              <div>
                <small>
                  CELEBRATING
                </small>

                <p>
                  {invitation.age} st Birthday
                </p>
              </div>

            </div>

          )}


          <div className="detail-item">

            <span>
              📅
            </span>

            <div>

              <small>
                DATE
              </small>

              <p>
                {formattedDate}
              </p>

            </div>

          </div>


          {invitation.time && (

            <div className="detail-item">

              <span>
                ⏰
              </span>

              <div>

                <small>
                  TIME
                </small>

                <p>
                  {invitation.time}
                </p>

              </div>

            </div>

          )}


          {invitation.venue && (

            <div className="detail-item">

              <span>
                📍
              </span>

              <div>

                <small>
                  VENUE
                </small>

                <p>
                  {invitation.venue}
                </p>

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          MESSAGE
      ===================================== */}

      <section className="message-section animate-section">

        <div className="message-card">
            {/* Blurred birthday photo */}
    {invitation.photos &&
      invitation.photos.length > 0 && (
        <div
          className="message-background"
          style={{
            backgroundImage: `url(${invitation.photos[0]})`
          }}
        ></div>
      )}

    {/* Dark overlay */}
    <div className="message-overlay"></div>

    {/* Message content */}
    <div className="message-content">
          <div className="message-label">
        A SPECIAL MESSAGE
      </div>

      <h2 className="message-title">
        From My Heart
      </h2>

      <div className="message-divider">
        <span></span>
        <span className="message-heart">♥</span>
        <span></span>
      </div>

         

          <p className="message-text">
            {invitation.message ||
              "Come celebrate this special day with us and make wonderful memories together!"}
          </p>

          
           <div className="message-bottom-divider">
        <span>🎂</span>
        <span>♥</span>
        <span>🎂</span>
      </div>

      <div className="message-footer">
        YOUR PRESENCE MEANS EVERYTHING
      </div>
</div>
        </div>

      </section>


      


      {/* =====================================
          FINAL
      ===================================== */}

      <section className="final-section animate-section">

        <div className="final-decoration">
          ♥
        </div>

        <h1>
          See You There!
        </h1>

        <p>
          Let's celebrate together.
        </p>

        <div className="final-cake">
          🎂
        </div>

        <div className="final-hearts">
          ♥　♥　♥
        </div>

      </section>

    </div>

  );

}

export default Invitation;