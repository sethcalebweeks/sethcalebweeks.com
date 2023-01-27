---
title: "TIL: Clojure Setup"
date: 2023-01-26T09:20:00
---

I've been learning Clojure through [Exercism](https://exercism.org/) this month, and decided to live stream my setup today. Today was my second attempt at live streaming.
- I installed [KeyViz](https://github.com/mulaRahul/keyviz) during the stream to show which keys I was pressing.
- I'm pretty happy with my Clojure setup in Caval so far. I don't really use the REPL and instead just evaluate code inline with `Alt-Enter`.
- Paredit hasn't really gotten in my way too much, and I've used slurp and split to some extent.
- I didn't finish solving the pig latin problem on the live stream, but my final solution can be found [here](https://exercism.org/tracks/clojure/exercises/pig-latin/solutions/sethcalebweeks)
- As usual, I tried to avoid using Regex as much as possible. This sort of problem could have been solved entirely in Regex, but I'm trying to learn Clojure, not Regex.
- My favorite part of my solution was using `some` to get the first truthy result of mapping over a word with a collection of functions. This is probably the first time  that the homoiconicity of Lisp dialects has felt like more than just a cool thing to talk about. I was able to practically play with the syntax of the language to map functions over a value. There are certainly other ways of achieving this without syntactic gymnastics, but it worked really well.

Check out the video here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9VQMh9_blAk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


