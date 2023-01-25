---
title: Advent of Code (2022) Day 2
date: 2022-12-02T00:15:00
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/2)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day02.ex)

### Highlights

- It feels really naive to simply hard code the total score for each combination. The mental load of thinking through who would win and encoding that in a smart way would have taken just as long if not longer than just writing down the correct score for each combination.
- This is where pattern matching works really well. Just match each combination with the correspoding score.

```elixir
defmodule Day02 do
  use AOC

  def part1 do
    input(2)
    ~> String.split("\n")
    ~> Enum.map(fn round ->
      case round ~> String.split(" ") do
        ["A", "X"] -> 4
        ["B", "X"] -> 1
        ["C", "X"] -> 7
        ["A", "Y"] -> 8
        ["B", "Y"] -> 5
        ["C", "Y"] -> 2
        ["A", "Z"] -> 3
        ["B", "Z"] -> 9
        ["C", "Z"] -> 6
      end
    end)
    ~> Enum.sum()
  end

  def part2 do
    input(2)
    ~> String.split("\n")
    ~> Enum.map(fn round ->
      case round ~> String.split(" ") do
        ["A", "X"] -> 3
        ["B", "X"] -> 1
        ["C", "X"] -> 2
        ["A", "Y"] -> 4
        ["B", "Y"] -> 5
        ["C", "Y"] -> 6
        ["A", "Z"] -> 8
        ["B", "Z"] -> 9
        ["C", "Z"] -> 7
      end
    end)
    ~> Enum.sum()
  end

end
```
