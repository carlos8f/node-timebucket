## timegroup

Convert timestamps to timegroups and vice-versa

A **Timegroup** is a type of
[time domain](http://www.cs.arizona.edu/~rts/pubs/LNCS1399p406.pdf)
which combines a granularity identifier with a discrete value, and can
be stored as a compact string.

Timegroups are useful for grouping timestamps together using a particular
granularity (such as groups of 30 minutes), as an aid for graphing or
map/reduce-ing time-series data.

Also, timegroups can serve as a neutral format between which UNIX timestamps
(seconds before or after 1970), millisecond timestamps (as used in JavaScript),
and microsecond timestamps (such as those used in high-frequency trading
applications) can be converted, and stored in a complete way (with granularity
attached).

## Format

A timegroup consists of:

1. (optional) an unsigned granularity multiplier (default: `1`)
2. a granularity identifier, i.e. `s` for seconds
3. a signed value, i.e. number of seconds, after or before epoch year (1970)

## API

```js
var timegroup = require('timegroup');

// defaults to current milliseconds after unix epoch
console.log(timegroup());
// 'ms1369601120380'

// create a timegroup from granularity (seconds) and value
console.log(timegroup('s', 1369601125));
// 's1369601125'

// convert to year granularity
console.log(timegroup('s', 1369601125).y());
// 'y2013'

// create timegroup from current seconds after unix epoch, and add 5
console.log(timegroup('s').add(5));
// 's1369601125'

// create timegroup from date object
console.log(timegroup(new Date()));
// 'ms1369601120380'

// create timegroup from string representation
console.log(timegroup('y2013'));
// 'y2013'

// access granularity and value as properties
var t = timegroup();
console.log(t.granularity, t.value);
// 'ms' 1369601120380

```

## Examples of timegroups string identifiers:

- `w52` - Jan 1, 1971
- `s50` - Jan 1, 1970 @ 00:00:50
- `m60` - Jan 1, 1970 @ 00:01:00
- `h8` - Jan 1, 1970 @ 00:08:00
- `y5` - Jan 1, 1974 @ 00:00:00

## Granularity identifiers

- `ns` - nanoseconds
- `mu` - microseconds
- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `y` - years
- `c` - centuries
- `mm` - millenia

## binary storage
