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

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }

    // Añade una clave y su valor al array
    set(key, value) {
        let index = this.hash(key);
        let head = this.buckets[index];

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // Verificar si la clave ya existe y actualizar el valor si es así
        while(head) {
            if(head.key === key) {
                head.value = value;
                return
            }

            head = head.next
        }
  
        // Si la clave no existe, agregarla
        const newNode = new Node(key, value, this.buckets[index]);
        this.buckets[index] = newNode;
        this.count++

        if (this.count / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    // Toma un key como argumento y devuelve el valor asignado a esa key,
    // Si la key no se encontro, devuelve null
    get(key) {
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let head = this.buckets[index];

        // Si el bucket no existe devuelve undefined
        if(!head) return null

        while(head) {
            if(head.key === key) {
                return head.value
            }

            head = head.next
        }

        return null // If the key doesn't exist
    }


    // Toma un key como argumento y devuelve true o false
    // dependiendo si esta o no en el hash map
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

    // Toma un key como argumento, si el key esta en el hash map, lo elimina y devuelve true
    // Si la key no esta en el hash map, devuelve false
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

    // Devuelve el numero the keys guardadas en el hash map
    length() {
        return this.count;
    }

    // Elimina todas las entradas en el hash map
    clear() {
        this.buckets = Array(this.buckets.length).fill(null)
        this.count = 0;
    }

    // Devuelve un array conteniendo todas las keys del hash map
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

    // Devuelve un array conteniendo todos los values del hash map
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

    // Devuelve un array que contiene cada par de key y value
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
    
    // Duplicar el espacio del hashmap
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
