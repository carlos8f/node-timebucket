describe('basic test', function () {
  it('create a bucket with default size (milliseconds) and value', function () {
    var ts = 1369601120380;
    assert.equal(timebucket(ts), 'ms' + ts);
  });
  it('create a bucket with a specific size', function () {
    assert.equal(timebucket('s', 1369601125), 's1369601125');
  });
  it('resize to year granularity', function () {
    assert.equal(timebucket(1369601120380).resize('y').toString(), 'y43');
  });
  it('create bucket from current seconds after unix epoch, and add 5', function () {
    var ts = Date.now() / 1000;
    assert.equal(timebucket('s', ts).add(5).toString(), 's' + (ts + 5));
  });
  it('create bucket from date object', function () {
    var d = new Date();
    assert.equal(timebucket(d), 'ms' + d.getTime());
  });
  it('create bucket from string representation', function () {
    assert.equal(timebucket('y43').toString(), 'y43');
  });
  it('access size and value as properties', function () {
    var ts = 1369601120380;
    var t = timebucket(ts);
    assert.equal(t.size.granularity, 'ms');
    assert.equal(t.value, ts);
  });
  it('create ms bucket and resize to 30m', function () {
    var ts = 1369601120380;
    assert.equal(timebucket(ts).resize('30m').toString(), '30m760889');
  });
  it('resize ms to y and then to 30m', function () {
    var ts = 1369601120380;
    assert.equal(timebucket(ts).resize('y').resize('30m').toString(), '30m753360');
  });
});
