// Testing functionality of imported function
import createLinkedList from "./linkedlist.js";

// Test creating a list
console.log("Testing instantiation, expected result : \nnull");
const testList = createLinkedList();
console.log(testList.toString());
console.log("");

// Test .size works for lists with no elements (size 0)
console.log("Testing .size for empty list, expected result : \n0");
console.log(testList.size());
console.log("");

// Test initialising list with one item
console.log("Testing initialisation, expected result : \n( 20 ) -> null");
testList.append(20);
console.log(testList.toString());
console.log("");

// Test .size for 1 item
console.log("Testing .size for single-item list, expected result : \n1");
console.log(testList.size());
console.log("");

// Test adding second item to test general append behaviour
console.log("Testing append, expected result : \n( 20 ) -> ( 30 ) -> null");
testList.append(30);
console.log(testList.toString());
console.log("");

// Test adding a third item - list object only stores references to head and tail, so this checks other elements work
console.log("Testing non-extreme elements, expected result : \n( 20 ) -> ( 30 ) -> ( 40 ) -> null");
testList.append(40);
console.log(testList.toString());
console.log("");

// Test creation of multiple distinct list objects to ensure factory creates instances, not a single item
// Also tests initialising lists with prepend
console.log("Testing multiple lists and prepend initialisation, expected result : \n( 50 ) -> null \n( 20 ) -> ( 30 ) -> ( 40 ) -> null");
let testList2 = createLinkedList();
testList2.prepend(50);
console.log(testList2.toString());
console.log(testList.toString());
console.log("");

// Test prepend on lists initialised with append
console.log("Testing prepend on lists initialised with append, expected result : \n( 10 ) -> ( 20 ) -> ( 30 ) -> ( 40 ) -> null")
testList.prepend(10);
console.log(testList.toString());
console.log("");

// Test .size for multiple items
console.log("Testing .size for multi-item list and with prepend/append components, expected result : \n4");
console.log(testList.size());
console.log("");

// Test appending and prepending to a list initialised with prepend
console.log("Testing use of append and prepend on lists initialised with prepend, expected result : \n( 40 ) -> ( 50 ) -> ( 60 ) -> null")
testList2.prepend(40);
testList2.append(60);
console.log(testList2.toString());
console.log("");

// Test retrieval of the head and tail elements of lists
console.log("Testing retrieval of head and tail elements from lists, expected result : \n10 40 \n40 60");
console.log(testList.getHead().value + " " + testList.getTail().value);
console.log(testList2.getHead().value + " " + testList2.getTail().value);
console.log("");

// Test at(index) function for head, non-extreme, and tail elements
console.log("Testing retrieval of non-extreme elements from lists, expected result : \n10 30 40");
console.log(testList.at(0).value, testList.at(2).value, testList.at(3).value);
console.log("");

// Test at(index) function for +ve/-ve out of range indexes
console.log("Testing out of range errors for at(index) retrieval, expected result : \nnull null")
console.log(testList.at(-5), testList.at(5));
console.log("");

// Test pop() function to ensure correct removal of items
console.log("Testing pop(), expected result : \n( 10 ) -> ( 20 ) -> ( 30 ) -> null")
testList.pop();
console.log(testList.toString());
console.log("");

// Test getTail() after pop() to ensure references updated correctly
console.log("Testing getTail() after pop, expected result : \n30")
console.log(testList.getTail().value);
console.log("");

// Test size() after pop() to ensure it correctly updated
console.log("Testing size() after pop, expected result : \n3")
console.log(testList.size());
console.log("");

// Test pop() and size() on an empty list
console.log("Testing pop() on an empty list before calling size(), getHead(), and getTail(), expected result : \n0 null null");
testList2 = createLinkedList();
testList2.pop();
console.log(testList2.size(), testList2.getHead(), testList2.getTail());
console.log("");

// Test pop() on a list of size 1
console.log("Testing pop() on a list of size 1, then calling size(), getHead(), and getTail(), expected result : \n0 null null");
testList2.append(50);
testList2.pop();
console.log(testList2.size(), testList2.getHead(), testList2.getTail());
console.log("");

// Test contains(value) on elements that are and aren't in the linked list
console.log("Testing contains(value) on various items, expected result : \ntrue true false false")
console.log(testList.contains(30), testList.contains(10), testList.contains(15), testList.contains("30"));
console.log("");

// Test contains(value) on empty list
console.log("Testing contains(value) on an empty list, expected result : \nfalse")
console.log(testList2.contains(30));
console.log("");

// Test find(value) on elements that are and aren't in the linked list
console.log("Testing find(value) on various items, expected result : \n2 0 null null")
console.log(testList.find(30), testList.find(10), testList.find(15), testList.find("30"));
console.log("");

// Test find(value) on empty list
console.log("Testing find(value) on an empty list, expected result : \nnull")
console.log(testList2.find(30));
console.log("");

// Test removeAt(index) on non-extreme elements
console.log("Testing removeAt(index) on middle of array, expected result : \n( 10 ) -> ( 30 ) -> null");
testList.removeAt(1);
console.log(testList.toString());
console.log("");

// Test insertAt(index) on non-extreme elements
console.log("Testing insertAt(index) on middle of array, expected result : \n( 10 ) -> ( 20 ) -> ( 30 ) -> null");
testList.insertAt(20, 1);
console.log(testList.toString());
console.log("");

// Test insertAt(index) on head
console.log("Testing insertAt(index) on head, expected result : \n( 0 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> null");
testList.insertAt(0, 0);
console.log(testList.toString());
console.log("");

// Test insertAt(index) on tail
console.log("Testing insertAt(index) on tail, expected result : \n( 0 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> ( 40 ) -> null");
testList.insertAt(40, 4);
console.log(testList.toString());
console.log("");

// Test removeAt(index) on head
console.log("Testing removeAt(index) on head, expected result : \n( 10 ) -> ( 20 ) -> ( 30 ) -> ( 40 ) -> null");
testList.removeAt(0);
console.log(testList.toString());
console.log("");

// Test removeAt(index) on tail
console.log("Testing removeAt(index) on tail, expected result : \n( 10 ) -> ( 20 ) -> ( 30 ) -> null");
testList.removeAt(3);
console.log(testList.toString());
console.log("");

// Test append/prepend after using insertAt/removeAt
console.log("Testing use of append/prepend after insertAt/removeAt calls to ensure consistency of references, expected : \n( 0 ) -> ( 10 ) -> ( 20 ) -> ( 30 ) -> ( 40 ) -> null")
testList.append(40);
testList.prepend(0);
console.log(testList.toString());
console.log("");

// Test size after complex manipulation
console.log("Testing .size after complex manipulation of a linked list, expected result : \n5");
console.log(testList.size());
console.log("");