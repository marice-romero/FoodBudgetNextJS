export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  const formattedDate = utcDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export const formatDateToYYYYMMDD = (date) => {
  const [month, day, year] = date.split("/").map(Number);
  // Assume the year is in the 2000s; adjust if necessary
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};
