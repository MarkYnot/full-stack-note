# ES6+

- [var vs let and const](#let-and-const)
- [Template String](#template-string)
- [Spread operator](#spread-operator)
- [Destructuring](#destructuring)
- [Default parameters](#default-parameters)
- [Function](#function)
- [Closure](#closure)
- [this](#this)
- [Common array operations](#common-array-operations)
- [Set](#set)
- [Basic classes](#basic-classes)

## var vs let and const

They all used for variable declaration, the main difference is the scope.

### var

#### Scope

var is function scoped, it means if the variable is declared within a function, it can be accessed within the function. Similarly, if var is used outside of the function, the variable can be accessed in via window object. (in the browser)

```js
var apple = 'apple';
function foo() {
  var pear = 'pear';
  console.log(apple); // apple
  console.log(pear); // pear
}
console.log(apple); // apple
console.log(pear); // Uncaught ReferenceError: pear is not defined
```

#### Re-declare and update

```js
var fruit = 'apple';
var fruit = 'pear';
console.log(fruit); // pear
fruit = 'grape';
console.log(fruit); // grape
```

#### Hoisting

```js
console.log(fruit); // undefined
var fruit = 'apple';
```

equals

```js
var fruit;
console.log(fruit); // undefined
fruit = 'apple';
```

#### Problem

```js
var fruit = 'apple';
if (true) {
  // think about this is in another file
  var fruit = 'pear';
}
console.log(fruit); // pear
```

### let

#### Scope

let is block scoped. A block is a chunk of code wrapped by currly brackets `{}`
for example:
`function() {// this is a block}`
`if(true) {// this is also a block}`
let's reuse the example above but replace the keyword with _let_

```js
let fruit = 'apple';
if (true) {
  let fruit = 'pear';
}
console.log(fruit); // apple
```

#### Re-declare and update

```js
let fruit = 'apple';
// let fruit = "pear"; // Uncaught SyntaxError: Identifier 'fruit' has already been declared
fruit = 'grape';
console.log(fruit); // grape
```

#### Hoisting

```js
console.log(fruit); // Uncaught ReferenceError: Cannot access 'fruit' before initialization
let fruit = 'apple';
```

Different to _var_, let is hoisted, but the vairable is not initialized

### const

Scope and the hoisting is the same as _let_

#### Re-declare

```js
const fruit = 'apple';
// const fruit = "pear"; // Uncaught SyntaxError: Identifier 'fruit' has already been declared
fruit = 'grape'; // Uncaught TypeError: Assignment to constant variable.
console.log(fruit);
```

#### Update

```js
const fruit = { name: 'apple', color: 'red' };
// fruit = {name: "apple", color: "green"}; // Uncaught TypeError: Assignment to constant variable.
fruit.color = 'green';
console.log(fruit); // {name: "apple", color: "green"}
```

similar in array

```js
const fruits = [];
// fruits = ["apple"]; // Error
fruits.push('apple');
console.log(fruits); // ["apple"]
```

### Others

```js
console.log(fruit); // Uncaught ReferenceError: fruit is not defined
```

### Quiz

1. What's the output of the following code

```js
var i = 5;
for (var i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i);
```

2. What's the output of the following code

```js
let i = 5;
for (let i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i);
```

3.

```js
var arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log('Index: ' + i + ', element: ' + arr[i]);
  }, 1000);
}
```

### Conclusion

| keyword | scope    | re-declare | update | hoisting              |
| ------- | -------- | ---------- | ------ | --------------------- |
| var     | function | Yes        | Yes    | Yes (undefined)       |
| let     | block    | No         | Yes    | Yes (not initialized) |
| const   | block    | No         | No     | Yes (not initialized) |

Extra reading source
[Var, Let, and Const – What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)

## Template String

Also named, template literal, string interpolation

```js
const name = 'mason';
const age = 104;
// es5
console.log('My name is ' + name + ", and I'm " + age + ' years old');

//es6
console.log(`My name is ${name}, and I'm ${age} years old`);
```

## Spread operator

```js
const array = [1, 2];
const newArray = [...array, 3, 4];
console.log(newArray); // [1, 2, 3, 4]
```

```js
const fruit = { name: 'apple', color: 'green' };
let newFruit = { ...fruit, color: 'red' };
console.log(newFruit); // {name: "apple", color: "red"}
newFruit = { color: 'red', ...fruit };
console.log(newFruit); // {color: "green", name: "apple"}
```

## Destructuring

Object destructuring extracts property from object and assigns it to variables.
One way would be using the dot notation

```js
const fruit = { name: 'apple', color: 'red' };
const name = fruit.name; // apple
const color = fruit.color; // red
```

With the new syntax, we don't need to repeatly refer to the `fruit` object

```js
const fruit = { name: 'apple', color: 'red' };
const { name, color } = fruit;
console.log(name); // apple
console.log(color); // red
```

we can also rename the variable

```js
const fruit = { name: 'apple', color: 'red' };
const { name: fruitName, color: fruitColor } = fruit;
console.log(fruitName); // apple
console.log(fruitColor); // red
```

or destructing an array

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'pear', color: 'green' },
];
const [apple, pear] = fruits;
console.log(apple); // {name: "apple", color: "red"}
console.log(pear); // {name: "pear", color: "green"}
const [{ color: appleColor }, { color: pearColor }] = fruits;
console.log(appleColor); // red
console.log(pearColor); // green
```

more complicated use cases

```js
const [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo); // 1
console.log(bar); // 2
console.log(baz); // 3
```

```js
const [, , third] = ['foo', 'bar', 'baz'];
console.log(third); // "baz"
```

```js
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]
// Rest element must be last element
```

```js
const [missing = true] = [];
console.log(missing); // true
```

## Default parameters

```js
function sum(a = 1, b = 1) {
  return a + b;
}
console.log(sum()); // 2
console.log(sum(undefined, 2)); // 3
console.log(sum(3, 4)); // 7
```

## Function

Functions are first class objects in JS
We can basically treat it like any other javascript objects

```js
// Assign it to a variable
const foo = function (){};

// Or property of a object
const bar = {
  baz: function(){},
  foo: foo,
}

// Pass it as an argument to another function
function alpha(fn) {
  ...
}
alpha(foo);

// Return a function from another function
function beta() {
  return function(){}
}
```

### High order function

A “higher-order function” is a function that accepts functions as parameters and/or returns a function.

### Arrow function

```js
const add = function (x, y) {
  return x + y;
};
// vs
const add = (x, y) => {
  return x + y;
};
// equals
const add = (x, y) => x + y;
```

### Callback

callback function plays a core role in how js works asynchronously.

Explain in a simple way, pass the function as a parameter and when some _event_ happened (addEventListener), execute this function.

```js
function logger(param) {
  console.log(param);
}
function sum(x, y, callback) {
  setTimeout(function () {
    const total = x + y;
    callback(total);
  }, 1000);
}
sum(1, 2, logger);
```

### Callback with arrow function

```js
setTimeout(function () {
  console.log('normal function');
}, 1000);

setTimeout(() => {
  console.log('arrow function');
}, 1000);
```

## Closure

Closures are everywhere in JS. A closure is when a function has access to its lexical scope even when it is called outside of it. Closures are created every time a function is created, at function creation time.

A few complex but common closure cases:

1. a function was passed to another function as param

```js
// we normally don't write this code
const number = 1;
function foo() {
  console.log(number);
}
function bar(fn) {
  const number = 2;
  fn();
}
bar(foo); // 1
```

2. a function was returned by another function

```js
function foo() {
  const number = 1;
  return () => {
    console.log(number);
  };
}
const number = 100;
foo()(); // 1
```

We can use this technique to hide some data.

```js
function createCounter() {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const getCount = () => {
    return counter;
  };
  return {
    increment,
    getCount,
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount());
```

### IIFEs

Immediately Invoked Function Expressions
Commonly used to avoid polluting the global namespace and modules!

```js
(function () {
  // some variable in it's own scope
})();
```

### quiz

```js
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f();
}
checkscope();
```

```js
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
checkscope()();
```

```js
function createCounter() {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const getCount = () => {
    return counter;
  };
  return {
    increment,
    getCount,
  };
}
const counter1 = createCounter();
counter1.increment();
console.log(counter1.getCount());

const counter2 = createCounter();
counter2.increment();
counter2.increment();
console.log(counter2.getCount());
```

## this

In most cases, the value of `this` is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called. [[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)]\* \*[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is enabled by default in ES6 modules

### _this_ keyword in normal functions

```js
function foo() {
  console.log(this);
}
foo(); // window
```

### _this_ keyword in normal functions with bind, call, apply

```js
// a1,a2
foo.call({ number: 1 }); // {number: 1}
// [a1,a2]
foo.apply({ number: 2 }); // {number: 2}
// bind returns a new function
const bar = foo.bind({ number: 3 });
bar(); // {number:3}
```
### NaN 相当于Not a number


### _this_ keyword in an object and callback functions(this指向的一定是对象)

```js
const calendar = {
  currentDay: 6,
  nextDay() {
    this.currentDay++;
    console.log(this.currentDay);
  },
};
calendar.nextDay();
```

```js
const calendar = {
  currentDay: 6,
  nextDay() {
    setTimeout(function () {
      this.currentDay++;
      console.log(this.currentDay);
    }); // .bind(this)
  },
};
calendar.nextDay();
```

In arrow function, `this` points to the enclosing lexical context's `this`.

```js
const calendar = {
  currentDay: 6,
  nextDay() {
    setTimeout(() => {
      this.currentDay++;
      console.log(this.currentDay);
    });
  },
};
calendar.nextDay();
```

```js
const calendar = {
  currentDay: 6,
  normal: function () {
    console.log(1, this);
    setTimeout(function () {
      console.log(2, this);
    });
  },
  arrow: function () {
    console.log(3, this);
    setTimeout(() => {
      console.log(4, this);
    });
  },
};
calendar.normal();
calendar.arrow();
/*
 1 {currentDay: 6, normal: ƒ, arrow: ƒ},
 3 {currentDay: 6, normal: ƒ, arrow: ƒ},
 2 Window {window: Window, self: Window, document: document, name: '', location: Location, …},
 4 {currentDay: 6, normal: ƒ, arrow: ƒ}


  - 为什么2会显示 成window?
      当你在浏览器的环境中使用setTimeout并在其中使用一个常规函数（非箭头函数），那么这个函数内的this通常指向的是全局的Window对象。这里的匿名函数没有一个显式的上下文，所以它默认到全局的上下文，即Window对象。这也是为什么你在控制台里看到2后面跟的是关于Window对象的详细信息
*/
/*
  - 关键点:
      -- 常规函数有自己的this上下文，而箭头函数则不会创建自己的this，它会从其外围作用域捕获this值。
*/

const dog = {
  name: 'Fido',
  breed: 'Labrador',
  speak: function() {
    console.log(`Woof! My name is ${this.name} and I am a ${this.breed}.`);

    setTimeout(function() {
      console.log(`Delayed woof! My name is ${this.name} and I am a ${this.breed}.`);
    }.bind(this), 1000); // 使用 .bind(this) 来设置函数内部的 this
  }
};

dog.speak();


// 在setTimeout中使用常规函数时，你需要格外小心，因为this可能不是你预期的上下文。如果你想维持某个特定的上下文，你可以使用箭头函数或者使用函数的.bind()方法来明确设定它。

```

### quiz

```js
const object = {
  message: 'Hello, World!',

  getMessage() {
    const message = 'Hello, Earth!';
    return this.message;
  },
};

console.log(object.getMessage()); // Hello World;
```

```js
const object = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  },

  farewell: () => {
    return `Goodbye, ${this.who}!`;
  },
};

console.log(object.greet()); // Hello, World
console.log(object.farewell()); // Hello, undefine

/*
    箭头函数中是没有this指向的，它的指向是上级作用域
*/
```

```js
const object = {
  who: 'mason',
  cb() {
    console.log(`Hello, ${this.who}!`);
  },
};

function foo(cb) {
  cb();
}

foo(object.cb); // Hello, Undefined (这里传入的不是一个 function，而是function 的reference。所以这只是reference。)
object.cb(); //  Hello, mason
```

```js
const object = {
  who: 'mason',
  cb() {
    function foo() {
      console.log(`Hello, ${this.who}!`);
    }
    foo(); // 因为函数内部调用，并不执行任何东西
  },
};

object.cb(); // Hello undefined(?)
```

## Common array operations

### Manipulation

```js
const fruits = ['apple'];
fruits.push('pear');
console.log(fruits); // ["apple", "pear"]
fruits.unshift('grape');
console.log(fruits); // ["grape", "apple", "pear"]
// splice(x,y,newAdded)
// remove y items from index x, and add newAdded
fruits.splice(1, 1, 'watermelon', 'peach');
console.log(fruits); // ["grape", "watermelon", "peach", "pear"]
let fruit = fruits.pop();
console.log(fruit); // pear
console.log(fruits); //  ["grape", "watermelon", "peach"]
fruit = fruits.shift();
console.log(fruit); // grape
console.log(fruits); // ["watermelon", "peach"]
```

### Iteration

#### for loop (提前break 的情况下会使用传统的 for loop)
```js
const fruits = ['apple', 'pear'];
for (let index = 0; index < fruits.length; index++) {
  const fruit = fruits[index];
  console.log(fruit);
}
// apple 
// pear
```

#### for...of

```js
const fruits = ['apple', 'pear'];
for (let fruit of fruits) {
  console.log(fruit);
}
// apple
// pear

// for...in -> 0, 1    usually used in object
```

#### forEach

```js
const fruits = ['apple', 'pear'];
fruits.forEach((fruit) => console.log(fruit));
// apple
// pear
// cannot use break here
```

### Map(每个element都会遍历一次， 每个element都会进行映射)

```js
const fruits = ['apple', 'pear'];
const newFruits = fruits.map((fruit) => ({
  name: fruit,
  price: 10, 
})); //箭头后面加括号的原因是因为让 js 更好的识别这是一个函数还是对象
console.log(newFruits);
// [{name: "apple", price: 10},{name: "pear", price: 10}]
```

### Reduce
```js
const numbers = [1, 2, 3];
const sum = numbers.reduce((accumulator, number) => accumulator + number, 0);
console.log(sum); // 6
// accumulator初始值为零
```


### Search
```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(2)); // true
// Array.some (some方法和 map 一样，返回的是 callback fucntion。如果结果为 true，直接返回，不会接着遍历. 但是filter 就会全部遍历一遍)    -- includes 也是一样
console.log(numbers.indexOf(2)); // 1
// Array.findIndex
```

```js
const numbers = [1, 2, 3, 4, 5];
const odds = n umbers.filter((i) => i % 2); // 看如果不是2的倍数的话，就能被筛选
console.log(odds); // [1,3,5]

const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const filteredFruits = fruits.filter((i) => i.color === 'green');
console.log(filteredFruits);
// [{name: "pear", color: "green"}, {name: "grape", color: "green"}]
```

```js
const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const greenFruit = fruits.find((i) => i.color === 'green');
console.log(greenFruit);
// {name: "pear", color: "green"}
```

### map， for-loop， for-each的区别
```js
const fruits = ['apple', 'pear']
const newFruits = []
for (let index - 0; index < fruits.length; index++) { 
  const newFruit = {fruit: fruits[index], price: 10}; 
  newFruits.push(newFruit);
}

/*For-loop就是遍历，但是map 的话会重新生成一个新的 array再返回*/
```


`面试题: 你觉得这段代码使用的time complexity是什么， 如果太复杂，你会怎简化(for-loop, forEach 和map 的 time complexity是不一样的)`



#### Extra reading source

[link](https://dmitripavlutin.com/operations-on-arrays-javascript/)

## Set
Set is a data structure, we use it to store _unique_ values.(目地就是去重，保持数据唯一性)

```js
const set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set(4) {1, 2, 3, 4}
set.add(5);
console.log(set); // Set(5) {1, 2, 3, 4, 5}
set.add(1);
console.log(set); // Set(5) {1, 2, 3, 4, 5}
console.log(set.has(5)); // true
set.delete(1);
console.log(set.has(1)); // false
console.log(set.size); // 4
```

```js
const array = [1, 2, 2, 3, 4, 4];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4]
```

## Basic Classes
Classes are a template for creating objects. Classes are in fact functions, class is only a syntax sugar.  (class 在 js就是一个 function)

```js
function Person(name) {    // pascol case（每个单词首字母都是大写）
  this.name = name;
  this.toString = function () {
    console.log('name: ' + this.name);
  };
}
var mason = new Person('mason');
mason.toString(); // name: mason

/*
var mason = new Person('mason'); 这个new 的关键字
这句代码的 new 其实干了以下的一些事情:

   创建一个空对象: 当使用new关键字时，JavaScript引擎首先会创建一个空的JavaScript对象。

   设置原型链: 新创建的空对象的[[Prototype]]（即__proto__）会被设置为构造函数的prototype属性所指向的对象。这样新对象就可以继承构造函数原型上定义的所有属性和方法。

   绑定this: 在构造函数内部，this关键字被设置为新创建的空对象。这样你就可以在构造函数中通过this为新对象添加属性和方法。

   执行构造函数的代码: 接下来，构造函数内部的代码（属性和方法的定义等）会被执行，通常这一步会为新对象添加一些初始化的属性和方法。

   返回新对象: 如果构造函数没有显式返回一个对象（或其他非原始类型的值），那么这个新创建的对象会被返回。如果构造函数返回了一个对象，那么这个返回的对象会作为new表达式的结果。
*/
```

```js
class Person {
  constructor(name) { //每次new之后都会执行这个constructor函数
    this.name = name;
  }

  toString() {
    console.log(`name: ${this.name}`);
  }
}
const mason = new Person('mason');
mason.toString(); // name: mason
```

### extends (这其实的不是继承， 跟prototype chain相关)
```js
class Teacher extends Person {
  constructor(name) {
    super(name);
  }
  teach() {
    console.log(`${this.name} is teaching`);
  }
}

const mason = new Teacher('mason');
mason.teach(); // mason is teaching
mason.toString(); // name: mason -> BUT how?
```

```js
// is mason constructed by Teacher?
mason instanceof Teacher; // true
mason instanceof Person; // true
mason instanceof Object; // true
```

### Prototype chain
- 在JavaScript中，prototype链（或原型链）是一种实现继承和属性查找的机制。JavaScript对象有一个名为[[Prototype]]的内部属性，它指向另一个对象。当试图访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript引擎会沿着[[Prototype]]链查找这个属性或方法。

 ##### 创建对象和 `[[Prototype]]`
  当你通过构造函数和new关键字创建一个新对象时，这个新对象的[[Prototype]]会自动设置为构造函数的prototype属性。
```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
}

const alice = new Person('Alice');
// alice.[[Prototype]] 现在指向 Person.prototype
```

 ##### 属性查找和方法调用
   当你尝试访问一个对象的属性或方法时，JavaScript首先会在该对象自身查找这个属性或方法。如果找不到，它会沿着[[Prototype]]链向上查找。

   ```js
   alice.sayHello();  // 输出 "Hello, Alice"
// JavaScript引擎在alice对象上没有找到sayHello方法，
// 它会沿着[[Prototype]]链找到Person.prototype上的sayHello方法。

   ```

 ##### 继续沿着prototype链
   prototype链不仅限于一级，它可以有多个层级。比如：
   ```js
        function Mammal() {
        this.isMammal = true;
      }

      Mammal.prototype.breathe = function() {
        console.log('Breathing...');
      }

      // 设置 Person.prototype 的 [[Prototype]]
      Person.prototype = Object.create(Mammal.prototype);

      const bob = new Person('Bob');
      bob.breathe();  // 输出 "Breathing..."
      // 查找路径: bob -> Person.prototype -> Mammal.prototype
   ```

 ##### 达到链的顶端
  所有对象的`[[Prototype]]`链最终都会达到Object.prototype，除非你显式地设置一个对象的`[[Prototype]]`为`null`。

  ```js
    console.log(Person.prototype.__proto__ === Object.prototype);  // true
    console.log(Object.prototype.__proto__);  // null
  ```


## quiz

```js
function Pet(name) {
  this.name = name;
  this.getName = () => this.name; // 实际开发中不会这么写
}

const cat = new Pet('Fluffy');
console.log(cat.getName()); // Fluffy
const { getName } = cat;
console.log(getName()); // Fluffy

/*这里有一个this指向错误的例子*/
class Pet{
   constructor(name){
    this.name = name;
   }  

   getName(){
    return this.name;
   }
}
const cat = new Pet('Fluffy');
const { getName } = cat;
console.log(getName()); // undefined

/*两种解决方法:*/
//1.新的arroy function

 const newGetName = () => {
   cat.getName();
 }

 //2. .bind()
```

## Asynchronous in JS

JS is single threaded, which means it can only execute one command at a time. (单线程 => 一次只能做一件事情)


- 异步 Asynchronous - 阻塞 blocking (按顺序执行，先执行一行代码，结束后再执行另外的) - 通过callback 进行返回
- 同步 Synchronous - 非阻塞 Non- blocking (不按顺序执行， 可以先执行后面的再执行前面的)


- 事件(event) -- 时间完成后使用回调函数来展现结果
- callback(回调函数)
- web API
- event loop 事件循环: 控制callback 函数什么时候被执行。
  
```js
// 函数声明 => 异步代码 => 同步代码
function foo() {
  console.log('foo'); 
}
setTimeout(foo, 1000);
console.log('hello');
```


```js
/*关于eventloop 的例子*/
function foo() {
  console.log('foo');// [1005ms]
} //[1ms]


function runFor1Sec() {
  // a for loop or while loop or a heavy computing logic which requires 1 sec to finish
} //[2ms]


setTimeout(foo, 1000);  // [3ms]   事件注册
runFor1Sec();  //[1003ms]
console.log('hello');  //[1004ms]


//GEC: Global execution Context
//FET: Function Execution Context
//call stack 调用栈 (stack -> First in Last out)
 //[]
 //[]
 //[]
 //[GEC]  call-stack都会首先运行 GEC, 然后再运行别的进程。每一行js代码都会以一进一出call stack的方式运行，直到没有代码可以跑后， call-stack 才会为空。

//web API(浏览器提供的，处理异步操作)
// setTimeOut 1000ms -> foo [1003ms]
//在写setTimeout 的时候，后面的时间不一定多久之后就运行， 而是最长是多久之后再运行

// callback queue (这是一个当事件已经结束了的时候才加入这个queue的, 换个说法，就是当同步代码结束后，才开始执行callback quene 里面的事件)
//[foo][1003ms]

// Event loop 其实就是在web API, callback queue还有 callStack中的轮循。其中，首先会跑 web API, 然后call stack, 等call stack为空时， 再跑 callback queue的代码。 然后关闭线程，最后关闭进程。

//为什么event loop是 js 的一个核心概念，因为它属于异步原理， 而js就是以异步执行为主的。
```

Quiz questions references
[1](https://dmitripavlutin.com/javascript-this-interview-questions/#question-1-variable-vs-property)


## Javascript 模块化
 - 每个JS的文件都是一个模块，在外部可以调用
