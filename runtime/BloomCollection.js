var Ix = require('ix');
var cmpObj = require('./util').cmpObj;

var BloomCollection = function(name, type, initArr) {
  // name is undefined for the temporary collections that we create with
  // genTempCollection to encapsulate transformations
  if (name !== undefined) {
    this._name = name;
    this._type = type;
    this._oldData = Ix.Enumerable.empty();
    this._data = initArr === undefined ?
      Ix.Enumerable.empty() :
      Ix.Enumerable.fromArray(initArr);
    this._newData = Ix.Enumerable.empty();
    this._delta = Ix.Enumerable.empty();
    this._stratumDelta = Ix.Enumerable.empty();
    this._replaceData = Ix.Enumerable.empty();
  }
}

var prototype = BloomCollection.prototype;

var genTempCollection = function(dataFn, deltaFn) {
  var res = new BloomCollection();
  res.getData = dataFn;
  res.getDelta = deltaFn;
  return res;
}

prototype.getData = function() {
  return this._data;
};

prototype.getDelta = function() {
  return this._delta;
};

prototype.select = function(fn) {
  var self = this;
  return genTempCollection(function() {
    return self.getData().select(fn);
  }, function() {
    return self.getDelta().select(fn);
  });
};
prototype.map = prototype.select;

prototype.selectMany = function(fn) {
  var self = this;
  return genTempCollection(function() {
    return self.getData().selectMany(fn);
  }, function() {
    return self.getDelta().selectMany(fn);
  });
};

prototype.where = function(fn) {
  var self = this;
  return genTempCollection(function() {
    return self.getData().where(fn);
  }, function() {
    return self.getDelta().where(fn);
  });
};
prototype.filter = prototype.where;

prototype.join = function(innerCollection, outerFn, innerFn, joinFn) {
  var self = this;
  return genTempCollection(function() {
    return self.getData().join(innerCollection.getData(), outerFn,
                                    innerFn, joinFn);
  }, function() {
    var outerDelta = self.getDelta();
    var innerDelta = innerCollection.getDelta();
    var outerData = self.getData();
    var innerData = innerCollection.getData();
    var a = outerDelta.join(innerDelta, outerFn, innerFn, joinFn);
    var b = outerDelta.join(innerData, outerFn, innerFn, joinFn);
    var c = outerData.join(innerDelta, outerFn, innerFn, joinFn);
    return a.union(b, cmpObj).union(c, cmpObj);
  });
};

prototype.groupBy = function(keyFn, elFn, resFn) {
  var self = this;
  return genTempCollection(function() {
    return self.getData().groupBy(keyFn, elFn, resFn);
  }, null);
};

module.exports = BloomCollection;
