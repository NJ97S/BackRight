import BaseCalendar from "./BaseCalendar";
import { convertDateToString } from "../../../utils/timeFormatUtils";

const getMondayOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);

  monday.setDate(date.getDate() + diff);
  return monday;
};

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const WeeklyCalendar = ({
  selectedDate,
  onDateChange,
}: WeeklyCalendarProps) => {
  const startOfWeek = getMondayOfWeek(selectedDate);

  const highlightedDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);

    date.setDate(startOfWeek.getDate() + i);

    return convertDateToString(date);
  });

  return (
    <BaseCalendar
      selectedDate={selectedDate}
      onDateChange={onDateChange}
      tileClassName={({ date }) => {
        const dateStr = convertDateToString(date);
        const index = highlightedDates.indexOf(dateStr);

        if (index === -1) return "";

        if (index === 0) return "highlighted-week-left";
        if (index === 6) return "highlighted-week-right";
        return "highlighted-week-middle";
      }}
    />
  );
};

export default WeeklyCalendar;
