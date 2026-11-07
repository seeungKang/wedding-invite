import { useState } from "react";

import VenueMap from "./VenueMap";

import type { LocationInfo } from "../types/wedding";

type LocationSectionProps = {
  location: LocationInfo;
};

function LocationSection({ location }: LocationSectionProps) {
  const [linkError, setLinkError] = useState<string | null>(null);

  const handleOpenTmap = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    if (!isMobile) {
      setLinkError("TMAP 길찾기는 휴대전화에서 이용해 주세요.");
      return;
    }
    const params = new URLSearchParams({
      goalname: location.venueName,
      goalx: String(location.longitude),
      goaly: String(location.latitude),
    });
    setLinkError("TMAP이 열리지 않으면 앱 설치 여부를 확인하거나 다른 지도 버튼을 이용해 주세요.");
    window.location.assign(`tmap://route?${params.toString()}`);
  };

  return (
    <section className="section location" id="location">
      <h2 className="section-title">오시는 길</h2>
      <div className="section-rule" />

      <VenueMap location={location} />

      <h3 className="venue-title">{location.venueName}</h3>
      <p className="venue-text">{location.venueAddress}</p>
      <p className="venue-access-note">
        스카이홀은 <strong>1층에서만</strong> 올라가실 수 있습니다.
        <br />
        반드시 1층에서 엘리베이터를 이용해
        <br />
        28층 스카이홀로 올라와 주세요.
      </p>
      <p className="venue-flower-note">화환은 정중히 사양합니다.</p>
      {location.venuePhone.length > 0 ? (
        <a className="venue-text phone-link" href={`tel:${location.venuePhone}`}>
          {location.venuePhone}
        </a>
      ) : null}

      <div className="location-cta-row">
        <a
          className="outline-button cta"
          href={location.naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          네이버 지도
        </a>
        <a
          className="outline-button cta"
          href={location.kakaoNaviUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오 내비
        </a>
        <button className="outline-button cta" onClick={handleOpenTmap} type="button">
          TMAP
        </button>
      </div>

      {linkError !== null ? (
        <p className="location-notice" role="status">{linkError}</p>
      ) : null}

      <div className="transport-card">
        <h4>지하철</h4>
        {location.subwayLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="transport-card">
        <h4>버스</h4>
        {location.busLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}

export default LocationSection;
