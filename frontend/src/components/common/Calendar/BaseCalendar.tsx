import * as S from "./CalendarStyle";

interface BaseCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  tileClassName?: ({ date }: { date: Date }) => string | undefined;
}

const BaseCalendar = ({
  selectedDate,
  onDateChange,
  tileClassName,
}: BaseCalendarProps) => (
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
      tileClassName={tileClassName}
    />
  </S.CalendarContainer>
);

export default BaseCalendar;
