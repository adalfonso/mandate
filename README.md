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
___
#### Docs:


###### mandate(date?: Date | string)
New-up a mandate class.

```javascript
import Mandate from 'mandate';
let now = Mandate();
// or
let then = Mandate('January 1, 2020'));
// or
let wayback = Mandate(Date(1990, 5, 18));
```

###### format(format: string)
Format accepts a string to convey a date using these patterns:

| Input | Output  | Description               |
| ----- | ------- | ------------------------- |
| YYYY  | 1999    | 4 digit year              |
| YY    | 99      | 2 digit year              |
| MMMM  | January | Full month                |
| MMM   | Jan     | Abbreviated month         |
| MM    | 01 - 12 | Numeric month w/leading 0 |
| M     | 1  - 12 | Numeric month             |
| DD    | 01 - 31 | Date w/leading 0          |
| D     | 1  - 31 | Date                      |


```javascript
let forthOfJuly = Mandate('July 4, 2005');

forthOfjuly.format('YYYY-MM-DD');
// 2005-07-04
```
