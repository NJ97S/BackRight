const convertToLocalDate = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000);

export default convertToLocalDate;
