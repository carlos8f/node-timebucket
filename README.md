## timegroup

[![build status](https://secure.travis-ci.org/carlos8f/node-timegroup.png)](http://travis-ci.org/carlos8f/node-timegroup)

Group timestamps into timegroups, by applying a granularity to a discrete value

A **timegroup** is a type of
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

## Anatomy of a timegroup

A **timegroup** consists of:

1. (optional) an unsigned granularity multiplier (default: `1`)
2. a granularity identifier, i.e. `s` for seconds
3. a signed value, i.e. number of seconds, after or before epoch year (1970)

### Format examples

- `8h-491` - time (within 8 hours) of first moonwalk (`1969-07-21 02:56`)
- `y43` - the year 2013

## API

The `timegroup` module exports a single factory function. It supports the
following argument combinations:

- `timegroup()` - build timegroup with millisecond granularity applied to current date
- `timegroup(granularity)` - build from specific granularity (string identifier, see list below) applied to current date
- `timegroup(milliseconds)` - build from milliseconds since 1970
- `timegroup(granularity, value)` - build from specific granularity and value
- `timegroup(date)` - build from date object with millisecond granularity

### API examples

```js
var timegroup = require('timegroup');

// defaults to current milliseconds after unix epoch
console.log(timegroup());
// 'ms1369601120380'

// create a timegroup from implied granularity (milliseconds) and value
console.log(timegroup(1369601120380));
// 'ms1369601120380'

// create a timegroup from specific granularity (seconds) and value
console.log(timegroup('s', 1369601125));
// 's1369601125'

// convert to year granularity
console.log(timegroup().convert('y'));
// 'y43'

// create timegroup from current seconds after unix epoch, and add 5
console.log(timegroup('s').add(5));
// 's1369601125'

// create timegroup from date object
console.log(timegroup(new Date()));
// 'ms1369601120380'

// create timegroup from string representation
console.log(timegroup('y43'));
// 'y43'

// access granularity and value as properties
var t = timegroup();
console.log(t.granularity, t.value);
// 'ms' 1369601120380

// create timegroup with granularity multiplier
console.log(timegroup('30m'));
// '30m760894'

// convert with granularity multiplier
console.log(timegroup('y').convert('30m'));
// '30m753360'

```

## Granularity identifiers

- `µs` - microseconds
- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `mo` - months
- `y` - years

## binary storage

@todo

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2012 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2012 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
