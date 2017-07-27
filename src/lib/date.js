/**
 * Format date
 *
 * @param  {string} date in YYYY-MM-DD format
 * @return {string} in DD/MM/YYYY format
 */
function format(date) {
  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

  return `${day}/${month}/${year}`;
}

/**
 * Get last date of previous month
 * @return {string} in YYYYMMDD format
 */
function getLastDayOfPreviousMonth() {
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
  format,
  getLastDayOfPreviousMonth
};
