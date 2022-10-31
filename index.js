function createBase(baseNumber) {
    return function(N) {
      // we are referencing baseNumber here even though it was declared
      // outside of this function. Closures allow us to do this in JavaScript
        console.log(baseNumber + N);
    }
  }
  
//   var addSix = createBase(6);
//   addSix(10);
//   addSix(21);

//   console.log(3 * "20")

//   for(let i = 1; i < 100; i++) {
//     let f = i % 3 === 0,
//     b = i % 5 === 0

//     console.log(f ? (b ? 'fizzbuss' : 'Fizz') : b ? 'buzz' : i)
//   }

//   let x = 50

//   function xad (b)
//   {
//       let x = 200;
//       var m = 200
//       console.log('the answer is ', x + b)
//   }

//   xad(x)

//   console.log('m = ', m)

// console.log('y =', y)

var y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y);

let 