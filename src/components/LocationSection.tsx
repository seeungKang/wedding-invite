import { useState } from "react";

import type { LocationInfo } from "../types/wedding";

type LocationSectionProps = {
  location: LocationInfo;
};

function LocationSection({ location }: LocationSectionProps) {
  const [linkError, setLinkError] = useState<string | null>(null);

  const handleOpenExternal = (url: string) => {
    try {
      const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (openedWindow === null) {
        setLinkError("Unable to open map app. Please copy the address.");
      } else {
        setLinkError(null);
      }
    } catch {
      setLinkError("Unable to open map app. Please copy the address.");
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.venueAddress);
      setLinkError("Address copied to clipboard.");
    } catch {
      setLinkError("Address copy failed. Please copy manually.");
    }
  };

  return (
    <section className="section location" id="location">
      <h2 className="section-title">Location</h2>
      <div className="section-rule" />

      <img
        className="map-preview"
        src={location.mapPreviewSrc}
        alt={location.mapPreviewAlt}
        loading="lazy"
      />

      <h3 className="venue-title">{location.venueName}</h3>
      <p className="venue-text">{location.venueAddress}</p>
      <a className="venue-text phone-link" href={`tel:${location.venuePhone}`}>
        {location.venuePhone}
      </a>

      <div className="location-cta-row">
        <button
          className="outline-button cta"
          onClick={() => handleOpenExternal(location.naverMapUrl)}
          type="button"
        >
          Naver Map
        </button>
        <button
          className="outline-button cta"
          onClick={() => handleOpenExternal(location.kakaoNaviUrl)}
          type="button"
        >
          Kakao Navi
        </button>
      </div>

      {linkError !== null ? (
        <div className="link-fallback">
          <p>{linkError}</p>
          <button className="outline-button small" onClick={() => void handleCopyAddress()} type="button">
            Copy Address
          </button>
        </div>
      ) : null}

      <div className="transport-card">
        <h4>SUBWAY</h4>
        {location.subwayLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="transport-card">
        <h4>BUS</h4>
        {location.busLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}

export default LocationSection;
