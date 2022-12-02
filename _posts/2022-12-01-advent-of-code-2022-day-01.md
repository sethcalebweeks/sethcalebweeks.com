---
title: Advent of Code (2022) Day 1
date: 2022-12-01T09:30:00
author: Caleb Weeks
layout: post
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/1)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day01.ex)

### Highlights

- The first trick I used here was splitting the original input by two lines (`\n\n`) to group all the values for each elf together. Then I split each of these substrings on a single line break to get the individual calorie counts.
- The second trick uses the reduce to add the calorie counts together. Since the accumulator is an integer and the values are strings, we need to convert the values to integers as we go and provide an initial value of 0. For some reason, the accumulator is the second argument to the function, which I didn't know until today.

```elixir
defmodule Day01 do
  use AOC

  def part1 do
    input(1)
    ~> String.split("\n\n")
    ~> Enum.map(fn elf ->
      elf
      ~> String.split("\n")
      ~> Enum.reduce(0, fn a, b -> String.to_integer(a) + b end)
    end)
    ~> Enum.max()
  end

  def part2 do
    input(1)
    ~> String.split("\n\n")
    ~> Enum.map(fn elf ->
      elf
      ~> String.split("\n")
      ~> Enum.reduce(0, fn a, b -> String.to_integer(a) + b end)
    end)
    ~> Enum.sort(:desc)
    ~> Enum.slice(0, 3)
    ~> Enum.reduce(0, fn a, b -> a + b end)
  end

end
```
