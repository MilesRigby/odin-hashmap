import createLinkedList from "./linkedlist.js";

const HashMap = () => {

    // The hashmap
    let _map;

    // Current number of buckets in the hashmap and number of filled buckets
    let _capacity = 2
    let _used = 0;

    // Current number of stored keys in the hashmap
    let _length = 0;

    // calculate the loadFactor as the proportion of buckets containing >0 elements
    const _loadFactor = () => { return _used/_capacity; }

    // Maximum load factor allowed before hashmap must increase in size
    const _loadLimit = 0.75;

    // Creates a hashmap object of a given size
    function _createHashMap() {

        let newMap = [];

        // Add linked lists to the map such that it is of the correct size
        for (let i=0; i<_capacity; i++) { newMap.push(createLinkedList()); }

        return newMap;

    }

    // Checks if the loadLimit has been reached, and resizes the hash table if so, doubling in size each time
    function checkResize() {

        // return immediately if not enough buckets have elements
        if ( _loadFactor() < _loadLimit ) { return; }

        // reset _used and _length to 0
        _used = 0;
        _length = 0;

        // Set up list of all key-value pairs
        let kvPairs = [];

        // Loop over current hashmap, and retrieve all entries
        for (let i = 0; i < _capacity; i++) {

            // Get head node from bucket
            let node = _map[i].getHead();

            // Loop through linked list, retrieving all nodes
            while (node) {
                kvPairs.push(node.value);
                node = node.next;
            }

        }

        // Double _capacity to track proportion of new map's buckets in use
        _capacity *= 2;

        // Reinitialise hashmap with the new capacity
        _map = _createHashMap();

        // Use set() to rehash all kv pairs and place them in the map
        for (let i = 0; i<kvPairs.length; i++) {
            let kvPair = kvPairs[i];
            set(kvPair.key, kvPair.value);
        }

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

    // Internal function to retrieve a node from a bucket by its key
    function _searchBucketByKey(bucket, key) {

        // Get the head node of the bucket
        let node = bucket.getHead();

        // Search bucket for a node with the requested key
        while (node) {

            // Retrieve the key-value pair stored on the current node
            let kvPair = node.value;

            // If the node's kvPair has the requested key, return the node
            if ( key === kvPair.key ) { return node; }

            // Otherwise, continue to the next node
            node = node.next;

        }
        
        // If key is not found, return null
        return null;

    }

    // Retrieves a node using its key. Exists because this code was copied in multiple functions 
    function _getNodeByKey(key) {

        // Determine the hash for the requested key
        let hash = _hash(key);

        // Get the bucket the hash refers to
        let bucket = _accessBucket(hash);

        // Find the bucket node with the requested key, if it exists
        return _searchBucketByKey(bucket, key);

    }

    // Adds a key-value pair to the hashmap, or replaces the value of an existing key
    // !!! NEEDS UPDATE to resize map on high load factor !!!
    function set(key, value) {

        // Determine the hash for the requested key
        let hash = _hash(key);

        // Get the bucket the hash refers to
        let bucket = _accessBucket(hash);

        // Find the bucket node with the requested key, if it exists
        let node = _searchBucketByKey(bucket, key);

        // If a node with the requested key already exists, replace its key-value pair's value with the new value
        if (node) { node.value.value = value; }

        // If no node with the requested key exists, append the new key-value pair to the bucket
        else {
            bucket.append({
                key: key,
                value: value
            });

            // Increase the tracked length of the hashmap - the number of key-value pairs in it
            _length++;

            // If the bucket was previously empty, increase _used by 1 - a new bucket is now in use - and resize if needed
            if ( bucket.size() === 1 ) { 
                _used++;
                checkResize();
            }

        }

    }

    // Searches the hashmap for a node with
    function get(key) {

        // Search for an existing node with the requested key
        let node = _getNodeByKey(key);

        // If a node with the requested key exists, return its key-value pair's value, otherwise return null
        if (node) { return node.value.value; }
        else      { return null; }

    }

    // Checks if a key exists in the hashmap by checking if a node containing the key exists (_getNodeByKey() does not return null)
    function has(key) { return (_getNodeByKey(key) !== null); }

    // Removes a key-value pair by key, returning whether the key was in the hash map to begin with
    function remove(key) {

        // Determine the hash for the requested key
        let hash = _hash(key);

        // Get the bucket the hash refers to
        let bucket = _accessBucket(hash);

        // Find the node associated with the requested key for deletion
        let node = _searchBucketByKey(bucket, key);

        // Return false if no value is found
        if (node === null) { return false; }

        // Delete the node containing the key-value pair from the bucket
        bucket.removeAt(bucket.find(node.value));

        // Decrease tracked length of the hashmap
        _length--;

        return true;

    }

    // Returns the length of the hashmap
    function length() { return _length; }

    // Initialise hashmap
    _map = _createHashMap();

    return { set, get, has, remove, length };

}

export default HashMap;