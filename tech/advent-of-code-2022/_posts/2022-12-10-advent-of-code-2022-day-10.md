---
title: Advent of Code (2022) Day 10
date: 2022-12-10T20:50:00
author: Caleb Weeks
layout: post
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/10)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day10.ex)

### Highlights

- I had a lot of fun with today's puzzle. The CRT idea was brilliant, and it was awesome to be able to play with something visual.
- The code was also relatively straightforward. After parsing all the register instructions, we just needed to play with the output to calculate/reveal the answer.
- The function guard does all the heavy lifting for the second part. It checks to make sure the register value puts the sprite within the index that is currently being drawn using a modulus and a range check.

{% raw %}

```elixir
defmodule Day10 do
  use AOC

  def execute("noop", {cycles, register}), do: {cycles ++ [register], register}
  def execute("addx " <> value, {cycles, register}) do
    updated_register = register + String.to_integer(value)
    {cycles ++ [register, updated_register], updated_register}
  end

  def part1 do
    input(10)
    |> String.split("\n", trim: true)
    |> Enum.reduce({[1], 1}, &execute/2)
    |> elem(0)
    |> (&Enum.slice(&1, 19..length(&1))).()
    |> Enum.take_every(40)
    |> Enum.zip(20..220//40)
    |> Enum.reduce(0, fn {register, cycle}, signal -> signal + register * cycle end)
  end

  def part2 do
    input(10)
    |> String.trim
    |> String.split("\n", trim: true)
    |> Enum.reduce({[1], 1}, &execute/2)
    |> elem(0)
    |> Enum.with_index
    |> Enum.map(fn
      {register, position} when register - rem(position, 40) in -1..1 -> "#"
      _ -> "."
    end)
    |> Enum.chunk_every(40)
    |> Enum.map(&Enum.join/1)
  end

end

```

{% endraw %}
