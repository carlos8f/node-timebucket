describe('resize', function () {
  it('create ms bucket and resize to 30m', function () {
    var ts = 1369601120380;
    assert.equal(timebucket(ts).resize('30m').toString(), '30m760889');
  });
  it('resize ms to y and then to 30m', function () {
    var ts = 1369601120380;
    assert.equal(timebucket(ts).resize('y').resize('30m').toString(), '30m753360');
  });
  it.skip('more resize tests', function () {
  it('resize to months', function () {

  });
  it('resize from months', function () {

  });
  it('resize to weeks', function () {

  });
  it('resize from weeks', function () {

  });
  });
});
