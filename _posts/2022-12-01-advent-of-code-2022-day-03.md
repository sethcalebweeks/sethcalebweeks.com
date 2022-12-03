---
title: Advent of Code (2022) Day 3
date: 2022-12-02T13:10:00
author: Caleb Weeks
layout: post
---

### Links

- [Intro](https://sethcalebweeks.com/advent-of-code-2022-in-elixir/)
- [Problem Statement](https://adventofcode.com/2022/day/3)
- [Code](https://github.com/sethcalebweeks/advent-of-code-2022/blob/main/lib/Day03.ex)

### Highlights

- As in most programming languages, strings are represented as binary code points in Elixir. The `?` operator can be used to match on a range of characters, and the `<<>>` can be used to get the code of a string.
- For the first part, I split each line in half and checked to see if each item in the first half was in the second half using a reduce. As soon as a match is found, the value is calculated and replaces the accumulator. Any subsequent calls to reduce simply return the accumulator as is if it is already an integer.
- For the second part, I chunked the lines by three. For each group of three, I got rid of duplicates within each sack and flattened all three into a single list. Then I calculated the frequencies of each character and found the character with a frequency of three.

```elixir
defmodule Day03 do
  use AOC

  def value(code) when code in ?a..?z, do: code - 96
  def value(code) when code in ?A..?Z, do: code - 38

  def part1 do
    input(3)
    ~> String.split("\n")
    ~> Enum.map(fn sack ->
      middle = div(String.length(sack), 2)
      {first, second} = String.split_at(sack, middle)
      first
      ~> String.to_charlist()
      ~> Enum.reduce(false, fn
        _, acc when is_integer(acc) -> acc
        char, _ -> String.contains?(second, <<char>>) && value(char)
      end)
    end)
    ~> Enum.sum
  end

  def part2 do
    input(3)
    ~> String.split("\n")
    ~> Enum.chunk_every(3)
    ~> Enum.map(fn chunk ->
        chunk
        ~> Enum.flat_map(&Enum.uniq(String.to_charlist(&1)))
        ~> Enum.frequencies()
        ~> Enum.find(fn {_, freq} -> freq == 3 end)
        ~> fn {char, _} -> value(char) end
      end)
    ~> Enum.sum
  end

end
```
