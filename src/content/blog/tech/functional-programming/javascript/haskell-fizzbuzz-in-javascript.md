---
title: Haskell FizzBuzz in JavaScript
date: 2021-11-09T18:05:36
---

In my [last post](https://dev.to/weeksseth/haskell-quicksort-in-javascript-3lma), I covered a few Haskell features along with their JavaScript equivalents (or lack thereof). The resulting code was not practical for production usage, but demonstrated how certain features of JavaScript could be used to write declarative code. This post will focus on conditional logic with some more practical takeaways.

The ubiquitous [FizzBuzz coding interview](https://www.tomdalling.com/blog/software-design/fizzbuzz-in-too-much-detail/) question has [many potential solutions](https://www.parsonsmatt.org/2016/02/27/an_elegant_fizzbuzz.html), but one simple solution in Haskell looks like [this](https://wiki.haskell.org/Fizzbuzz):

```haskell
fizz :: Int -> String
fizz n | n `mod` 15 == 0  = "FizzBuzz"
       | n `mod` 3  == 0  = "Fizz"
       | n `mod` 5  == 0  = "Buzz"
       | otherwise        = show n
```

The four lines containing the pipe (`|`) character are called guards, and they are simply syntactic sugar for a bunch of if else blocks or a switch expression. The part to the left of the equals sign is a predicate (an expression that evaluates to true or false), and the part on the right is the result. Traditionally, the FizzBuzz prompt requires each result to be printed to the console, but let's create an array that contains the results instead. I'll leave out the parts that generates the array of numbers from 1 to 100 and prints to the console.

## If blocks

```javascript
const fizz = (n) => {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return `${n}`;
};
```

That looks pretty good already, but there are a few syntactical tricks to get it to look this nice. First of all, if there is only a single statement under an if condition, the curly brackets can be omitted. Secondly, since the if statements contain return statements which will exit the function, the `else if` can be simply replaced with `if`. Finally, the otherwise condition just returns a stringified number as the default case.

## Switch statement

This seems like a problem that the switch statement was born to solve. Each case expression is compared against the switch expression for strict equality. Most of the time, you'll see a variable placed in the switch expression and a number or string literal for each case, but you can put any expression in either of those positions. Since we are looking for when the modulus is zero, we'll compare against the value zero.

```javascript
const fizz = (n) => {
  switch (0) {
    case n % 15:
      return "FizzBuzz";
    case n % 3:
      return "Fizz";
    case n % 5:
      return "Buzz";
    default:
      return `${n}`;
  }
};
```

## Ternary expressions

Both if blocks and switch blocks are statements, so we have to wrap them in a function block and use the return keyword to extract the values from them. Ternary operators are expressions, so no return keyword is required. There are also no syntactical tricks required to achieve a relatively clean implementation.

```javascript
const fizz = (n) =>
  n % 15 === 0
    ? "FizzBuzz"
    : n % 3 === 0
    ? "Fizz"
    : n % 5 === 0
    ? "Buzz"
    : `${n}`;
```

## Which is best?

Which of these three implementations is the best? Well, it all comes down to preference. The if blocks require the fewest lines of code without sacrificing readability, but your linter might not like the syntactical tricks depending on your settings. The switch statement doesn't require a manual comparison against zero for all three cases, but looks rather verbose when formatted under normal settings. The ternary operator is the closest to Haskell because it is simply an expression, but is is arguably the hardest to read.

If we really want to make it look like Haskell, we could use [Ramda's](https://ramdajs.com/docs/#cond) `cond` along with a helper function:

```javascript
const R = require("ramda");

const multOf = (x) => (n) => n % x === 0;

const fizz = R.cond([
  [multOf(15), () => "FizzBuzz"],
  [multOf(3), () => "Fizz"],
  [multOf(5), () => "Buzz"],
  [R.T, R.toString],
]);
```

Sadly, JavaScript does not have the best ergonomics for conditional expressions and instead favors conditional statements, but with a little syntactical trickery and great libraries such as Ramda, you can create concise and clean code.
