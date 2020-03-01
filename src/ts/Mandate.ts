export default class Mandate {
  private _date: Date;

  constructor(date: Date | string) {
    if (typeof date === "string") {
      this._date = new Date(date);
    } else {
      this._date = date;
    }
  }
}
