import "./App.css";

import AccountSection from "./components/AccountSection";
import CeremonyInfo from "./components/CeremonyInfo";
import ContactInfo from "./components/ContactInfo";
import FooterMessage from "./components/FooterMessage";
import Gallery from "./components/Gallery";
import {
  accountItems,
  ceremonyItems,
  contactItems,
  galleryImages,
  inviteMessage,
} from "./constants/weddingContent";

function App() {
  return (
    <div className="wedding-container">
      <div className="wedding-card">
        <Gallery images={galleryImages} />

        <div className="decoration-top">
          <div className="flower flower-1">*</div>
          <div className="flower flower-2">+</div>
          <div className="flower flower-3">*</div>
        </div>

        <header className="card-header">
          <p className="subtitle">We are getting married</p>
          <h1 className="main-title">Wedding Invitation</h1>
        </header>

        <section className="couple-section">
          <div className="person groom">
            <div className="person-icon">G</div>
            <h2>Groom</h2>
            <p className="name">Seung Kang</p>
          </div>
          <div className="ampersand">&</div>
          <div className="person bride">
            <div className="person-icon">B</div>
            <h2>Bride</h2>
            <p className="name">Su Kim</p>
          </div>
        </section>

        <div className="divider" />

        <CeremonyInfo items={ceremonyItems} />
        <ContactInfo contacts={contactItems} />
        <AccountSection accounts={accountItems} />
        <FooterMessage messageLines={inviteMessage} />

        <div className="decoration-bottom">
          <div className="flower flower-1">*</div>
          <div className="flower flower-2">+</div>
          <div className="flower flower-3">*</div>
        </div>
      </div>
    </div>
  );
}

export default App;
