const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getNextDate = dates => {
  const today = getToday();
  return dates.find(date => date >= today);
};
export const formatDate = date => date.toLocaleDateString("ko-KR");
export const getDateDiff = (to, from = new Date()) => {
  const diff = to.getTime() - from.getTime();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
};
//# sourceMappingURL=date.js.map