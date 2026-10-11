import "./App.css";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import AccountSection from "./components/AccountSection";
import CalendarSection from "./components/CalendarSection";
import FooterMessage from "./components/FooterMessage";
import Gallery from "./components/Gallery";
import KakaoShareButton from "./components/KakaoShareButton";
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

import type { CSSProperties } from "react";

type LoaderPhase = "loading" | "settling" | "done";

const MINIMUM_LOADING_MS = 3000;
const fireworkBursts = Array.from({ length: 4 }, (_, index) => index);
const floatingHearts = Array.from({ length: 8 }, (_, index) => index);
const christmasDecorationPositions = [
  "top",
  "top-right",
  "right",
  "bottom-right",
  "bottom",
  "bottom-left",
  "left",
  "top-left",
];

function scrollToPageTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function App() {
  const handDrawnCoupleSrc = `${import.meta.env.BASE_URL}images/hand-drawn-couple.png`;
  const introIllustrationRef = useRef<HTMLImageElement | null>(null);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>("loading");
  const [loaderTargetStyle, setLoaderTargetStyle] = useState<CSSProperties | undefined>();

  useLayoutEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    const originalHtmlScrollBehavior = document.documentElement.style.scrollBehavior;

    window.history.scrollRestoration = "manual";
    document.documentElement.style.scrollBehavior = "auto";
    scrollToPageTop();

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
      document.documentElement.style.scrollBehavior = originalHtmlScrollBehavior;
    };
  }, []);

  const preloadUrls = useMemo(
    () =>
      Array.from(
        new Set([
          handDrawnCoupleSrc,
          locationInfo.mapPreviewSrc,
          ...galleryItems.flatMap((item) => [item.thumbSrc, item.fullSrc]),
        ]),
      ),
    [handDrawnCoupleSrc],
  );

  useEffect(() => {
    let isCancelled = false;
    const originalBodyOverflow = document.body.style.overflow;

    scrollToPageTop();
    document.body.style.overflow = "hidden";

    const loadFonts =
      "fonts" in document ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const loadImages = Promise.all(preloadUrls.map((src) => preloadImage(src))).then(
      () => undefined,
    );
    const minimumLoadingTime = wait(MINIMUM_LOADING_MS);

    void Promise.all([loadFonts, loadImages, minimumLoadingTime]).then(() => {
      if (isCancelled) {
        return;
      }

      window.requestAnimationFrame(() => {
        scrollToPageTop();

        const targetRect = introIllustrationRef.current?.getBoundingClientRect();
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        if (targetRect !== undefined) {
          setLoaderTargetStyle({
            "--loader-target-x": `${targetRect.left + targetRect.width / 2 - viewportCenterX}px`,
            "--loader-target-y": `${targetRect.top + targetRect.height / 2 - viewportCenterY}px`,
            "--loader-target-scale": targetRect.width / 180,
          } as CSSProperties);
        }

        setLoaderPhase("settling");
        window.setTimeout(() => {
          if (!isCancelled) {
            document.body.style.overflow = originalBodyOverflow;
            setLoaderPhase("done");
          }
        }, 950);
      });
    });

    return () => {
      isCancelled = true;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [preloadUrls]);

  return (
    <div className={`wedding-app wedding-app--${loaderPhase}`}>
      <main className="wedding-shell">
        <section className="hero">
          <img
            className="hero-image"
            src={galleryItems[0]?.fullSrc}
            alt="청첩장 대표 이미지"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>{heroContent.eyebrow}</h1>
            <p className="hero-names">{heroContent.coupleNames}</p>
            <div className="hero-line" />
            <p className="hero-summary">{heroContent.eventSummary}</p>
          </div>
        </section>

        <section className="section invitation">
          <div className="intro-heart">♥</div>
          <h2 className="section-title">{introContent.sectionTitle}</h2>
          <div className="section-rule" />
          <img
            ref={introIllustrationRef}
            className="intro-illustration"
            src={handDrawnCoupleSrc}
            alt="신랑 신부 손그림"
            loading="lazy"
          />
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

        <KakaoShareButton />
        <FooterMessage {...footerContent} />
      </main>

      {loaderPhase !== "done" ? (
        <div className={`loading-screen loading-screen--${loaderPhase}`} aria-hidden="true">
          <div className="christmas-frame">
            {christmasDecorationPositions.map((position) => (
              <div
                key={position}
                className={`christmas-decoration christmas-decoration--${position}`}
              >
                <span className="christmas-line" />
                <span className="christmas-leaf christmas-leaf--1" />
                <span className="christmas-leaf christmas-leaf--2" />
                <span className="christmas-leaf christmas-leaf--3" />
                <span className="christmas-berry christmas-berry--1" />
                <span className="christmas-berry christmas-berry--2" />
                <span className="christmas-bulb christmas-bulb--1" />
                <span className="christmas-bulb christmas-bulb--2" />
                <span className="christmas-star">✦</span>
              </div>
            ))}
          </div>
          <div className="loading-celebration">
            {fireworkBursts.map((burst) => (
              <span
                key={`burst-${burst}`}
                className={`firework-burst firework-burst--${burst + 1}`}
              />
            ))}
            {floatingHearts.map((heart) => (
              <span key={`heart-${heart}`} className={`loader-heart loader-heart--${heart + 1}`}>
                ♥
              </span>
            ))}
          </div>
          <div className="loading-figure" style={loaderTargetStyle}>
            <img className="loading-illustration" src={handDrawnCoupleSrc} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
