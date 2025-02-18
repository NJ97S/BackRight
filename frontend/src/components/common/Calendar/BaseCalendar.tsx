import * as S from "./BaseCalendarStyle";

interface BaseCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  tileClassName?: ({ date }: { date: Date }) => string | undefined;
  isMonthly?: boolean;
}

const BaseCalendar = ({
  selectedDate,
  onDateChange,
  tileClassName,
  isMonthly: viewType = false,
}: BaseCalendarProps) => (
  <S.CalendarContainer>
    <S.Calendar
      onChange={(value) => onDateChange(value as Date)}
      value={selectedDate}
      locale="ko-KR"
      calendarType="gregory"
      next2Label={null}
      prev2Label={null}
      defaultView={viewType ? "year" : "month"}
      maxDetail={viewType ? "year" : "month"}
      formatYear={(_, date) => `${date.getFullYear()}년`}
      formatMonth={(_, date) => `${date.getMonth() + 1}월`}
      formatDay={(_, date) => date.getDate().toString()}
      formatShortWeekday={(_, date) =>
        date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
      }
      tileClassName={tileClassName}
      showFixedNumberOfWeeks={true}
    />
  </S.CalendarContainer>
);

export default BaseCalendar;
