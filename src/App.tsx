import "./App.css";

import AccountSection from "./components/AccountSection";
import CalendarSection from "./components/CalendarSection";
import FooterMessage from "./components/FooterMessage";
import Gallery from "./components/Gallery";
import LocationSection from "./components/LocationSection";
import {
  accountGroups,
  calendarInfo,
  eventInfo,
  footerContent,
  galleryItems,
  heroContent,
  introContent,
  locationInfo,
} from "./constants/weddingContent";

function App() {
  return (
    <div className="wedding-app">
      <main className="wedding-shell">
        <section className="hero">
          <img
            className="hero-image"
            src={galleryItems[0]?.fullSrc}
            alt="청첩장 대표 이미지"
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">{heroContent.eyebrow}</p>
            <h1>{heroContent.title}</h1>
            <p className="hero-names">{heroContent.coupleNames}</p>
            <div className="hero-line" />
            <p>{heroContent.eventSummary}</p>
          </div>
        </section>

        <section className="section invitation">
          <div className="intro-heart">♥</div>
          <h2 className="section-title">{introContent.sectionTitle}</h2>
          <div className="section-rule" />
          <div className="intro-copy">
            {introContent.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="intro-names">
            <p>
              <span>{introContent.groomLabel}</span>
              <strong>{introContent.groomName}</strong>
            </p>
            <p>
              <span>{introContent.brideLabel}</span>
              <strong>{introContent.brideName}</strong>
            </p>
          </div>
        </section>

        <CalendarSection calendar={calendarInfo} />
        <Gallery items={galleryItems} />
        <LocationSection location={locationInfo} />
        <AccountSection groups={accountGroups} />

        <section className="section event-meta" id="detail">
          <p>{eventInfo.eventDateLabel}</p>
          <p>{eventInfo.eventTime}</p>
          <p>{`${eventInfo.venueName} · ${eventInfo.venueAddress}`}</p>
        </section>

        <FooterMessage {...footerContent} />
      </main>
    </div>
  );
}

export default App;
