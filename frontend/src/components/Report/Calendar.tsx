import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "./CalendarStyle";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {
  const [value, setValue] = useState<Value>(new Date());

  const handleDateChange = (nextValue: Value) => {
    setValue(nextValue);
  };

  return (
    <S.CalendarContainer>
      <Calendar
        onChange={handleDateChange}
        value={value}
        formatDay={(locale, date) => date.getDate().toString()}
        nextLabel={<S.ArrowIcon $direction="right" />}
        prevLabel={<S.ArrowIcon $direction="left" />}
        next2Label={null}
        prev2Label={null}
      />
    </S.CalendarContainer>
  );
};

export default CustomCalendar;
