# mandate

A tiny, yet powerful date manipulation library.

#### Running tests

Unit testing with mocha/chai. Invoke tests with `npm test`.

#### Building from source

For local development with watcher `npm run watch`
For local development with hot reloading server (requires node) `npm run hot`
For production deployment `npm run production`

#### License

MIT

---

#### Docs:

##### mandate(date?: Mandate | Date | string): Mandate

Helper function to new-up a mandate class.

```javascript
import mandate from 'mandate';
let now = mandate();

// or

let then = mandate('January 1, 2020'));

// or

let wayback = mandate(Date(1990, 5, 18));
```

##### format(format: string): string

Format accepts a string to convey a date using these patterns:

| Input | Output     | Description                  |
| ----- | ---------- | ---------------------------- |
| YYYY  | 1999       | 4 digit year                 |
| YY    | 99         | 2 digit year                 |
| MMMM  | January    | Full month                   |
| MMM   | Jan        | Abbreviated month            |
| MM    | 01 - 12    | Numeric month w/leading 0    |
| M     | 1 - 12     | Numeric month                |
| DD    | 01 - 31    | Date w/leading 0             |
| D     | 1 - 31     | Date                         |
| Do    | 1st - 31st | Ordinal Date                 |
| HH    | 00 - 24    | 24 Hour w/leading 0          |
| H     | 0 - 24     | 24 Hour                      |
| hh    | 01 - 12    | 12 Hour w/leading 0          |
| h     | 1 - 12     | 12 Hour                      |
| mm    | 01 - 31    | Minute w/leading 0           |
| m     | 1 - 31     | Minute                       |
| ss    | 01 - 12    | Second w/leading 0           |
| s     | 1 - 12     | Second                       |
| SS    | 001 - 999  | Millisecond w/leading 0      |
| S     | 1 - 999    | Millisecond                  |
| A     | AM/PM      | Capital Ante/Post Meridiem   |
| a     | am/pm      | Lowercase Ante/Post Meridiem |

```javascript
let forthOfJuly = mandate("July 4, 2005 7:32 pm");

forthOfjuly.format("YYYY-MM-DD HH:mm");
// "2005-07-04 19:32"
```

##### lt(date: Mandate | Date | string): boolean

Compare if a date is less than another date

```javascript
let stPaddysDay = mandate("March 17, 2020");
let hangoverRecoveryDay = mandate("March 18, 2020");

stPaddysDay.lt(hangoverRecoveryDay);
// true
```

##### lte(date: Mandate | Date | string): boolean

Compare if a date is less than or equal to another date

```javascript
let now = mandate();

now.lte(now);
// true
```

##### eq(date: Mandate | Date | string, precise: boolean): boolean

Compare if a date is equal to another date. strictly compares on a date-level by default, but precise argument can be used for an loose comparison.

```javascript
let first = mandate(new Date(2020, 1, 1, 0));
let oneHourLater = mandate(new Date(2020, 1, 1, 1));

first.eq(oneHourLater);
// false

first.eq(oneHourLater, false);
// true
```

##### gt(date: Mandate | Date | string): boolean

Compare if a date is greater than another date

```javascript
let first = mandate(new Date(2020, 1, 1));
let second = mandate(new Date(2020, 1, 3));

first.gt(second);
// false
```

##### gte(date: Mandate | Date | string): boolean

Compare if a date is greater than or equal to another date

```javascript
let first = mandate(new Date(2020, 1, 1));
let second = mandate(new Date(2020, 1, 3));

second.gte(first);
// true
```

##### diffInMilliseconds(date: Mandate | Date | string, abs: boolean): number

##### diffInSeconds(date: Mandate | Date | string, abs: boolean): number

##### diffInMinutes(date: Mandate | Date | string, abs: boolean): number

##### diffInHours(date: Mandate | Date | string, abs: boolean): number

##### diffInDays(date: Mandate | Date | string, abs: boolean): number

##### diffInWeeks(date: Mandate | Date | string, abs: boolean): number

##### diffInYears(date: Mandate | Date | string, abs: boolean): number

Get the difference in years, weeks, days, hours, minutes, seconds, or milliseconds between two dates. The second argument determines if the result should be an absolute value and is true by default.

```javascript
let before = Sut(new Date(2021, 1, 1));
let after = Sut(new Date(2022, 1, 1));

before.diffInYears(after);
// 1

before.diffInYears(after, false);
// -1
```

##### addMilliseconds(num: number): Mandate

##### addSeconds(num: number): Mandate

##### addMinutes(num: number): Mandate

##### addDays(num: number): Mandate

##### addHours(num: number): Mandate

##### addWeeks(num: number): Mandate

##### addMonths(num: number): Mandate

##### addYears(num: number): Mandate

Add years, months, weeks, days, hours, minutes, secconds, or milliseconds to a date. Inputs must be whole numbers and are defaulted to `1`.

```javascript
let date = Sut(new Date(2020, 1, 1));

date
  .addYears(4)
  .addMonths()
  .addSeconds(30);

date.format("YYYY-MM-DD HH:mm:ss:SS");
// 2024-03-01 00:00:30:000
```

##### subMilliseconds(num: number): Mandate

##### subSeconds(num: number): Mandate

##### subMinutes(num: number): Mandate

##### subDays(num: number): Mandate

##### subHours(num: number): Mandate

##### subWeeks(num: number): Mandate

##### subMonths(num: number): Mandate

##### subYears(num: number): Mandate

Subtract years, months, weeks, days, hours, minutes, secconds, or milliseconds from a date. Inputs must be whole numbers and are defaulted to `1`.

```javascript
let date = Sut(new Date(2020, 0, 2));

date.subYears(2).subMilliseconds();

date.format("YYYY-MM-DD HH:mm:ss:SS");
// 2018-01-01 23:59:59:999
```

##### toUnix(): number

##### toUnixMs(): number

```javascript
date.toUnix();
// 1580533200

date.toUnixMs();
// 1580533200000
```

##### toDateString(): string

Convert date to date string

```javascript
date.toDateString();
// "2020-02-01"
```

##### toDateTimeString(): string

Convert date to datetime string

```javascript
date.toDateTimeString();
// "2020-02-01 12:34:56"
```

##### toWestern(): string

Convert date to Western date format.

```javascript
date.toWestern();
// "March 30th, 1988"
```

##### toEuro(): string

Convert date to European date format.

```javascript
date.toEuro();
// "17 June 1990"
```
