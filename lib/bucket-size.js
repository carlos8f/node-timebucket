var moment = require('moment');

function BucketSize (spec) {
  this.spec = spec;
  var parsed = this.parse(this.spec);
  this.value = parsed.value;
  this.granularity = parsed.granularity;
}
module.exports = BucketSize;

BucketSize.regex = /^(\d+)?([a-zA-Zµ]{1,2})$/;

BucketSize.prototype.parse = function (spec) {
  var match = String(spec).match(BucketSize.regex);
  if (!match) throw new Error('invalid bucket size spec: ' + spec);
  if (!match[1]) match[1] = 1;
  return {
    value: Number(match[1]),
    granularity: match[2]
  };
};

BucketSize.prototype.toMilliseconds = function () {
  return moment(0).add(this.value, this.granularity).valueOf();
};

BucketSize.prototype.toString = function () {
  return this.value === 1 ? this.granularity : this.spec;
};

BucketSize.granularityMap = [
  'ms' // milliseconds
, 's'  // seconds
, 'm'  // minutes
, 'h'  // hours
, 'd'  // days
, 'w'  // weeks
, 'M'  // months
, 'y'  // years
];

BucketSize.valueMap = [1, 2, 5, 8, 10, 15, 30, 45, 100, 1000];

BucketSize.prototype.pack = function () {
  var value = BucketSize.valueMap.indexOf(this.value);
  if (value === -1) throw new Error('value not serializable: ' + this.value);
  var granularity = BucketSize.granularityMap.indexOf(this.granularity);
  if (granularity === -1) throw new Error('granularity not serializable: ' + this.granularity);
  return String(value) + String(granularity);
};

BucketSize.numberToSpec = function (num) {
  num = String(num);
  var value = BucketSize.valueMap[num.charAt(0)];
  var granularity = BucketSize.granularityMap[num.charAt(1)];
  return value + granularity;
};
