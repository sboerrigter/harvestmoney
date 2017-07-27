function lastDayOfLastMonth() {
  const date = new Date();
  date.setDate(0);

  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 2).toString(); // Should be changed to + 1 when finished
  let day = date.getDate().toString();

  if (month.length !== 2) {
    month = `0${month}`;
  }

  if (day.length !== 2) {
    day = `0${day}`;
  }

  return `${year}${month}${day}`;
}

export default {
  lastDayOfLastMonth
};
