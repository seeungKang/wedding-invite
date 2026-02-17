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
        setLinkError("지도 앱을 열 수 없습니다. 주소를 복사해 주세요.");
      } else {
        setLinkError(null);
      }
    } catch {
      setLinkError("지도 앱을 열 수 없습니다. 주소를 복사해 주세요.");
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.venueAddress);
      setLinkError("주소가 복사되었습니다.");
    } catch {
      setLinkError("주소 복사에 실패했습니다. 수동으로 복사해 주세요.");
    }
  };

  return (
    <section className="section location" id="location">
      <h2 className="section-title">오시는 길</h2>
      <div className="section-rule" />

      <img
        className="map-preview"
        src={location.mapPreviewSrc}
        alt={location.mapPreviewAlt}
        loading="lazy"
      />

      <h3 className="venue-title">{location.venueName}</h3>
      <p className="venue-text">{location.venueAddress}</p>
      {location.venuePhone.length > 0 ? (
        <a className="venue-text phone-link" href={`tel:${location.venuePhone}`}>
          {location.venuePhone}
        </a>
      ) : null}

      <div className="location-cta-row">
        <button
          className="outline-button cta"
          onClick={() => handleOpenExternal(location.naverMapUrl)}
          type="button"
        >
          네이버 지도
        </button>
        <button
          className="outline-button cta"
          onClick={() => handleOpenExternal(location.kakaoNaviUrl)}
          type="button"
        >
          카카오 내비
        </button>
      </div>

      {linkError !== null ? (
        <div className="link-fallback">
          <p>{linkError}</p>
          <button className="outline-button small" onClick={() => void handleCopyAddress()} type="button">
            주소 복사하기
          </button>
        </div>
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
