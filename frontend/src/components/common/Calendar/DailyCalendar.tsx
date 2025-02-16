import BaseCalendar from "./BaseCalendar";
import { convertDateToString } from "../../../utils/timeFormatUtils";

interface DailyCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DailyCalendar = ({ selectedDate, onDateChange }: DailyCalendarProps) => (
  <BaseCalendar
    selectedDate={selectedDate}
    onDateChange={onDateChange}
    tileClassName={({ date }) =>
      convertDateToString(date) === convertDateToString(selectedDate)
        ? "highlighted-day"
        : ""
    }
  />
);

export default DailyCalendar;
