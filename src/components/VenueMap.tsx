import { useEffect, useRef, useState } from "react";

import { loadNaverMaps } from "../lib/naverMaps";

import type { LocationInfo } from "../types/wedding";

export default function VenueMap({ location }: { location: LocationInfo }) {
  const frameRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("waiting");
  const keyId = import.meta.env.VITE_NAVER_MAP_KEY_ID?.trim();

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!keyId || !frame || !canvas) {return;}

    let cancelled = false;
    let disposeMap: (() => void) | undefined;
    const authFailed = () => {
      if (cancelled) {return;}
      disposeMap?.();
      disposeMap = undefined;
      setReady(false);
      setStatus("SDK_AUTH_FAILED");
    };
    window.addEventListener("naver-map-auth-failed", authFailed);
    const initialize = async () => {
      setStatus("loading");
      try {
        const maps = await loadNaverMaps(keyId);
        if (cancelled) {return;}
        const center = new maps.LatLng(location.latitude, location.longitude);
        const map = new maps.Map(canvas, {
          center,
          zoom: 16,
          scrollWheel: false,
          zoomControl: false,
        });
        disposeMap = () => map.destroy();
        const marker = new maps.Marker({
          map,
          position: center,
          title: location.venueName,
        });
        const resize = new ResizeObserver(() => {
          map.setSize({ width: canvas.clientWidth, height: canvas.clientHeight });
        });
        resize.observe(canvas);
        disposeMap = () => {
          resize.disconnect();
          marker.setMap(null);
          map.destroy();
        };
        setReady(true);
        setStatus("ready");
      } catch (error) {
        disposeMap?.();
        disposeMap = undefined;
        if (!cancelled) {
          setReady(false);
          setStatus(error instanceof Error && error.message.startsWith("SDK_") ? error.message : "MAP_INIT_FAILED");
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void initialize();
      }
    }, { rootMargin: "200px" });
    observer.observe(frame);

    return () => {
      cancelled = true;
      window.removeEventListener("naver-map-auth-failed", authFailed);
      observer.disconnect();
      disposeMap?.();
    };
  }, [keyId, location.latitude, location.longitude, location.venueName]);

  return (
    <figure className="location-map" ref={frameRef} data-map-status={status}>
      <div className="venue-map-frame">
        <div ref={canvasRef} className="venue-map-canvas" aria-hidden={!ready} role="region" aria-label={`${location.venueName} 위치 지도`} />
        {!ready ? (
          <a href={location.naverMapUrl} target="_blank" rel="noopener noreferrer" aria-label="네이버 지도에서 예식장 위치 보기">
            <img className="map-preview" src={location.mapPreviewSrc} alt={location.mapPreviewAlt} width={1000} height={800} loading="lazy" />
          </a>
        ) : null}
      </div>
      {!ready ? (
        <figcaption>
          지도 출처 · <a href="https://www.navercorp.com/company/contact" target="_blank" rel="noopener noreferrer">NAVER 공식 안내</a>
        </figcaption>
      ) : null}
    </figure>
  );
}
