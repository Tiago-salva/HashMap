# Hash Map Implementation

This project implements a simple hash map with the following methods:

## Methods

### `hash(key)`
Takes a key and produces a hash code with it.

### `set(key, value)`
- Takes two arguments: a `key` and a `value`.  
- Assigns the value to the key.  
- If the key already exists, the old value is overwritten.

### `get(key)`
- Takes one argument as a `key`.  
- Returns the value assigned to the key.  
- If the key is not found, returns `null`.

### `has(key)`
- Takes a `key` as an argument.  
- Returns `true` if the key exists in the hash map, otherwise returns `false`.

### `remove(key)`
- Takes a `key` as an argument.  
- If the key exists in the hash map, removes the entry and returns `true`.  
- If the key does not exist, returns `false`.

### `length()`
- Returns the number of stored keys in the hash map.

### `clear()`
- Removes all entries in the hash map.

### `keys()`
- Returns an array containing all the keys in the hash map.

### `values()`
- Returns an array containing all the values in the hash map.

### `entries()`
- Returns an array of key-value pairs.  
  Example: `[[firstKey, firstValue], [secondKey, secondValue]]`.

### `resize()`
- Doubles the capacity of the hash map