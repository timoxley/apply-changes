# apply-changes

Take a changes array in the format produced by `Object.observe` and `Array.observe`, and apply those changes to another object.

### Example

```js

var apply = require('apply-changes')

var localUser = {
  name: 'Original'
}

var remoteUser = {
  name: 'Original'
}

Object.observe(localUser, function(changes) {
  apply(remoteUser, changes)
  console.log(remoteUser.name) // 'Updated' 
  console.log(localUser.name === remoteUser.name) // true
})

localUser.name = 'Updated'

```


### Why

Say you have an environment where `Object.observe` is implemented (e.g.
node 0.11.x), and you want to easily replicate changes to another environment
perhaps one without `Object.observe` (e.g. vintage
2013 web browser). In this scenario, you could send a raw stream of changes
directly from `Object.observe` callback to `observe-apply` to have
changes applied in the other environment. 

## Caveats

** The recipient of the changes must be treated as read-only. **
`apply-changes` does not verify the state of recieving object matches the state
of source object. Updates are likely to corrupt data if you change the recipient
object.

# Licence

MIT
