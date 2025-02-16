import BaseCalendar from "./BaseCalendar";

interface MonthlyCalendarProps {
  selectedDate: Date;
  onMonthChange: (date: Date) => void;
}

const MonthlyCalendar = ({
  selectedDate,
  onMonthChange,
}: MonthlyCalendarProps) => (
  <BaseCalendar
    selectedDate={selectedDate}
    onDateChange={onMonthChange}
    tileClassName={({ date }) =>
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth()
        ? "highlighted-month"
        : ""
    }
    isMonthly={true}
  />
);

export default MonthlyCalendar;
