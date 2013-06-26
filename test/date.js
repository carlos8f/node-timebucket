describe('date', function () {
  it('create a bucket with a date', function () {
    var date = new Date(1969, 6, 21, 2, 56);
    var ts = date.getTime();
    assert.equal(timebucket(date), 'ms' + ts);
  });
  it('create a bucket with a date and specific size', function () {
    var date = new Date(1969, 6, 21, 2, 56);
    assert.equal(timebucket('8h', date), '8h-491');
  });
  it('backwards syntax', function () {
    var date = new Date(1969, 6, 21, 2, 56);
    assert.equal(timebucket(date, '8h'), '8h-491');
  });
});
