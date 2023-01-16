---
title: Advent of Code (2022) Day 9
date: 2022-12-10T09:20:00
author: Caleb Weeks
layout: post
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/9)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day09.ex)

### Highlights

- So... I got stuck. I didn't think it was possible for any knot to be a full diagonal away from the preceding knot, but I was wrong. I had to reach out on Reddit to ask for help.
- Other than that, I'm pretty okay with my code. I used `map_reduce` for the first time, and it was the perfect tool for the job.

{% raw %}

```elixir
defmodule Day09 do
  use AOC

  def step("R"), do: {1, 0}
  def step("L"), do: {-1, 0}
  def step("U"), do: {0, 1}
  def step("D"), do: {0, -1}

  def new_tail({head_x, head_y}, {tail_x, tail_y}) do
     case {tail_x - head_x, tail_y - head_y} do
      {-2, -2} -> {head_x - 1, head_y - 1}
      {-2, 2} -> {head_x - 1, head_y + 1}
      {2, -2} -> {head_x + 1, head_y - 1}
      {2, 2} -> {head_x + 1, head_y + 1}
      {-2, _} -> {head_x - 1, head_y}
      {2, _} -> {head_x + 1, head_y}
      {_, -2} -> {head_x, head_y - 1}
      {_, 2} -> {head_x, head_y + 1}
      _ -> {tail_x, tail_y}
     end
  end

  def part1 do
    input(9)
    |> String.split("\n")
    |> Enum.reduce({{0, 0}, {0, 0}, []}, fn motions, state ->
      [direction, steps] = String.split(motions)
      make_move_1(step(direction), String.to_integer(steps), state)
    end)
    |> elem(2)
    |> Enum.uniq
    |> Enum.count
  end

  def make_move_1({step_x, step_y}, move, state) do
    Enum.reduce(1..move, state, fn _, {{head_x, head_y}, tail, tail_positions} ->
      new_head = {head_x + step_x, head_y + step_y}
      new_tail = new_tail(new_head, tail)
      {new_head, new_tail, [new_tail | tail_positions]}
    end)
  end

  def part2 do
    input(9)
    |> String.split("\n", trim: true)
    |> Enum.reduce({[], (for _ <- 1..10, do: {0, 0})}, fn motions, state ->
      [direction, steps] = String.split(motions)
      make_move_2(step(direction), String.to_integer(steps), state)
    end)
    |> elem(0)
    |> Enum.uniq
    |> Enum.count
  end

  def make_move_2({step_x, step_y}, move, state) do
    Enum.reduce(1..move, state, fn _, {tail_positions, [{head_x, head_y} | knots]} ->
      new_head = {head_x + step_x, head_y + step_y}
      {new_knots, new_tail} = Enum.map_reduce(knots, new_head, fn knot, last_knot ->
        new_knot = new_tail(last_knot, knot)
        {new_knot, new_knot}
      end)
      {[new_tail | tail_positions], [new_head | new_knots]}
    end)
  end

end
```

{% endraw %}
