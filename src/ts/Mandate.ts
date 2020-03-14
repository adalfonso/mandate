type Datelike = Mandate | Date | string;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const formatInputs = {
  "Y{4}": date => date.getFullYear().toString(),

  "Y{2}": date =>
    date
      .getFullYear()
      .toString()
      .slice(-2),

  A: (date: Date) => (date.getHours() < 12 ? "AM" : "PM"),

  a: (date: Date) => (date.getHours() < 12 ? "am" : "pm"),

  "H{2}": (date: Date) => Mandate.prefixZero(date.getHours()),

  "H{1}": (date: Date) => date.getHours(),

  "h{2}": (date: Date) =>
    Mandate.prefixZero(Mandate.twelveHour(date.getHours())),

  "h{1}": (date: Date) => Mandate.twelveHour(date.getHours()),

  "m{2}": (date: Date) => Mandate.prefixZero(date.getMinutes()),

  "(?<!a)(?<!p)m{1}": (date: Date) => date.getMinutes(),

  "s{2}": (date: Date) => Mandate.prefixZero(date.getSeconds()),

  "s{1}": (date: Date) => date.getSeconds(),

  "M{4}": (date: Date) => months[date.getMonth()],

  "M{3}": (date: Date) => months[date.getMonth()].slice(0, 3),

  "M{2}(?!a)": (date: Date) => Mandate.prefixZero(date.getMonth() + 1),

  "(?<!A)(?<!P)M{1}(?!a)": (date: Date) => date.getMonth() + 1,

  "D{2}(?!e)": (date: Date) => Mandate.prefixZero(date.getDate()),

  "D(?!e)": (date: Date) => date.getDate()
};

export class Mandate {
  private _date: Date;

  /**
   * Create a new instance
   *
   * @param date {Datelike}
   */
  constructor(date?: Datelike) {
    if (typeof date === "undefined") {
      this._date = new Date();
    } else if (date instanceof Mandate) {
      this._date = new Date(date.getUnixMs());
    } else if (typeof date === "string") {
      this._date = new Date(date);
    } else {
      this._date = date;
    }
  }

  /**
   * Find the difference between two dates
   *
   * @param date {Datelike} Date to compare
   * @return     {number}   Difference in seconds
   */
  public compare(date: Datelike) {
    date = this._getMandate(date);

    return this._date.valueOf() - date.getUnixMs();
  }

  /**
   * Determine if date is less than another date
   *
   * @param date {Datelike}
   * @return     {boolean}  If date is less than another date
   */
  public lt(date: Datelike) {
    return this.compare(date) < 0;
  }

  /**
   * Determine if date is less than or equal to another date
   *
   * @param date {Datelike}
   * @return     {boolean}  If date is less than of equal to another date
   */
  public lte(date: Datelike) {
    return this.compare(date) <= 0;
  }

  /**
   * Determine if date is equal to another date
   *
   * @param date    {Datelike}
   * @param precise {boolean}  If comparison should be exact to the millesecond
   * @return        {boolean}  If date is equal to another date
   */
  public eq(date: Datelike, precise = false) {
    date = this._getMandate(date);

    if (precise) {
      return this.compare(date) === 0;
    }

    return (
      this.format("YYYY") === date.format("YYYY") &&
      this.format("MM") === date.format("MM") &&
      this.format("DD") === date.format("DD")
    );
  }

  /**
   * Determine if date is greater than another date
   *
   * @param date {Datelike}
   * @return     {boolean}  If date is greater than another date
   */
  public gt(date: Datelike) {
    return this.compare(date) > 0;
  }

  /**
   * Determine if date is greater than or equal to another date
   *
   * @param date {Datelike}
   * @return     {boolean}  If date is greater than or equal to another date
   */
  public gte(date: Datelike) {
    return this.compare(date) >= 0;
  }

  /**
   * Get Unix epoch of the date
   *
   * @return {number} The number of milleseconds since January 1, 1970 (UTC/GMT)
   */
  public getUnixMs() {
    return this._date.valueOf();
  }

  /**
   * Format the date into a string
   *
   * @param input {string} String format
   * @return      {string} Formatted string
   */
  public format(input: string): string {
    for (let parseInput in formatInputs) {
      let regex = new RegExp(parseInput, "g");
      let closure = formatInputs[parseInput];

      input = input.replace(regex, closure(this._date));
    }

    return input;
  }

  /**
   * Prefix a string with a zero if a single digit
   *
   * @param  {number} A number
   * @return {string} Zero-prefixed number
   */
  public static prefixZero(num: number): string {
    return num < 10 ? "0" + num : num.toString();
  }

  /**
   * Convert 24 hours to 12 hours
   *
   * @param  {number} Hour
   * @return {number} Converted hour
   */
  public static twelveHour(hour) {
    hour = hour % 12;

    return hour === 0 ? 12 : hour;
  }

  /**
   * Helper method to ensure we have a Mandate instance
   * @param  date {Datelike}
   * @return      {Mandate}  A Mandate instance
   */
  private _getMandate(date: Datelike) {
    return date instanceof Mandate ? date : mandate(date);
  }
}

/**
 * Helper function to new-up a Mandate instance
 *
 * @param date {Datelike}
 * @return     {Mandate}     A Mandate instance
 */
export default function mandate(date?: Datelike) {
  return new Mandate(date);
}
