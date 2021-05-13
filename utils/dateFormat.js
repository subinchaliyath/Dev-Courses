
// May 25, 2020
const dateFormatLong = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
module.exports ={dateFormatLong}