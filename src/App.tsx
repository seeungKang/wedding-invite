import "./App.css";
import "./christmas.css";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import AccountSection from "./components/AccountSection";
import CalendarSection from "./components/CalendarSection";
import FooterMessage from "./components/FooterMessage";
import Gallery from "./components/Gallery";
import KakaoShareButton from "./components/KakaoShareButton";
import LocationSection from "./components/LocationSection";
import WeddingLettering from "./components/WeddingLettering";
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
  const previewLoadingScreen =
    import.meta.env.DEV && new URLSearchParams(window.location.search).has("previewLoader");
  const skipInitialLoader = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(
    window.location.hostname,
  ) && !previewLoadingScreen;
  const handDrawnCoupleSrc = `${import.meta.env.BASE_URL}images/hand-drawn-couple.png`;
  const loadingTopSrc = `${import.meta.env.BASE_URL}images/loading-top.avif`;
  const loadingBottomSrc = `${import.meta.env.BASE_URL}images/loading-bottom.avif`;
  const introIllustrationRef = useRef<HTMLImageElement | null>(null);
  const loadingFigureRef = useRef<HTMLDivElement | null>(null);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>(
    skipInitialLoader ? "done" : "loading",
  );
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
          loadingTopSrc,
          loadingBottomSrc,
          locationInfo.mapPreviewSrc,
          ...galleryItems.flatMap((item) => [item.thumbSrc, item.fullSrc]),
        ]),
      ),
    [handDrawnCoupleSrc, loadingTopSrc, loadingBottomSrc],
  );

  useEffect(() => {
    if (previewLoadingScreen || skipInitialLoader) {
      return;
    }
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
        const loadingFigureRect = loadingFigureRef.current?.getBoundingClientRect();
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        if (targetRect !== undefined && loadingFigureRect !== undefined) {
          setLoaderTargetStyle({
            "--loader-target-x": `${targetRect.left + targetRect.width / 2 - viewportCenterX}px`,
            "--loader-target-y": `${targetRect.top + targetRect.height / 2 - viewportCenterY}px`,
            "--loader-target-scale": targetRect.width / loadingFigureRect.width,
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
  }, [preloadUrls, previewLoadingScreen, skipInitialLoader]);

  return (
    <div className={`wedding-app wedding-app--${loaderPhase}`}>
      <main className="wedding-shell">
        <section className="hero">
          <div className="hero-photo">
            <img
              className="hero-image"
              src={galleryItems[0]?.fullSrc}
              alt="청첩장 대표 이미지"
            />
            <div className="hero-sky-date">
              <p className="hero-sky-date-number">2026. 12. 19</p>
              <p className="hero-sky-date-time">토요일 <span>·</span> 오후 1시</p>
            </div>
            <div className="hero-lettering-overlay">
              <WeddingLettering animate={loaderPhase === "done"} />
            </div>
          </div>
          <div className="hero-content">
            <p className="cover-couple-names">강세응 <span>그리고</span> 김하얀</p>
            <p className="hero-summary">{heroContent.eventSummary}</p>
            <p className="winter-venue">{eventInfo.venueName}</p>
          </div>
        </section>

        <section className="section invitation">
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
          <p>{eventInfo.venueName}</p>
          <p>{eventInfo.venueAddress}</p>
        </section>

        <KakaoShareButton />
        <FooterMessage {...footerContent} />
      </main>

      {loaderPhase !== "done" ? (
        <div className={`loading-screen loading-screen--${loaderPhase}`} aria-hidden="true">
          <div className="loading-botanical-frame">
            <img className="loading-botanical loading-botanical--top" src={loadingTopSrc} alt="" />
            <img className="loading-botanical loading-botanical--bottom" src={loadingBottomSrc} alt="" />
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
          <div ref={loadingFigureRef} className="loading-figure" style={loaderTargetStyle}>
            <img className="loading-illustration" src={handDrawnCoupleSrc} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
