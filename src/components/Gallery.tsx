import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { GalleryItem } from "../types/wedding";
import type { PointerEvent } from "react";

type GalleryProps = {
  items: GalleryItem[];
};

function Gallery({ items }: GalleryProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());
  const pointerStartXRef = useRef<number | null>(null);

  const hasMoreItems = visibleCount < items.length;
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const activeItem = viewerIndex !== null ? items[viewerIndex] ?? null : null;

  const clearActiveFocus = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewerIndex(null);
    clearActiveFocus();
  }, [clearActiveFocus]);

  useEffect(() => {
    if (viewerIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [viewerIndex]);

  useEffect(() => {
    if (viewerIndex === null) {
      return;
    }

    window.setTimeout(() => {
      document
        .querySelector(`[data-viewer-thumb="${viewerIndex}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, 0);
  }, [viewerIndex]);

  useEffect(() => {
    if (viewerIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseViewer();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setViewerIndex((previous) => {
          if (previous === null) {
            return previous;
          }
          return (previous - 1 + items.length) % items.length;
        });
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setViewerIndex((previous) => {
          if (previous === null) {
            return previous;
          }
          return (previous + 1) % items.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseViewer, items.length, viewerIndex]);

  const handleImageError = (id: string) => {
    setFailedImageIds((previous) => new Set(previous).add(id));
  };

  const handleOpenViewer = (index: number) => {
    setViewerIndex(index);
  };

  const handlePrevious = () => {
    setViewerIndex((previous) => {
      if (previous === null) {
        return previous;
      }
      return (previous - 1 + items.length) % items.length;
    });
  };

  const handleNext = () => {
    setViewerIndex((previous) => {
      if (previous === null) {
        return previous;
      }
      return (previous + 1) % items.length;
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) {
      return;
    }

    pointerStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) {
      return;
    }

    const pointerStartX = pointerStartXRef.current;
    pointerStartXRef.current = null;

    if (pointerStartX === null) {
      return;
    }

    const swipeDistance = event.clientX - pointerStartX;
    const minimumSwipeDistance = 48;

    if (Math.abs(swipeDistance) < minimumSwipeDistance) {
      return;
    }

    if (swipeDistance < 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  const handlePointerCancel = () => {
    pointerStartXRef.current = null;
  };

  return (
    <section className="section gallery" id="gallery">
      <h2 className="section-title">갤러리</h2>
      <div className="section-rule" />

      <div className="gallery-grid">
        {visibleItems.map((item, index) => {
          const isFailed = failedImageIds.has(item.id);

          return (
            <button
              key={item.id}
              className="gallery-thumb-button"
              onClick={() => handleOpenViewer(index)}
              aria-label={`${index + 1}번 사진 보기`}
              type="button"
            >
              {isFailed ? (
                <div className="gallery-fallback">이미지를 불러오지 못했습니다.</div>
              ) : (
                <img
                  className="gallery-thumb"
                  src={item.thumbSrc}
                  alt={item.alt}
                  loading="lazy"
                  onError={() => handleImageError(item.id)}
                />
              )}
            </button>
          );
        })}
      </div>

      {hasMoreItems ? (
        <button
          className="outline-button"
          onClick={() => setVisibleCount(items.length)}
          type="button"
        >
          사진 전체보기
        </button>
      ) : null}

      {activeItem !== null ? (
        <div className="viewer-overlay" role="dialog" aria-modal="true">
          <div className="viewer-toolbar">
            <p className="viewer-title">갤러리</p>
            <button
              className="viewer-close"
              onClick={handleCloseViewer}
              aria-label="사진 뷰어 닫기"
              type="button"
            >
              ✕
            </button>
          </div>

          <div
            className="viewer-stage"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="viewer-image-frame">
              <button
                className="viewer-nav viewer-prev"
                onClick={handlePrevious}
                aria-label="이전 사진"
                type="button"
              >
                <span className="viewer-arrow viewer-arrow--prev" aria-hidden="true" />
              </button>
              <img
                className="viewer-image"
                src={activeItem.fullSrc}
                alt={activeItem.alt}
                draggable="false"
              />
              <button
                className="viewer-nav viewer-next"
                onClick={handleNext}
                aria-label="다음 사진"
                type="button"
              >
                <span className="viewer-arrow viewer-arrow--next" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="viewer-thumbnail-strip" aria-label="사진 미리보기">
            {items.map((item, index) => (
              <button
                key={`viewer-thumb-${item.id}`}
                className={`viewer-thumb-button${index === viewerIndex ? " is-active" : ""}`}
                data-viewer-thumb={index}
                onClick={() => setViewerIndex(index)}
                aria-label={`${index + 1}번 사진으로 이동`}
                type="button"
              >
                <img className="viewer-thumb-image" src={item.thumbSrc} alt="" />
              </button>
            ))}
          </div>
          <p className="viewer-index">{`${(viewerIndex ?? 0) + 1} / ${items.length}`}</p>
        </div>
      ) : null}
    </section>
  );
}

export default Gallery;
