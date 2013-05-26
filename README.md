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
3. a signed value, i.e. number of seconds, after or before epoch year
4. (optional) a signed adjustment to the 1970 epoch year (default: `+0`)

## Examples of timegroups:

- w52 - Jan 1, 1971
- s50 - Jan 1, 1970 @ 00:00:50
- m60 - Jan 1, 1970 @ 00:01:00
- h8 - Jan 1, 1970 @ 00:08:00
- y5 - Jan 1, 1974 @ 00:00:00

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
