var timebucket = require('../');

// this example demonstrates the sortability of the number representation

var nums = [];
for (var i = 0; i < 50; i++) {
  var years = Math.round((Math.random() - 0.5) * 80);
  nums.push(timebucket('y', years).toNumber());
}

nums.sort(function (a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

nums.forEach(function (num) {
  console.log(timebucket.unpack(num).toString());
});
