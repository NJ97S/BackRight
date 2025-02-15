import * as S from "./CalendarStyle";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateChange }: CalendarProps) => (
  <S.CalendarContainer>
    <S.Calendar
      onChange={(value) => onDateChange(value as Date)}
      value={selectedDate}
      locale="ko-KR"
      calendarType="gregory"
      next2Label={null}
      prev2Label={null}
      formatDay={(_, date) => date.getDate().toString()}
      formatShortWeekday={(_, date) =>
        date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
      }
    />
  </S.CalendarContainer>
);

export default Calendar;
