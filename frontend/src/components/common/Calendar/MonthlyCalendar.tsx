import BaseCalendar from "./BaseCalendar";

interface MonthlyCalendarProps {
  selectedDate: Date;
  onMonthChange: (date: Date) => void;
}

const MonthlyCalendar = ({
  selectedDate,
  onMonthChange,
}: MonthlyCalendarProps) => (
  <BaseCalendar selectedDate={selectedDate} onDateChange={onMonthChange} />
);

export default MonthlyCalendar;
