export const isDifferenceMoreThan24Hours = (
  date1: Date,
  date2: Date,
): boolean => {
  const msIn24Hours = 24 * 60 * 60 * 1000;
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());
  return timeDifference > msIn24Hours;
};

export const validateTimeSpan = (startDate: Date, endDate: Date): boolean => {
  return startDate.getTime() <= endDate.getTime();
};
