"use strict"

module.exports = function(target, changes, map) {
  changes.forEach(function(change) {
    var method = module.exports[change.type]
    if (!method) throw new Error('handler for change type not defined' + change.type)
    map || (map = function(x){return x})
    method(change, target, map)
  })
}

module.exports.updated = function updated(change, target, map) {
  target[change.name] = map(change.object[change.name], target[change.name])
}

module.exports['new'] = module.exports.updated

module.exports.deleted = function deleted(change, target) {
  delete target[change.name]
}

module.exports.splice = function splice(change, target) {
  var source = change.object
  var addedItems = source.slice(change.index, change.index + change.addedCount)
  var spliceArgs = [change.index, change.removed.length].concat(addedItems)
  target.splice.apply(target, spliceArgs)
}

