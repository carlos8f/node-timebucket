describe('date', function () {
  var date = new Date(Date.UTC(1969, 6, 21, 2, 56));
  it('create a bucket with a date', function () {
    var ts = date.getTime();
    assert.equal(timebucket(date), 'ms' + ts);
  });
  it('create a bucket with a date and specific size', function () {
    assert.equal(timebucket('8h', date), '8h-492');
  });
  it('backwards syntax', function () {
    assert.equal(timebucket(date, '8h'), '8h-492');
  });
});
