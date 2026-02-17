import type { CalendarInfo } from "../types/wedding";

type CalendarSectionProps = {
  calendar: CalendarInfo;
};

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function CalendarSection({ calendar }: CalendarSectionProps) {
  const firstDay = new Date(calendar.year, calendar.month - 1, 1).getDay();
  const lastDate = new Date(calendar.year, calendar.month, 0).getDate();
  const dayCells = Array.from({ length: firstDay + lastDate }, (_, index) => {
    const dateNumber = index - firstDay + 1;
    return dateNumber > 0 ? dateNumber : null;
  });

  return (
    <section className="section calendar">
      <h2 className="month-title">{calendar.monthLabel}</h2>
      <p className="month-subtitle">{`${calendar.year}. ${String(calendar.month).padStart(2, "0")}. ${String(calendar.highlightedDay).padStart(2, "0")} SAT`}</p>

      <div className="calendar-grid weekday">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid dates">
        {dayCells.map((day, index) => {
          if (day === null) {
            return <span key={`blank-${index}`} className="day-cell empty" />;
          }

          const isHighlighted = day === calendar.highlightedDay;
          return (
            <span
              key={`day-${day}`}
              className={`day-cell ${isHighlighted ? "highlighted" : ""}`}
            >
              {day}
            </span>
          );
        })}
      </div>

      <p className="calendar-caption">{calendar.caption}</p>
    </section>
  );
}

export default CalendarSection;
