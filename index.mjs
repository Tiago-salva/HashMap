class Node {
    constructor(key, value, next = null) {
        this.key = key
        this.value = value
        this.next = next
    }
}

export default class HashMap {
    constructor() {
        this.loadFactor = 0.75; 
        this.capacity = 16;
        this.buckets = Array(this.capacity).fill(null);
        this.count = 0;
    }

    // Given a key it returns a hash code
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }

    // Add a new key and his value to the array
    set(key, value) {
        let index = this.hash(key);
        let head = this.buckets[index];

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // If the key already exists, the old value is overwritten
        while(head) {
            if(head.key === key) {
                head.value = value;
                return
            }

            head = head.next
        }
  
        // If the key doesn't exist, create one
        const newNode = new Node(key, value, this.buckets[index]);
        this.buckets[index] = newNode;
        this.count++

        if (this.count / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    // Take one argument as a key and returns the value assigned to the key
    get(key) {
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let head = this.buckets[index];

        if(!head) return null

        while(head) {
            if(head.key === key) {
                return head.value
            }

            head = head.next
        }

        return null // If the key doesn't exist
    }


    // Returns true or false depending if the key exists in the hash map
    has(key) {
        let index = hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let head = this.buckets[index];

        while(head) {
            if(head.key === key) {
                return true
            }

            head = head.next
        }

        return false; // If the key doesn't exist
    }

    // If the key exists in the hash map, removes the entry and returns `true`
    // If the key does not exist, returns `false`
    remove(key) {
        let index = this.hash(key);
        let head = this.buckets[index];

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!head) return false;
        
        // Case 1: Remove the first node (head)
        if(head.key === key) {
            this.buckets[index] = head.next;
            this.count--;
            return true
        }

        // Case 2: Search the node to remove in the list
        let currentNode = head;
        let nextNode = head.next;

        while(nextNode) {
            if(nextNode.key === key) {
                currentNode.next = nextNode.next;
                this.count--;
                return true
            }
            currentNode = nextNode;
            nextNode = nextNode.next;
        }

        return false // If the key doesn't exist
    }

    // Returns the number of stored keys in the hashmap
    length() {
        return this.count;
    }

    // Removes all entries in the hash map
    clear() {
        this.buckets = Array(this.buckets.length).fill(null)
        this.count = 0;
    }

    // Returns an array containing all the keys in the hash map
    keys() {
        let keys = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while(current) {
                keys.push(current.key);
                current = current.next;
            }

        }

        return keys;
    }

    // Returns an array containing all the values in the hash map
    values() {
        let values = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while(current) {
                values.push(current.value);
                current = current.next;
            }

        }

        return values;
    }

    // Returns an array of all the keys-value pairs in the hash map
    entries() {
        let allPairs = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while(current) {
                allPairs.push([current.key, current.value]);
                current = current.next;
            }
        }

        return allPairs;
    }
    
    // Doubles the capacity of buckets in the hash map
    resize() {
        this.capacity = this.capacity * 2;
        let resizedBuckets = Array(this.capacity).fill(null);
        
        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];
            while(current) {
                
                let index = this.hash(current.key);
                let nextNode = current.next;

                if(resizedBuckets[index]) {
                    current.next = resizedBuckets[index];
                } else {
                    current.next = null;
                }

                resizedBuckets[index] = current;
                current = nextNode;
            }
        }
        
        this.buckets = resizedBuckets;
    }
}
