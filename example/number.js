var timebucket = require('../');
var num = timebucket('8h-491').toNumber();
// toNumber() returns a 64-bit integer representation as a Number
console.log(num);
// -49133
var bucket = timebucket.fromNumber(num);
// fromNumber() takes the result of toNumber(), and returns a timebucket instance:
console.log(bucket.toString());
// 8h-491
