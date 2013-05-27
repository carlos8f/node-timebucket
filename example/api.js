var timebucket = require('../');

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

// from current microseconds (smallest supported bucket size)
console.log(timebucket('µs') + '');
// 'µs1369657390541000'

// resize from microseconds
console.log(timebucket('µs1369657390541000').resize('y') + '');
// 'y43'
