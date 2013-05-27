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
  if (this.granularity === 'µs') return this.value / 1000;
  return moment(0).add(this.granularity, this.value).valueOf();
};

BucketSize.prototype.toString = function () {
  return this.spec;
};
