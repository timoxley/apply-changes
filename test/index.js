"use strict"
if (!Object.observe) throw new Error('The tests need Object.observe. Try node 0.11.x. with --harmony')

var test = require('tape')

var apply = require('../')

test('object updates', function(t) {
  t.plan(2)
  var localUser = {
    name: 'Tim'
  }

  var remoteUser = {
    name: 'Tim'
  }

  Object.observe(localUser, function(changes) {
    apply(remoteUser, changes)
    t.deepEqual(localUser, remoteUser)
    t.deepEqual(localUser.name, remoteUser.name)
  })

  localUser.name = 'Tim Oxley'
})

test('multiple updates', function(t) {
  t.plan(2)
  var localUser = {
    name: 'Tim'
  }

  var remoteUser = {
    name: 'Tim'
  }

  Object.observe(localUser, function(changes) {
    apply(remoteUser, changes)
    t.deepEqual(localUser, remoteUser)
    t.deepEqual(localUser.name, remoteUser.name)
  })

  localUser.name = 'Tim Oxley'
  localUser.name = 'Tim K. Oxley'
})

test('object new properties', function(t) {
  t.plan(2)

  var localUser = {
    name: 'Tim'
  }

  var remoteUser = {
    name: 'Tim'
  }

  Object.observe(localUser, function(changes) {
    apply(remoteUser, changes)
    t.deepEqual(localUser, remoteUser)
    t.deepEqual(localUser.hasShoes, remoteUser.hasShoes)
  })

  localUser.hasShoes = true
})


test('object removed properties', function(t) {
  t.plan(3)

  var localUser = {
    name: 'Tim'
  }

  var remoteUser = {
    name: 'Tim'
  }

  Object.observe(localUser, function(changes) {
    apply(remoteUser, changes)
    t.deepEqual(localUser, remoteUser)
    t.deepEqual(localUser.name, undefined)
    t.deepEqual(localUser.name, remoteUser.name)
  })

  delete localUser.name
})

test('array push', function(t) {
  t.plan(2)

  var localData = []
  var remoteData = []

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData[0], remoteData[0])
  })
  localData.push(1)
})

test('array pop', function(t) {
  t.plan(1)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
  })
  localData.pop()
})

test('array splice remove', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.deepEqual(localData.length, remoteData.length)
  })
  localData.splice(1)
})

test('array splice insert', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })
  localData.splice(1, 0, 1)
})

test('array splice replace', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })
  localData.splice(1, 1, 1)
})

test('array length chop', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })

  localData.length = 1
})

test('array length chop', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })

  localData.length = 1
})

test('array reverse', function(t) {
  t.plan(2)

  var localData = [1,2,3]
  var remoteData = [1,2,3]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })

  localData.reverse()
})

test('array sort', function(t) {
  t.plan(2)

  var localData = [3,2,1]
  var remoteData = [3,2,1]

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.deepEqual(localData, remoteData)
    t.strictEqual(localData.length, remoteData.length)
  })

  localData.sort()
})


test('array index injection', function(t) {
  t.plan(3)

  var localData = []
  var remoteData = []

  Array.observe(localData, function(changes) {
    apply(remoteData, changes)
    t.strictEqual(localData.length, remoteData.length)
    t.strictEqual(localData[21], remoteData[21])
    // sparse arrays don't actually have keys
    // for empty indices, thus deepEquals fails:
    // https://github.com/joyent/node/issues/6500
    t.strictEqual(localData[0], remoteData[0])
  })

  localData[21] = true
})
