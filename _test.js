var apply = require('./index')


function map(newVal, oldVal) { return {
   _collapsed: oldVal && oldVal._collapsed || false
  ,data: newVal
}}


var o1 = {some:'thing', other:'thingamabob'}
var a1 = ['first', 'second', 'third']

var o2 = {some:{_collapsed:true, data:'thing'},
          other:{_collapsed:false, data:'thingamabob'}}
var a2 = [{_collapsed:true, data:'first'},
          {_collapsed:false, data:'second'},
          {_collapsed:true, data:'third'}]


Object.observe(o1, function(changes) {
  apply(o2, changes, map)
  console.log(o2)
})

Object.observe(a1, function(changes) {
  apply(a2, changes, map)
  console.log(a2)
})


console.log('Original:')
console.log(o2)

setImmediate(function(){
  console.log('\nUpdating:')
  o1.some = 'wat'

  setImmediate(function() {
    console.log('\nAdding:')
    o1.newthing = 'ohai'

    setImmediate(function() {
      console.log('\nSplicing:')
      a1.splice(0, 2, 'first-prime', 'second-prime')
    })
  })
})


