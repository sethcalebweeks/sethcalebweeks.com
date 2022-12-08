---
title: Advent of Code (2022) Day 8
date: 2022-12-08T17:30:00
author: Caleb Weeks
layout: post
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/8)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day08.ex)

### Highlights

- Avert your eyes! This is not code that I am proud of, but it got the job done... I remember seeing some Numberphile or other YouTube video about this problem, but couldn't find it. I'm sure there is some useful math trick to make this easier. I have lots of wet and inefficient code with hard-coded values.
- The only "trick" I used here was representing the grid as a map with tuples of the positions as keys. It is cool that you can use any data type as a key in Elixir. This is the first time I have ever made use of keys that weren't strings or atoms.

{% raw %}

```elixir
defmodule Day08 do
  use AOC

  def get_grid() do
    input(8)
    |> String.split("\n")
    |> Enum.with_index
    |> Enum.reduce(%{}, fn {row, row_num}, map ->
      row
      |> String.codepoints
      |> Enum.with_index
      |> Map.new(fn {height, col_num} -> {{row_num, col_num}, String.to_integer(height)} end)
      |> Map.merge(map)
    end)
  end


  def part1 do
    grid = get_grid()
    grid
    |> Enum.map(fn {{row_num, col_num}, height} ->
      if (row_num == 0 || row_num == 98 || col_num == 0 || col_num == 98) do
        true
      else
        Enum.any?([
          (for col_num <- 0..(col_num-1), do: Map.get(grid, {row_num, col_num}) < height) |> Enum.all?,
          (for col_num <- (col_num+1)..98, do: Map.get(grid, {row_num, col_num}) < height) |> Enum.all?,
          (for row_num <- 0..(row_num-1), do: Map.get(grid, {row_num, col_num}) < height) |> Enum.all?,
          (for row_num <- (row_num+1)..98, do: Map.get(grid, {row_num, col_num}) < height) |> Enum.all?,
        ])
      end
    end)
    |> Enum.count(&Function.identity/1)
  end

  def part2 do
    grid = get_grid()
    grid
    |> Enum.map(fn {{row_num, col_num}, height} ->
      if (row_num == 0 || row_num == 98 || col_num == 0 || col_num == 98) do
        0
      else
        [
          (for col_num <- (col_num-1)..0, do: Map.get(grid, {row_num, col_num})),
          (for col_num <- (col_num+1)..98, do: Map.get(grid, {row_num, col_num})),
          (for row_num <- (row_num-1)..0, do: Map.get(grid, {row_num, col_num})),
          (for row_num <- (row_num+1)..98, do: Map.get(grid, {row_num, col_num})),
        ]
        |> Enum.reduce(1, fn direction, product ->
          visible = direction
          |> Enum.take_while(fn tree -> tree < height end)
          |> (fn blocked -> min(length(blocked) + 1, length(direction)) end).()
          (visible) * product
        end)
      end
    end)
    |> Enum.max
  end

end
```

{% endraw %}
