import { useEffect, useRef, useState } from "react";

import { Value } from "react-calendar/src/shared/types.js";
import convertToLocalDate from "../../../utils/convertToLocalDate";

import * as S from "./BirthdaySelectStyle";

import calendarIcon from "../../../assets/icons/calendar.svg";

interface BirthdaySelectProps {
  value: Date | null;
  onChange: (date: string) => void;
  errorMessage?: string;
}

const BirthdaySelect = ({
  value,
  onChange,
  errorMessage,
}: BirthdaySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateClick = (date: Value) => {
    if (date instanceof Date) {
      onChange(convertToLocalDate(date).toISOString().split("T")[0]);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !datePickerRef.current ||
        datePickerRef.current.contains(e.target as Node)
      )
        return;

      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <S.BirthdaySelectContainer ref={datePickerRef}>
      <S.Label>생년월일</S.Label>

      <S.InputContainer
        type="button"
        onClick={handleInputClick}
        isEmpty={!value}
        isOpened={isOpen}
        hasError={!!errorMessage}
      >
        {value
          ? convertToLocalDate(value).toISOString().split("T")[0]
          : "생년월일을 선택해주세요"}

        <S.CalendarIcon src={calendarIcon} alt="달력" />
      </S.InputContainer>

      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

      {isOpen && (
        <S.StyledCalendar
          onChange={(date) => handleDateClick(date)}
          value={value}
          formatDay={(_, date) => date.getDate().toString()}
        />
      )}
    </S.BirthdaySelectContainer>
  );
};

export default BirthdaySelect;
