const copticMonths = [
  "Thout",
  "Paopi",
  "Hathor",
  "Kiahk",
  "Toba",
  "Amshir",
  "Baramhat",
  "Baramouda",
  "Pashons",
  "Paona",
  "Epip",
  "Mesori",
  "Nesi"
];

function getCopticDate(gregDate = new Date()) {
  const year = gregDate.getFullYear();
  const month = gregDate.getMonth() + 1;
  const day = gregDate.getDate();
  const copticMonthIndex = (month + 8) % 12;
  const copticDay = ((day + 10) % 30) || 1;

  return {
    day: copticDay,
    month: copticMonths[copticMonthIndex],
    formatted: `${copticDay} ${copticMonths[copticMonthIndex]}`
  };
}

module.exports = { getCopticDate };