## timebucket

Group timestamps into "buckets" by applying a granularity to a discrete value

A **timebucket** is a type of
[time domain](http://www.cs.arizona.edu/~rts/pubs/LNCS1399p406.pdf)
which combines a size identifier (granularity) with a discrete value, and can
be stored as a compact string.

Timebuckets are useful for grouping timestamps together using a particular
granularity (such as groups of 30 minutes), as an aid for graphing or
map/reduce-ing time-series data.

Also, timebuckets can serve as a neutral format between which UNIX timestamps
(seconds before or after 1970) and millisecond timestamps (as used in JavaScript) can be converted, and stored in a complete way (with granularity
attached).

## Anatomy of a timebucket

A **timebucket** consists of:

1. a size spec (string) which consists of:
  1. (optional) an unsigned multiplier (default: `1`)
  2. a granularity identifier, i.e. `s` for seconds
3. a signed value, i.e. number of seconds, after or before epoch year (1970)

### Format examples

- `8h-491` - time (within 8 hours) of first moonwalk (`1969-07-21 02:56` UTC)
- `y43` - the year 2013

## API

### Construction

The `timebucket` module exports a factory function. It supports the
following argument combinations:

- `timebucket()` - build timebucket with millisecond granularity applied to current date
- `timebucket(size)` - build from specific size (string identifier, see list below) applied to current date
- `timebucket(milliseconds)` - build from milliseconds since 1970
- `timebucket(size, value)` - build from specific size and value
- `timebucket(date)` - build from date object with millisecond granularity
- `timebucket(str)` - build from string representation

### Resizing

To resize a bucket, call `resize(newSize)`:

```js
console.log(timebucket('y').resize('30m') + '');
// '30m753360'
```

### Conversion

Conversion methods:

- `toString()` - convert to string representation
- `toJSON()` - same as `toString()`
- `toMilliseconds()` - convert to millisecond UNIX time offset
- `toDate()` - convert to Date object

### API examples

```js
var timebucket = require('timebucket');

// defaults to current milliseconds after unix epoch
console.log(timebucket() + '');
// 'ms1369656669680'

// default size (milliseconds) and value
console.log(timebucket(1369601120380) + '');
// 'ms1369601120380'

// specific size (seconds) and value
console.log(timebucket('s', 1369601125) + '');
// 's1369601125'

// resize to year
console.log(timebucket().resize('y') + '');
// 'y43'

// use current time, specific size
console.log(timebucket('30m') + '');
// '30m760920'

// create timebucket from current seconds after unix epoch, and add 5
console.log(timebucket('s').add(5) + '');
// 's1369656674'

// from date object
console.log(timebucket(new Date()) + '');
// 'ms1369656669686'

// from string representation
console.log(timebucket('y43') + '');
// 'y43'

// access granularity and value as properties
var t = timebucket();
console.log(t.size.value, t.size.granularity, t.value);
// 1 'ms' 1369656669686

// resize
console.log(timebucket('y').resize('30m') + '');
// '30m753360'

```

## Granularity identifiers

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `M` - months
- `y` - years

## Integer storage

Timebuckets also have a 64-bit integer representation which contains granularity
metadata, while maintaining sortability with buckets of the same granularity.

```js
var timebucket = require('timebucket');
var num = timebucket('8h-491').toNumber();
// toNumber() returns a 64-bit integer representation as a Number
console.log(num);
// -49133
var bucket = timebucket.fromNumber(num);
// fromNumber() takes the result of toNumber(), and returns a timebucket instance:
console.log(bucket.toString());
// 8h-491
```

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
