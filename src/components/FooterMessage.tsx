type FooterMessageProps = {
  messageLines: string[];
};

function FooterMessage({ messageLines }: FooterMessageProps) {
  return (
    <section className="message-section">
      {messageLines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
  );
}

export default FooterMessage;
