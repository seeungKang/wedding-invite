import { useMemo, useState } from "react";

import type { GalleryItem } from "../types/wedding";

type GalleryProps = {
  items: GalleryItem[];
};

function Gallery({ items }: GalleryProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  const hasMoreItems = visibleCount < items.length;
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const indexedItem = viewerIndex !== null ? items[viewerIndex] : undefined;
  const activeItem = indexedItem ?? null;

  const handleImageError = (id: string) => {
    setFailedImageIds((previous) => new Set(previous).add(id));
  };

  const handleOpenViewer = (index: number) => {
    setViewerIndex(index);
  };

  const handleCloseViewer = () => {
    setViewerIndex(null);
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

  return (
    <section className="section gallery" id="gallery">
      <h2 className="section-title">갤러리</h2>
      <div className="section-rule" />

      <div className="gallery-grid">
        {visibleItems.map((item, index) => {
          const isFailed = failedImageIds.has(item.id);
          const absoluteIndex = index;

          return (
            <button
              key={item.id}
              className="gallery-thumb-button"
              onClick={() => handleOpenViewer(absoluteIndex)}
              aria-label={`${absoluteIndex + 1}번 사진 보기`}
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
          onClick={() => setVisibleCount((currentCount) => currentCount + 6)}
          type="button"
        >
          사진 전체보기
        </button>
      ) : null}

      {activeItem !== null ? (
        <div className="viewer-overlay" role="dialog" aria-modal="true">
          <button
            className="viewer-close"
            onClick={handleCloseViewer}
            aria-label="사진 뷰어 닫기"
            type="button"
          >
            닫기
          </button>
          <button
            className="viewer-nav viewer-prev"
            onClick={handlePrevious}
            aria-label="이전 사진"
            type="button"
          >
            이전
          </button>
          <img className="viewer-image" src={activeItem.fullSrc} alt={activeItem.alt} />
          <button
            className="viewer-nav viewer-next"
            onClick={handleNext}
            aria-label="다음 사진"
            type="button"
          >
            다음
          </button>
          <p className="viewer-index">{`${(viewerIndex ?? 0) + 1} / ${items.length}`}</p>
        </div>
      ) : null}
    </section>
  );
}

export default Gallery;
