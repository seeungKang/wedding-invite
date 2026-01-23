import { useState } from "react";
import "./App.css";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const images = [
    "/wedding-invite/DSC03004.JPG",
    "/wedding-invite/DSC03014.JPG",
    "/wedding-invite/DSC03025.JPG",
    "/wedding-invite/DSC03034.JPG",
    "/wedding-invite/DSC03037.JPG",
    "/wedding-invite/DSC03081.JPG",
    "/wedding-invite/DSC03094.JPG",
    "/wedding-invite/DSC03105.JPG",
    "/wedding-invite/DSC03114.JPG",
    "/wedding-invite/DSC03116.JPG",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const copyToClipboard = (account: string, label: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="wedding-container">
      <div className="wedding-card">
        {/* 이미지 갤러리 */}
        <div className="gallery-section">
          <div className="gallery-container">
            <img
              src={images[currentImageIndex]}
              alt={`wedding photo ${currentImageIndex + 1}`}
              className="gallery-image"
            />
            <button className="gallery-btn prev" onClick={prevImage}>
              ‹
            </button>
            <button className="gallery-btn next" onClick={nextImage}>
              ›
            </button>
          </div>
          <div className="gallery-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 상단 장식 */}
        <div className="decoration-top">
          <div className="flower flower-1"></div>
          <div className="flower flower-2"></div>
          <div className="flower flower-3"></div>
        </div>

        {/* 제목 */}
        <div className="card-header">
          <p className="subtitle">We are getting married</p>
          <h1 className="main-title">결혼식 청첩장</h1>
        </div>

        {/* 신랑 신부 */}
        <div className="couple-section">
          <div className="person groom">
            <div className="person-icon">👨</div>
            <h2>신랑</h2>
            <p className="name">강세응</p>
          </div>
          <div className="ampersand">♥</div>
          <div className="person bride">
            <div className="person-icon">👰</div>
            <h2>신부</h2>
            <p className="name">김하얀</p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="divider"></div>

        {/* 식 정보 */}
        <div className="ceremony-section">
          <div className="ceremony-item">
            <h3>📅 예식 일시</h3>
            <p className="date">2026년 12월 19일 (토)</p>
            <p className="time">오후 1시</p>
          </div>

          <div className="ceremony-item">
            <h3>📍 예식 장소</h3>
            <p className="location">네이버 1784</p>
            <p className="address">28층 스카이홀</p>
          </div>

          <div className="ceremony-item">
            <h3>🍽️ 피로연</h3>
            <p className="time">식후 즉시</p>
            <p className="location">28층 스카이홀</p>
          </div>
        </div>

        {/* 연락처 */}
        <div className="contact-section">
          <h3>📞 연락처</h3>
          <div className="contact-item">
            <span className="label">신랑측 혼주</span>
            <span className="phone">010-1234-5678</span>
          </div>
          <div className="contact-item">
            <span className="label">신부측 혼주</span>
            <span className="phone">010-9876-5432</span>
          </div>
        </div>

        {/* 축의금 계좌 */}
        <div className="account-section">
          <h3>💳 축의금 계좌</h3>
          <div className="account-card">
            <div className="account-item">
              <div className="account-header">
                <p className="account-label">
                  <strong>신랑</strong>
                </p>
                <p className="account-name">강세응</p>
              </div>
              <p className="account-number">우리은행 1234-567-890123</p>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard("우리은행 1234-567-890123", "groom")
                }
              >
                {copiedAccount === "groom" ? "✓ 복사됨" : "복사"}
              </button>
            </div>
          </div>
          <div className="account-card">
            <div className="account-item">
              <div className="account-header">
                <p className="account-label">
                  <strong>신부</strong>
                </p>
                <p className="account-name">김하얀</p>
              </div>
              <p className="account-number">국민은행 098-765-432109</p>
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard("국민은행 098-765-432109", "bride")
                }
              >
                {copiedAccount === "bride" ? "✓ 복사됨" : "복사"}
              </button>
            </div>
          </div>
        </div>

        {/* 하단 메시지 */}
        <div className="message-section">
          <p>저희의 결혼식에 참석해주시어</p>
          <p>축하해주시는 것으로 깊은 감사를 드립니다.</p>
        </div>

        {/* 하단 장식 */}
        <div className="decoration-bottom">
          <div className="flower flower-1"></div>
          <div className="flower flower-2"></div>
          <div className="flower flower-3"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
