import ChristmasSprig from "./ChristmasSprig";

import type { FooterContent } from "../types/wedding";

type FooterMessageProps = FooterContent;

function FooterMessage({ tagline, copyright }: FooterMessageProps) {
  return (
    <section className="section footer">
      <ChristmasSprig className="footer-sprig" />
      <p className="winter-footer-message">따뜻한 겨울날,<br />저희의 시작을 함께해 주세요.</p>
      <p className="footer-tagline">{tagline}</p>
      <div className="footer-dots">
        <span />
        <span />
        <span />
      </div>
      <p className="footer-copy">{copyright}</p>
    </section>
  );
}

export default FooterMessage;
