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
      <div className="venue-notices">
        <aside className="venue-notice" aria-labelledby="venue-access-heading">
          <svg className="venue-notice-icon" viewBox="0 0 96 64" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 54V18h36v36M10 54h40M18 54V25h24v29M30 25v29" />
              <path d="M24 11l6-6 6 6M30 5v12M63 44V22m-5 6 5-6 5 6" />
            </g>
            <g fill="currentColor" fontFamily="Georgia, serif" fontSize="13" textAnchor="middle">
              <text x="76" y="18">28F</text>
              <text x="76" y="57">1F</text>
            </g>
          </svg>
          <h4 id="venue-access-heading">스카이홀 이용 안내</h4>
          <p className="venue-access-note">
        스카이홀은 <strong>1층에서만</strong> 올라가실 수 있습니다.
        <br />
        반드시 1층에서 엘리베이터를 이용해
        <br />
        28층 스카이홀로 올라와 주세요.
          </p>
        </aside>
        <aside className="venue-notice" aria-labelledby="venue-flower-heading">
          <svg className="venue-notice-icon" viewBox="0 0 96 64" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="48" cy="25" rx="15" ry="18" />
              <ellipse cx="48" cy="25" rx="9" ry="12" />
              <path d="M42 42l-6 16m18-16 6 16M40 48h16M42 12l-4-4m16 4 4-4M34 22l-5-1m33 1 5-1M35 33l-5 3m31-3 5 3" />
              <path d="M46 39l-6 3 6 3 2-4 2 4 6-3-6-3M46 44l-3 8m7-8 3 8" />
              <circle cx="48" cy="7" r="3" />
              <circle cx="34" cy="15" r="3" />
              <circle cx="62" cy="15" r="3" />
              <circle cx="32" cy="28" r="3" />
              <circle cx="64" cy="28" r="3" />
            </g>
            <path d="M25 54L71 8" stroke="#eeeee4" strokeWidth="7" />
            <path d="M25 54L71 8" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h4 id="venue-flower-heading">화환 안내</h4>
          <p className="venue-flower-note">
        사옥 예식 특성상 화환 배치가 어려운 점
        <br />
        너른 양해 부탁드리며, 따뜻한 축하를
        <br />
        감사히 마음에 담겠습니다.
          </p>
        </aside>
      </div>
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
