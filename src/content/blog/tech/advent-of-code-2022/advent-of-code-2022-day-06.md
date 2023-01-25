---
title: Advent of Code (2022) Day 6
date: 2022-12-06T09:30:00
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/6)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day06.ex)

### Highlights

- This may have been the simplest problem so far. For a while, I was checking the wrong stopping condition, so it took me longer than it should have.
- Reduce is my go-to construct for processing a list of things. You can cram as many things into the accumulator as you need to. There are probably other enumerable operations that would do a better job, but reduce is the one-size-fits-all tool that I always reach for.

```elixir
defmodule Day06 do
  use AOC

  def first_marker(input, marker_length) do
    input
    |> String.to_charlist
    |> Enum.reduce({0, [], false}, fn char, {count, window, stop} ->
      cond do
        stop -> {count, window, true}
        length(window) < marker_length -> {count + 1, window ++ [char], false}
        length(Enum.uniq(window)) == marker_length -> {count, window, true}
        true -> {count + 1, Enum.slice(window, 1, marker_length - 1) ++ [char], false}
      end
    end)
    |> elem(0)
  end

  def part1, do: input(6) |> first_marker(4)

  def part2, do: input(6) |> first_marker(14)

end
```
