var moment = require('moment')
  , packer = require('int-packer')

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
  if (this.granularity === 'µs') return this.value / 1000;
  return moment(0).add(this.granularity, this.value).valueOf();
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

BucketSize.valueMap = [null, 1, 2, 5, 8, 10, 15, 30, 45, 100];

BucketSize.prototype.packToArray = function () {
  var value = BucketSize.valueMap.indexOf(this.value);
  if (value === -1 || !value) throw new Error('value not serializable: ' + this.value);
  var granularity = BucketSize.granularityMap.indexOf(this.granularity);
  if (granularity === -1) throw new Error('granularity not serializable: ' + this.granularity);
  return [value, granularity];
};

BucketSize.unpackToString = function (num) {
  var unpacked = packer(1, 1).unpack(num);
  var value = BucketSize.valueMap[unpacked[0]];
  var granularity = BucketSize.granularityMap[unpacked[1]];
  return value + granularity;
};
