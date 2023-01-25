---
title: "Haskell Quicksort in JavaScript"
date: 2021-10-20T20:00:00
---

Haskell has a particularly elegant implementation of the quicksort algorithm:

```haskell
qs :: (Ord a) => [a] -> [a]
qs [] = []
qs (x:xs) =
  let smaller = qs [a | a <- xs, a <= x]
      bigger = qs [a | a <- xs, a > x]
  in  smaller ++ [x] ++ bigger
```

This algorithm creates a new array that is sorted instead of sorting the given array in place. Therefore, there is no point in implementing a partitioning strategy (usually Hoare's).

To someone who is unfamiliar with Haskell, this may look like a bunch of nonsense. Let's break it down and see how we might come up with an elegant version in JavaScript.

## Type Signature
```haskell
qs :: (Ord a) => [a] -> [a]
```
This is just a type signature which can be read like this: "`qs` is a function that takes and array of `as` and produces a new array of `as` where each element `a` can be compared to another." The `(Ord a)` part is a type constraint that means that `as` need to be comparable, which makes sense since this is a sorting algorithm.

## Pattern Matching
```haskell
qs [] = []
qs (x:xs) = -- and so on...
```
Pattern matching is kind of like function overloading combined with destructuring. JavaScript does not have function overloading, but it does have destructuring. We can write `(x:xs)` as `[x, ...xs]` in JavaScript. Unfortunately, we'll have to manually check if the array is empty or not.

## Let Expression
```haskell
let smaller = qs [a | a <- xs, a <= x]
    bigger = qs [a | a <- xs, a > x]
in  smaller ++ [x] ++ bigger
```
In Haskell, everything is an expression instead of a statement. Expressions are things that produce values. Statements are just lines of code that do something. Sometimes, it is useful to define intermediate values in an expression, and that is what the let block does. The result of the block is an array of `smaller ++ [x] ++ bigger`.

## List Comprehension
```haskell
[a | a <- xs, a <= x]
```
List comprehension generates lists (or arrays) using generators and guards (or filters). This code can be read "give me a list of `as` where each `a` is taken from the `xs` list and is less than or equal to `x`." (This is really just syntactic sugar on top of do notation, which itself is just syntactic sugar for monadic composition, but that's a topic for another time.)

Unfortunately, JavaScript does not have list comprehension, so the best we can do is use the `Array.filter` method: `xs.filter(s => s <= x)`. Arrow functions enable a relatively elegant alternative.

## Now in JavaScript
Here's the cool trick to put everything together: since there are only two branches of logic, the ternary operator provides a great mechanism for handling the conditions. We can use destructuring to split the array to its head and tail. Then we use the ternary operator to return an empty array if the head is undefined (since the array was empty), or the new array made up of the smaller array, current element, and bigger array. Here is the final code:
```javascript
// qs :: (Ord a) => [a] -> [a] (from Haskell)
const qs = ([x, ...xs]) => x ? [
  ...qs(xs.filter(s => s <= x)), 
  x,
  ...qs(xs.filter(b => b > x))
] : []
```

The coolest part of this implementation is that the whole thing is just an expression! There are no variable declarations at all (except the quicksort algorithm itself being assigned to a constant).

This is definitely not the most efficient implementation of the quicksort algorithm, but it demonstrates how to write elegant code that makes use of the features of JavaScript. It would be cool to have pattern matching, list comprehensions, and let expressions in JavaScript, but you can get pretty far with the tools that JavaScript already provides. _In an industry where code clarity and maintainability is becoming increasingly more critical and where device capacity is practically overkill, the ability to write correct, clear and concise code is invaluable._
