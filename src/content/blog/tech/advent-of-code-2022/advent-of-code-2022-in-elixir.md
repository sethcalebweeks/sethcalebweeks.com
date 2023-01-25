---
title: Advent of Code (2022) in Elixir
date: 2022-12-01T09:00:00
---

This year, I am attempting to solve [Advent of Code](https://adventofcode.com/) in Elixir. Last year, I attempted to solve [Advent of Code in both Haskell and JavaScript](https://dev.to/sethcalebweeks/advent-of-code-1-in-javascript-haskell-24in) as a challenge to learn and teach functional programming in JavaScript, but I [didn't make it very far](https://dev.to/sethcalebweeks/lessons-learned-from-aoc-2021-2b3b). I hope to post every day (for as far as I can get), but I'll only be sharing the code and highlighting the couple tricks I used to solve the problem.

### For the JavaScript and Functional Programming crowd...

If you follow me on [dev.to](https://dev.to/sethcalebweeks) for my usual JavaScript and functional programming articles, sorry to flood your notifications with Elixir posts this month. I plan to write more about JavaScript and functional programming soon, so stay tuned. James Sincalir has a [great book](https://jrsinclair.com/skeptics-guide) that I'd life to follow up on, and I've been playing with some esoteric JavaScript ideas.

### Back to Elixir...

Elixir is a functional programming language, but with a very different style. I have a couple conveniences for my Advent of Code [setup](https://github.com/sethcalebweeks/advent-of-code-2022) this year. I don't anticipate being one of the fastest solvers by any means, but it's nice to be able to fetch the input file instead of copying and pasting into a file. I'm also using a library I made called [pex](https://hex.pm/packages/pex) which provides an alternative pipe operator for happy case programming. Truthfully, I don't think I'll need to add much error handling anyway, since the goal is simply to get the answer, but it still helps unwrap the occasional ok tuple.
