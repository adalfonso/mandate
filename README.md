# mandate

A tiny yet performat date manipulation library.

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

###### mandate(date?: Date | string)

New-up a mandate class.

```javascript
import mandate from 'mandate';
let now = mandate();

// or

let then = mandate('January 1, 2020'));

// or

let wayback = mandate(Date(1990, 5, 18));
```

###### format(format: string)

Format accepts a string to convey a date using these patterns:

| Input | Output  | Description                  |
| ----- | ------- | ---------------------------- |
| YYYY  | 1999    | 4 digit year                 |
| YY    | 99      | 2 digit year                 |
| MMMM  | January | Full month                   |
| MMM   | Jan     | Abbreviated month            |
| MM    | 01 - 12 | Numeric month w/leading 0    |
| M     | 1 - 12  | Numeric month                |
| DD    | 01 - 31 | Date w/leading 0             |
| D     | 1 - 31  | Date                         |
| HH    | 00 - 24 | 24 Hour w/leading 0          |
| H     | 0 - 24  | 24 Hour                      |
| hh    | 01 - 12 | 12 Hour w/leading 0          |
| h     | 1 - 12  | 12 Hour                      |
| mm    | 01 - 31 | Minute w/leading 0           |
| m     | 1 - 31  | Minute                       |
| ss    | 01 - 12 | Second month w/leading 0     |
| s     | 1 - 12  | Second month                 |
| A     | AM/PM   | Capital Ante/Post Meridiem   |
| a     | am/pm   | Lowercase Ante/Post Meridiem |

```javascript
let forthOfJuly = mandate("July 4, 2005 7:32 pm");

forthOfjuly.format("YYYY-MM-DD HH:mm");
// 2005-07-04 19:32
```

###### lt(date: Mandate|Date|string)

Compare if a date is less than another date

```javascript
let stPaddysDay = mandate("March 17, 2020");
let hangoverRecoveryDay = mandate("March 18, 2020");

stPaddysDay.lt(hangoverRecoveryDay);
// true
```

###### lte(date: Mandate|Date|string)

Compare if a date is less than or equal to another date

```javascript
let now = mandate();

now.lte(now);
// true
```

###### eq(date: Mandate|Date|string, precise: boolean)

Compare if a date is equal to another date. Loosly compares on a date-level by default, but precise argument can be used for an exact comparison.

```javascript
let first = mandate(new Date(2020, 1, 1, 0));
let oneHourLater = mandate(new Date(2020, 1, 1, 1));

first.eq(oneHourLater);
// true

first.eq(oneHourLater, true);
// false
```

###### gt(date: Mandate|Date|string)

Compare if a date is greater than another date

```javascript
let first = mandate(new Date(2020, 1, 1));
let second = mandate(new Date(2020, 1, 3));

first.gt(second);
// false
```

###### gte(date: Mandate|Date|string)

Compare if a date is greater than or equal to another date

```javascript
let first = mandate(new Date(2020, 1, 1));
let second = mandate(new Date(2020, 1, 3));

second.gte(first);
// true
```

###### diffInYears(date: Mandate|Date|string, abs: boolean)
###### diffInWeeks...
###### diffInDays...
###### diffInHours...
###### diffInMinutes...
###### diffInSeconds...
###### diffInMilleseconds...

Get the difference in years, weeks, days, hours, minutes, seconds, or milleseconds between two dates. The second argument determines if the result should be an absolute value and is true by default.

```javascript
let before = Sut(new Date(2021, 1, 1));
let after = Sut(new Date(2022, 1, 1));

before.diffInYears(after);
// 1

before.diffInYears(after, false);
// -1
```