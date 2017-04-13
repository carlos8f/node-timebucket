var Bucket = require('./lib/bucket')
  , BucketSize = require('./lib/bucket-size')

module.exports = function timebucket () {
  var args = [].slice.call(arguments)
    , size = 'ms'
    , value
    , bucketStr
    , date = false

  args.forEach(function (arg, idx) {
    if (typeof arg === 'string') {
      if (arg.match(Bucket.regex)) {
        bucketStr = arg;
      }
      else if (arg.match(BucketSize.regex)) {
        size = arg;
      }
      else {
        if (Number.isNaN && !Number.isNaN(Number(arg))) {
          value = Number(arg);
        }
        // node 0.6
        else if (!Number.isNaN && arg.match(/^[0-9]+$/)) {
          value = Number(arg);
        }
      }
    }
    else if (typeof arg === 'number') {
      value = arg;
    }
    else if (arg instanceof Date) {
      value = arg.getTime();
      date = true;
    }
    else {
      throw new TypeError('argument ' + (idx + 1) + ' must be string, number, or date');
    }
  });
  if (date) {
    return new Bucket('ms', value).resize(size);
  }
  if (bucketStr) return Bucket.fromString(bucketStr);
  if (typeof value === 'undefined') {
    return new Bucket('ms', (new Date()).getTime()).resize(size);
  }
  return new Bucket(size, value);
};

module.exports.fromNumber = function (num) {
  return Bucket.fromNumber(num);
};
