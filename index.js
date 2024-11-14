// Usarlo cada vez que accedo a un bucket a traves de un index
if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75; 
        this.capacity = 16;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
        }
     
        return hashCode;
    }

    // Añade una clave y su valor al array
    set(key, value) {
        let index = this.hash(key);
        let bucket = this.buckets[index];

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // Verificar si la clave ya existe y actualizar el valor si es así
        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
  
        // Si la clave no existe, agregarla
        bucket[index].push([key, value]);
        this.count++;
    }

    // Toma un key como argumento y devuelve el valor asignado a esa key,
    // Si la key no se encontro, devuelve null
    get(key) {
        let index = this.hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.buckets[index];

        // Si el bucket no existe devuelve undefined
        if(!bucket) return null

        for (const pair of bucket) {
            if(pair[0] === key) {
                return pair[1]
            }
        }

        return null
    }


    // Toma un key como argumento y devuelve true o false
    // dependiendo si esta o no en el hash map
    has(key) {
        let index = hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.buckets[index];

        for (const pair of bucket) {
            if(pair[0] === key) return true;
        }

        return false;
    }

    // Toma un key como argumento, si el key esta en el hash map, lo elimina y devuelve true
    // Si la key no esta en el hash map, devuelve false
    remove(key) {
        let index = this.hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let bucket = this.buckets[index];

        if(!bucket) return false;
        
        if(bucket[0] === key) {
            this.buckets[index] = undefined;
            this.count--;
            return true;
        }

        return false
    }

    // Devuelve el numero the keys guardadas en el hash map
    length() {
        return this.count;
    }

    // Elimina todas las entradas en el hash map
    clear() {
        this.buckets = Array(this.buckets.length).fill(null).map(() => []);
        this.count = 0;
    }

    // Devuelve un array conteniendo todas las keys del hash map
    keys() {
        let keys = [];
        // Cambiar funcionalidad cuando agregue linked lists
        for (let i = 0; i < this.buckets.length; i++) {
            let bucket = this.buckets[i];
            keys.push(bucket[0]);
        }

        return keys;
    }

    // Devuelve un array conteniendo todos los values del hash map
    values() {
        let values = [];
        // Cambiar funcionalidad cuando agregue linked lists
        for (let i = 0; i < this.buckets.length; i++) {
            let bucket = this.buckets[i];
            values.push(bucket[1]);
        }

        return values;
    }

    // Devuelve un array que contiene cada par de key y value
    entries() {
        let allPairs = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            
            if(bucket) {
                allPairs.push(bucket);
            }
        }

        return allPairs;
    }
}
