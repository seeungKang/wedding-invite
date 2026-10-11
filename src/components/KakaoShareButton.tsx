import { useEffect, useState } from "react";

const KAKAO_JAVASCRIPT_KEY = "1a0a405dc50cdb6d57eea240960c01f3";
const INVITATION_URL = "https://wedding-invite-bay-tau.vercel.app/";
const IMAGE_URL = `${INVITATION_URL}images/selected-01.webp`;
const SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js";
const SDK_INTEGRITY = "sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy";

type KakaoSdk = {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl: string;
        imageWidth: number;
        imageHeight: number;
        link: { webUrl: string; mobileWebUrl: string };
      };
      buttons: Array<{
        title: string;
        link: { webUrl: string; mobileWebUrl: string };
      }>;
    }) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

function KakaoShareButton() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.integrity = SDK_INTEGRITY;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => {
      if (!active) {
        return;
      }
      try {
        if (!window.Kakao) {
          throw new Error("Kakao SDK unavailable");
        }
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
        }
        setIsReady(true);
      } catch {
        setError("카카오 공유를 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    };
    script.onerror = () => {
      if (active) {
        setError("카카오 공유를 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    };
    document.head.appendChild(script);
    return () => {
      active = false;
      script.remove();
    };
  }, []);

  const handleShare = () => {
    if (!window.Kakao?.isInitialized()) {
      setError("카카오 공유를 준비하지 못했습니다. 페이지를 새로고침해 주세요.");
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "세응 ♡ 하얀 결혼식에 초대합니다",
          description: "2026년 12월 19일 오후 1시 · 네이버 1784 스카이홀",
          imageUrl: IMAGE_URL,
          imageWidth: 967,
          imageHeight: 1450,
          link: { webUrl: INVITATION_URL, mobileWebUrl: INVITATION_URL },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: { webUrl: INVITATION_URL, mobileWebUrl: INVITATION_URL },
          },
        ],
      });
      setError("");
    } catch {
      setError("카카오 공유를 열지 못했습니다. 앱의 도메인 설정을 확인해 주세요.");
    }
  };

  return (
    <section className="section kakao-share" aria-label="청첩장 공유">
      <button
        className="kakao-share-button"
        type="button"
        onClick={handleShare}
        disabled={!isReady}
      >
        카카오톡으로 공유하기
      </button>
      {error ? <p className="kakao-share-error" role="alert">{error}</p> : null}
    </section>
  );
}

export default KakaoShareButton;