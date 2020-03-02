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

    "Y{2,3}": date =>
        date
            .getFullYear()
            .toString()
            .slice(-2),

    "M{4}": date => months[date.getMonth()],

    "M{3}": date => months[date.getMonth()].slice(0, 3),

    "M{1,2}(?!a)": date => date.getMonth() + 1,

    "D{2}(?!e)": date =>
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),

    "D(?!e)": date => date.getDate()
};

export default class Mandate {
    private _date: Date;

    constructor(date: Date | string) {
        if (typeof date === "string") {
            this._date = new Date(date);
        } else {
            this._date = date;
        }
    }

    public format(input: string): string {
        for (let parseInput in formatInputs) {
            let regex = new RegExp(parseInput, "g");
            let closure = formatInputs[parseInput];

            input = input.replace(regex, closure(this._date));
        }

        return input;
    }
}
