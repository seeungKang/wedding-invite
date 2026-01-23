import "./App.css";

function App() {
  return (
    <div className="wedding-container">
      <div className="wedding-card">
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
            <h2>신랑</h2>
            <p className="name">강세응</p>
          </div>
          <div className="ampersand">&</div>
          <div className="person bride">
            <h2>신부</h2>
            <p className="name">김하얀</p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="divider"></div>

        {/* 식 정보 */}
        <div className="ceremony-section">
          <div className="ceremony-item">
            <h3>예식 일시</h3>
            <p className="date">2026년 12월 19일 (토)</p>
            <p className="time">오후 1시</p>
          </div>

          <div className="ceremony-item">
            <h3>예식 장소</h3>
            <p className="location">네이버 1784</p>
            <p className="address">28층 스카이홀</p>
          </div>

          <div className="ceremony-item">
            <h3>피로연</h3>
            <p className="time">식후 즉시</p>
            <p className="location">28층 스카이홀</p>
          </div>
        </div>

        {/* 연락처 */}
        <div className="contact-section">
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
          <h3>축의금 계좌</h3>
          <div className="account-item">
            <p><strong>신랑:</strong> 우리은행 1234-567-890123 강세응</p>
          </div>
          <div className="account-item">
            <p><strong>신부:</strong> 국민은행 098-765-432109 김하얀</p>
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
