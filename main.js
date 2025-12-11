import HashMap from "./hashmap.js";

const test = HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries());

test.set('elephant', 'white')
test.set('frog', 'verdant')
test.set('grape', 'mauve')
test.set('hat', 'tar')
test.set('ice cream', 'shiny')
test.set('jacket', 'navy')

console.log(test.entries());

test.set('moon', 'silver')

console.log(test.entries())