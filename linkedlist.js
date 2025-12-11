// Factory function that constructs linked lists
// uses 0-indexing
const createLinkedList = () => {

    // head and tail of the list
    let _head = null;
    let _tail = null;

    // number of elements in list
    let _size = 0;

    // Add new node to end of list; O(1)
    function append(value) {

        // Append will always work, so size must increase
        _size++;

        // Create a new node
        let newNode = createLinkNode();
        newNode.value = value;

        // If the list is empty, the new node becomes the head
        if (!_head) {
            _head = newNode;
        } else { // Otherwise, the current tail's reference points to the new Node
            _tail.next = newNode;
        }

        // No matter what, the new node becomes the tail
        _tail = newNode;

    }

    // Add new node to the start of the list; O(1)
    function prepend(value) {

        // Prepend will always work, so size must increase
        _size++;

        // Create a new node
        let newNode = createLinkNode();
        newNode.value = value;

        // If the list is empty, the new node becomes the tail
        if (!_head) {
            _tail = newNode;
        } else { // Otherwise, the current head becomes the new node's reference
            newNode.next = _head;
        }

        // No matter what, the new Node becomes the head
        _head = newNode;

    }

    // Returns the size of the linked list; O(1)
    function size() {

        return _size;

    }

    // Returns the head of the linked list; O(1)
    function getHead() {
        return _head;
    }

    // Returns the tail of the linked list; O(1)
    function getTail() {
        return _tail;
    }

    // Returns an object of a specified index from the list - head is index 0; O(n)
    function at(index) {

        // Negative indexes not allowed, return null reference
        if (index < 0) { return null; }

        // Check head first (index 0)
        let currentNode = _head;

        // Loop through linked list to specified depth
        for ( let i = 0; i < index + 1; i++ ) {

            // If node reference is null, return immediately
            if ( !currentNode ) {
                const errorNode = createLinkNode();
                return null;
            }

            // If current index is the index requested, return current node
            if ( i === index ) { return currentNode; }

            // Otherwise, move to next node
            currentNode = currentNode.next;

        }

        // If this code executes, the above code is incorrect
        throw new Error("ERROR: function at(index) implementation failure");

    }

    // Removes the item at the end of the list (tail); O(n)
    function pop() {

        // Can only remove final element if there is at least one element
        if ( _size === 0 ) { return; }

        // List is emptied if there's only one element
        if ( _size === 1 ) { 
            _head = null; 
            _tail = null; 
            _size = 0;
            return;
        }

        // Otherwise, find penultimate element of linked list
        const penul = this.at(_size - 2);

        // Set penultimate element's reference to null
        penul.next = null;

        // Update tail reference to new final element
        _tail = penul;

        // size decreases
        _size--; 

    }

    // Returns a boolean stating whether value is in the linked list; O(n)
    function contains(value) {

        // Use find(value) to determine if value exists
        return !(this.find(value) === null); 

    }

    // Returns the index of a value in the linked list, or null if not found; O(n)
    function find(value) {

        // Check head first
        let currentNode = _head;

        // Loop through linked list to specified depth
        for ( let i = 0; i < _size; i++ ) {

            // If the current node has the value, return the index, i
            if ( currentNode.value == value ) { return i; }

            // Otherwise, increment current index and move to next node
            currentNode = currentNode.next;

        }

        // If value is not found, return null
        return null;

    }

    // Returns a string containing all the values of the linked list in order, format '...( val ) -> null'; O(n^2)
    function toString() {

        // Start from the head if it exists
        let currentNode;
        if (_head) {
            currentNode = _head;
        } else {
            return "null"; // If list is empty, return "null"
        }

        // Initialise string
        let string = "";

        // Loop over node values until reaching the tail's null reference
        while (currentNode) {
            string = string + "( " + currentNode.value + " ) -> ";
            currentNode = currentNode.next;
        }

        // Add part for "null" - end of list
        string = string + "null";

        return string;

    }

    // Insert a new node with a specified value after a given node; O(1)
    function _insert(prevNode, value) {

        // If this is called, size will always increase
        _size++;

        // Create a new node with the specified value
        let newNode = createLinkNode();
        newNode.value = value;

        // Set the new node's next node reference to the list node's current next node
        newNode.next = prevNode.next;

        // Set the prevNode's next node to the new node;
        prevNode.next = newNode;

    }

    // Delete a given node from the list using the node which points to it; O(1)
    function _delete(prevNode) {

        // If this is called, size will always decrease
        _size--;

        // Set the previous node's reference to the node to be deleted's reference, removing it from the link chain
        prevNode.next = prevNode.next.next;

    }

    // Adds a new node at a particular index with a specified value O(n)
    function insertAt(value, index) {

        // Negative indexes not allowed
        if (index < 0) { return; }

        // Cases for if the specified index is the head or tail - use the existing O(1) functions
        if ( index === 0 ) { this.prepend(value); return; }
        if ( index === _size ) {  this.append(value); return; }

        // Otherwise, get the node at index-1
        let prevNode = this.at(index - 1);

        // If the node exists (index is in range), add the new node after it
        if ( !(prevNode === null) ) { _insert(prevNode, value); }

    }

    // Deletes the node at the specified index O(n)
    function removeAt(index) {

        // Negative indexes not allowed
        if (index < 0) { return; }

        // Cases for if the specified index is the head or tail
        if ( index === 0 ) { _head = _head.next; _size--; return; }
        if ( index === _size-1 ) { this.pop(); return; }


        // Find the previous node
        let prevNode = this.at(index-1);

        // If the node exists (index is in range), remove it
        if ( prevNode.next !== null) { _delete(prevNode); }

    }

    return { append, prepend, size, getHead, getTail, at, pop, contains, find, insertAt, removeAt, toString }

}

const createLinkNode = () => {

    return {
        value: null,
        next: null,
    }

}

export default createLinkedList;