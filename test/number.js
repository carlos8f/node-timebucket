describe('number', function () {
  it('packs and unpacks', function () {
    var num = timebucket('5y').toNumber();
    assert.equal(num, 927);
    assert.equal(timebucket.fromNumber(num).toString(), timebucket('5y').toString());
    num = timebucket(1372268623916).toNumber();
    assert.equal(num, 137226862391600);
    assert.equal(timebucket.fromNumber(num).toString(), timebucket(1372268623916).toString());
    num = timebucket('8h-491').toNumber();
    assert.equal(num, -49133);
    assert.equal(timebucket.fromNumber(num).toString(), '8h-491');
  });
  it("doesn't support µs", function () {
    assert.throws(function () {
      var packed = timebucket('µs').toNumber();
    }, /granularity not serializable: µs/);
  });
});
