import type { FooterContent } from "../types/wedding";

type FooterMessageProps = FooterContent;

function FooterMessage({ tagline, copyright }: FooterMessageProps) {
  return (
    <section className="section footer">
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
