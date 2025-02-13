import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarDateChangeHandler } from "../../types/calendarType";
import * as S from "./CalendarStyle";

import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedMonth, setdisplayedMonth] = useState(new Date());

  const handlePreviousMonthClick = () => {
    setdisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setdisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1)
    );
  };

  const handleDateChange: CalendarDateChangeHandler = (value) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;

    if (selectedValue) {
      setSelectedDate(selectedValue);
    }
  };

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.ArrowButton direction="left" onClick={handlePreviousMonthClick}>
          <S.ArrowIcon src={arrowLeftIcon} alt="이전 달" />
        </S.ArrowButton>
        <S.MonthTitle>
          {displayedMonth.getFullYear()}년 {displayedMonth.getMonth() + 1}월
        </S.MonthTitle>
        <S.ArrowButton direction="right" onClick={handleNextMonth}>
          <S.ArrowIcon src={arrowRightIcon} alt="다음 달" />
        </S.ArrowButton>
      </S.CalendarHeader>
      <S.StyledCalendar>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          activeStartDate={displayedMonth}
          defaultValue={new Date()}
          defaultActiveStartDate={new Date()}
          showNavigation={false}
          locale="en"
          formatDay={(_, date) => date.getDate().toString()}
          showFixedNumberOfWeeks={true}
        />
      </S.StyledCalendar>
    </S.CalendarContainer>
  );
};

export default CalendarSection;
