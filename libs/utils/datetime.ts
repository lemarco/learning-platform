export const DURATION_UNITS = {
  M: 86400 * 30,
  w: 86400 * 7,
  d: 86400, // days
  h: 3600, // hours
  m: 60, // minutes
  s: 1, // seconds
};

// export const duration = (s: number | string) => {
//   if (typeof s === 'number') return s;
//   if (typeof s !== 'string') return 0;
//   let result = 0;
//   const parts = s.split(' ');
//   for (const part of parts) {
//     const unit = part.slice(-1);
//     const value = parseInt(part.slice(0, -1));
//     const mult = DURATION_UNITS[unit];
//     if (!isNaN(value) && mult) result += value * mult;
//   }
//   return result * 1000;
// };

const twoDigit = (n: number) => {
  const s = n.toString();
  if (n < 10) return "0" + s;
  return s;
};

export const nowDate = (date: Date) => {
  if (!date) date = new Date();
  const yyyy = date.getUTCFullYear().toString();
  const mm = twoDigit(date.getUTCMonth() + 1);
  const dd = twoDigit(date.getUTCDate());
  return `${yyyy}-${mm}-${dd}`;
};

export const nowDateTimeUTC = (date: Date, timeSep = ":") => {
  if (!date) date = new Date();
  const yyyy = date.getUTCFullYear().toString();
  const mm = twoDigit(date.getUTCMonth() + 1);
  const dd = twoDigit(date.getUTCDate());
  const hh = twoDigit(date.getUTCHours());
  const min = twoDigit(date.getUTCMinutes());
  const ss = twoDigit(date.getUTCSeconds());
  return `${yyyy}-${mm}-${dd}T${hh}${timeSep}${min}${timeSep}${ss}`;
};

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NAME_LEN = 3;

export const parseMonth = (s: string) => {
  const name = s.substring(0, NAME_LEN);
  const i = MONTHS.indexOf(name);
  return i >= 0 ? i + 1 : -1;
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const parseDay = (s: string) => {
  const name = s.substring(0, NAME_LEN);
  const i = DAYS.indexOf(name);
  return i >= 0 ? i + 1 : -1;
};
