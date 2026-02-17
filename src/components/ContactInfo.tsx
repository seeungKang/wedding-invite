import type { ContactItem } from "../types/wedding";

type ContactInfoProps = {
  contacts: ContactItem[];
};

function ContactInfo({ contacts }: ContactInfoProps) {
  return (
    <section className="contact-section">
      <h3>Contacts</h3>
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-item">
          <span className="label">{contact.label}</span>
          <span className="phone">{contact.phone}</span>
        </div>
      ))}
    </section>
  );
}

export default ContactInfo;
