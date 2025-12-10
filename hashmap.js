// Testing functionality of imported function
import createLinkedList from "./linkedlist.js";

const HashMap = () => {

    // The hashmap
    let _map;

    // Current number of buckets in the hashmap and number of filled buckets
    let _capacity = 16;
    let _used = 0;

    // calculate the loadFactor as the proportion of buckets containing >0 elements
    const _loadFactor = () => { return _used/_capacity; }

    // Maximum load factor allowed before hashmap must increase in size
    const _loadLimit = 0.75;

    // Creates a hashmap object of a given size
    function _createHashMap(size) {

        let newMap = [];

        // Add linked lists to the map such that it is of the correct size
        for (let i=0; i<size; i++) { newMap.push(createLinkedList()); }

        return newMap;

    }

    // Converts a key to a hash code. Keys must be a string
    function _hash(key) {

        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _capacity;
        }

        return hashCode;

    }

    // Defines access behaviour for buckets in the map
    function _accessBucket(index) {

        // Ensure index is in range - js will not enforce this itself
        if (index < 0 || index >= _capacity) {
            throw new Error("Trying to access index out of bounds");
        } else {
            return _map[index]; // return the bucket at position index
        }

    }

    // Adds a key-value pair to the hashmap, or replaces the value of an existing key
    // Needs update to resize map on high load factor
    function set(key, value) {

        // Determine the hash for the requested key
        let hash = _hash(key);

        // Get the bucket the hash refers to, and its head node
        let bucket = _accessBucket(hash);
        let node = bucket.getHead();

        // Search bucket for a node with the requested key
        while (node) {

            // Retrieve the key-value pair stored on the current node
            let kvPair = node.value;

            // If the node's kvPair has the requested key, replace the kvPair's value with the new value and return from the set() function
            if ( key === kvPair.key ) { kvPair.value = value; return; }

            // Otherwise, continue to the next node
            node = node.next;

        }

        // If key did not already exist, append the requested key and value as a key-value pair to the bucket
        bucket.append({
            key: key,
            value: value
        });

    }

    // Initialise hashmap
    _map = _createHashMap(_capacity);

    return { set };

}

export default HashMap;