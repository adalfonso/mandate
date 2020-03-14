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

    constructor(date?: Date | string) {
        if (typeof date === "undefined") {
            this._date = new Date();
        } else if (typeof date === "string") {
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
}

export default function mandate(date?: Date | string) {
    return new Mandate(date);
}
