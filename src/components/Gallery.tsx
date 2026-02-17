import { useState } from "react";

import type { GalleryImage } from "../types/wedding";

type GalleryProps = {
  images: GalleryImage[];
};

function Gallery({ images }: GalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((previousIndex) => (previousIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (previousIndex) => (previousIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <img
          src={images[currentImageIndex]?.src}
          alt={images[currentImageIndex]?.alt}
          className="gallery-image"
        />
        <button
          className="gallery-btn prev"
          onClick={handlePreviousImage}
          aria-label="Previous image"
          type="button"
        >
          {"<"}
        </button>
        <button
          className="gallery-btn next"
          onClick={handleNextImage}
          aria-label="Next image"
          type="button"
        >
          {">"}
        </button>
      </div>
      <div className="gallery-dots">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`dot ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to image ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
