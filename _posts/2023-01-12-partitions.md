---
title: Partitions!
date: 2023-01-12T16:40:00
author: Caleb Weeks
layout: post
---

My friend [Peter](https://github.com/plpullen) pointed out that today is 01/12/23 (written in the standard US notation of mm/dd/yy). This is a great example of a partition! Specifically, a partition of 2 items and a step (overlap) of 1 for the list (0123).

In Clojure, this can be written as:
```clojure
(partition 2 1 [1 2 3]) ;; => ((0 1) (1 2) (2 3))
```

Partitions can be really useful to solve certain problems. I have been learning Clojure as part of the [#12in23](https://exercism.org/challenges/12in23) challenge, and here are two problems I solved using partition.

### [Sublist](https://exercism.org/tracks/clojure/exercises/sublist)
The goal of this problem was to determine is one list is a sublist of, superlist of, equal to, or not equal to another list. This is not the same as a subset, in that the order matters. The trick here is to partition the second list into sublists of the same length as the first list. If the first list is equal to one of those partitions, it is a sublist of the second list.
```clojure
(defn sublist? [list1 list2]
      (some #(= list1 %)
        (cons [] (partition (count list1) 1 list2)))
  )

(defn classify [list1 list2]
      (def is-sublist (sublist? list1 list2))
      (def is-superlist (sublist? list2 list1))
      (cond
        (and is-sublist is-superlist) :equal
        is-sublist :sublist
        is-superlist :superlist
        :else :unequal)
  )
```

### [Acronym](https://exercism.org/tracks/clojure/exercises/acronym)
This one took me a long time to solve. The goal is to return the acronym of a string, assuming that the letter of each word is used along with any hyphenated or camel cased words.

My first iteration involved a hacky mix of Regex, string splitting, and comparing the number of capital letters in a word to its length. After sleeping on it, I came up with this second iteration which doesn't involve any Regex. The idea is that we only want the letters that are uppercase followed by a lowercase letter, or lowercase letters that come after a non-letter (space or hyphen). Partitioning the string into chunks of two let me check each of these conditions.
```clojure
(defn keep-capitals [acc [fst snd]]
  (cond
    (and
      (Character/isUpperCase fst)
      (not (Character/isUpperCase snd)))
        (str acc fst) 
    (and
      (not (Character/isLetter fst))
      (Character/isLowerCase snd))
        (str acc (str/upper-case snd))
    :else acc))

(defn acronym
  "Converts phrase to its acronym."
  [phrase]
  (reduce keep-capitals "" (partition 2 1 phrase))
  )
```

What are some cool places you have seen partition show up?
