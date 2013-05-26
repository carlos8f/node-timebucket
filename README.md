node-timegroup
==============

Convert timestamps to timegroups and vice-versa

**Timegroups** are an alternative to traditional timestamps which consist of:

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

## binary storage
