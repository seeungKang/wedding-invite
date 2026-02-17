import type { CeremonyItem } from "../types/wedding";

type CeremonyInfoProps = {
  items: CeremonyItem[];
};

function CeremonyInfo({ items }: CeremonyInfoProps) {
  return (
    <section className="ceremony-section">
      {items.map((item) => (
        <article key={item.id} className="ceremony-item">
          <h3>{item.title}</h3>
          {item.lines.map((line) => (
            <p key={`${item.id}-${line}`} className="detail-line">
              {line}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
}

export default CeremonyInfo;
