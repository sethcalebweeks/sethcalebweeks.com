---
title: Advent of Code (2022) Day 4
date: 2022-12-04T10:20:00
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/4)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day04.ex)

### Highlights

- Nothing too extraordinary with today's problem. For the second part, I started by only checking to see if either endpoint of one elf was within the endpoints of the other elf. Honestly, I still can't figure out why this didn't work, and I had to do the same check in the other direction. Maybe it will come to me at some point today.

```elixir
defmodule Day04 do
  use AOC

  def part1 do
    input(4)
    ~> String.split("\n")
    ~> Enum.map(fn pair ->
      ends = Regex.named_captures(~r/(?<l1>.*)-(?<h1>.*),(?<l2>.*)-(?<h2>.*)/, pair)
      ~> Map.new(fn {key, value} -> {String.to_atom(key), String.to_integer(value)} end)
      (ends.l1 <= ends.l2 && ends.h1 >= ends.h2) ||
      (ends.l2 <= ends.l1 && ends.h2 >= ends.h1)
    end)
    ~> Enum.count(&Function.identity(&1))
  end

  def part2 do
    input(4)
    ~> String.split("\n")
    ~> Enum.map(fn pair ->
      ends = Regex.named_captures(~r/(?<l1>.*)-(?<h1>.*),(?<l2>.*)-(?<h2>.*)/, pair)
      ~> Map.new(fn {key, value} -> {String.to_atom(key), String.to_integer(value)} end)
      (ends.l1 >= ends.l2 && ends.l1 <= ends.h2) ||
      (ends.h1 >= ends.l2 && ends.h1 <= ends.h2) ||
      (ends.l2 >= ends.l1 && ends.l2 <= ends.h1) ||
      (ends.h2 >= ends.l1 && ends.h2 <= ends.h1)
    end)
    ~> Enum.count(&Function.identity(&1))
  end

end
```
