/**
 * @type {Datelike} A date-like object used as ingress to a Mandate instance
 */
type Datelike = Mandate | Date | string;

/**
 * @constant {string[]} A list of months
 */
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

/**
 * @const {object} Map of formatting functions
 */
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

  "S{2}": (date: Date) => Mandate.prefixZero(date.getMilliseconds(), 3),

  "S{1}": (date: Date) => date.getMilliseconds(),

  "M{4}": (date: Date) => months[date.getMonth()],

  "M{3}": (date: Date) => months[date.getMonth()].slice(0, 3),

  "M{2}(?!a)": (date: Date) => Mandate.prefixZero(date.getMonth() + 1),

  "(?<!A)(?<!P)M{1}(?!a)": (date: Date) => date.getMonth() + 1,

  "D{2}(?!e)": (date: Date) => Mandate.prefixZero(date.getDate()),

  Do: (date: Date) => date.getDate() + Mandate.ordinalSuffix(date.getDate()),

  "D(?!e)": (date: Date) => date.getDate()
};

/**
 * Creates a new Mandate instance
 * @class
 */
export class Mandate {
  private _date: Date;

  /**
   * Create a new instance
   *
   * @param {Datelike} date Date to compare
   */
  constructor(date?: Datelike) {
    if (typeof date === "undefined") {
      this._date = new Date();
    } else if (date instanceof Mandate) {
      this._date = new Date(date.toUnixMs());
    } else if (typeof date === "string") {
      this._date = new Date(date);
    } else {
      this._date = date;
    }
  }

  /**
   * Determine if date is less than another date
   *
   * @param  {Datelike} date Date to compare
   *
   * @return {boolean}       If date is less than another date
   */
  public lt(date: Datelike): boolean {
    return this._getDiff(date, false) < 0;
  }

  /**
   * Determine if date is less than or equal to another date
   *
   * @param  {Datelike} date Date to compare
   *
   * @return {boolean}       If date is less than of equal to another date
   */
  public lte(date: Datelike): boolean {
    return this._getDiff(date, false) <= 0;
  }

  /**
   * Determine if date is equal to another date
   *
   * @param  {Datelike} date    Date to compare
   * @param  {boolean}  precise If comparison should be exact to the millisecond
   *
   * @return {boolean}          If date is equal to another date
   */
  public eq(date: Datelike, precise: boolean = true): boolean {
    date = this._getMandate(date);

    if (precise) {
      return this._getDiff(date, false) === 0;
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
   * @param  {Datelike} date Date to compare
   *
   * @return {boolean}       If date is greater than another date
   */
  public gt(date: Datelike): boolean {
    return this._getDiff(date, false) > 0;
  }

  /**
   * Determine if date is greater than or equal to another date
   *
   * @param  {Datelike} date Date to compare
   *
   * @return {boolean}       If date is greater than or equal to another date
   */
  public gte(date: Datelike): boolean {
    return this._getDiff(date, false) >= 0;
  }

  /**
   * Get Unix epoch of the date
   *
   * @return {number} The number of milliseconds since January 1, 1970 (UTC/GMT)
   */
  public toUnixMs(): number {
    return this._date.valueOf();
  }

  /**
   * Get Unix epoch of the date
   *
   * @return {number} The number of seconds since January 1, 1970 (UTC/GMT)
   */
  public toUnix(): number {
    return this._date.valueOf() / 1000;
  }

  /**
   * Get Western date format
   *
   * @return {string} Formatted date
   */
  public toWestern(): string {
    return this.format("MMMM Do, YYYY");
  }

  /**
   * Get European date format
   *
   * @return {string} Formatted date
   */
  public toEuro(): string {
    return this.format("D MMMM YYYY");
  }

  /**
   * Get difference between two dates in milliseconds
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in milliseconds
   */
  public diffInMilliseconds(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs);
  }

  /**
   * Get difference between two dates in seconds
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in seconds
   */
  public diffInSeconds(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000);
  }

  /**
   * Get difference between two dates in minutes
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in minutes
   */
  public diffInMinutes(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000 * 60);
  }

  /**
   * Get difference between two dates in hours
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in hours
   */
  public diffInHours(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000 * 60 * 60);
  }

  /**
   * Get difference between two dates in days
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in days
   */
  public diffInDays(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000 * 60 * 60 * 24);
  }

  /**
   * Get difference between two dates in weeks
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in weeks
   */
  public diffInWeeks(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000 * 60 * 60 * 24 * 7);
  }

  /**
   * Get difference between two dates in years
   *
   * @param  {Datelike} date Date to compare
   * @param  {boolean}  abs  If result should be the absolute value
   *
   * @return {number}        Difference between two dates in years
   */
  public diffInYears(date: Datelike, abs: boolean = true): number {
    return this._getDiff(date, abs, 1000 * 60 * 60 * 24 * 365);
  }

  /**
   * Get difference between two dates based on a millisecond modifier
   *
   * @param  {Datelike} date    Date to compare
   * @param  {boolean}  abs     If result should be the absolute value
   * @param  {number}   modifer Modifier in milliseconds
   *
   * @return {number}           Difference between two dates
   */
  private _getDiff(
    date: Datelike,
    abs: boolean = true,
    modifier: number = 1
  ): number {
    date = this._getMandate(date);

    let diff = (this.toUnixMs() - date.toUnixMs()) / modifier;

    return abs ? Math.abs(diff) : diff;
  }

  /**
   * Get ordinal suffix for a number
   *
   * @param  {number} num Number to find ordinal for
   *
   * @return {string}     Ordinal
   */
  public static ordinalSuffix(num: number): string {
    switch (
      +num
        .toString()
        .split("")
        .pop()
    ) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  /**
   * Format the date into a string
   *
   * @param  {string} input String format
   *
   * @return {string}       Formatted string
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
   * Format the date into a date string
   *
   * @return {string} Formatted string
   */
  public toDateString(): string {
    return this.format("YYYY-MM-DD");
  }

  /**
   * Format the date into a datetime string
   *
   * @return {string} Formatted string
   */
  public toDateTimeString(): string {
    return this.format("YYYY-MM-DD hh:mm:ss");
  }

  /**
   * Prefix a string with a zero if a single digit
   *
   * @param  {number} num    A number
   * @param  {number} length Length number should be prefixed to
   *
   * @return {string}     Zero-prefixed number
   */
  public static prefixZero(num: number, length: number = 2): string {
    const numString = num.toString();

    return numString.length < length
      ? "0".repeat(length - numString.length) + numString
      : numString;
  }

  /**
   * Convert 24 hours to 12 hours
   *
   * @param  {number} hour Hour
   *
   * @return {number}      Converted hour
   */
  public static twelveHour(hour) {
    hour = hour % 12;

    return hour === 0 ? 12 : hour;
  }

  /**
   * Helper method to ensure we have a Mandate instance
   *
   * @param  {Datelike} date Date to compare
   *
   * @return {Mandate}       A Mandate instance
   */
  private _getMandate(date: Datelike) {
    return date instanceof Mandate ? date : mandate(date);
  }
}

/**
 * Helper function to new-up a Mandate instance
 *
 * @param  {Datelike} date Mandate basis
 *
 * @return {Mandate}       A Mandate instance
 */
export default function mandate(date?: Datelike) {
  return new Mandate(date);
}
