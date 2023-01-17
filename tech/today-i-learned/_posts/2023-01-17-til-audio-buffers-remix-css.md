---
title: TIL: Audio Buffers, Remix, CSS
date: 2023-01-17T09:00:00
layout: post
---

- I've been working on a little tool for work involving recording audio in the browser and sending it to a 
server for processing with Deepgram. It took me a long time to figure out the difference between a blob, file,
buffer, and arrayBuffer. TL;DR:
  - A `File` is a type of `Blob` in JavaScript.
  - You can go from a `Blob` to and `ArrayBuffer` by calling `blob.arrayBuffer()`.
  - To create a `Buffer`, call `Buffer.from(arrayBuffer, encoding)`. For `wav` files, the encoding should be `base64`.
  - Deepgram expects a `Buffer` along with a mimetype (in this case `audio/wav`).

  I plan on making a more detailed post about this soon.
- Since this tool was just for testing, I wanted a simple CSS solution so that I didn't have to focus on styling.
I went with [MVP.css](https://andybrewer.github.io/mvp/) and [Tailwind](https://tailwindcss.com/) for small tweaks.
It worked really well, but in the future, I'd like to take a look at [Pico.css](https://picocss.com/docs/), which I
just learned about from [this Fireship video](https://youtu.be/lHZwlzOUOZ4).
- I used [Remix](https://remix.run/) to build this application, and there were a few gotchas that I had to navigate around.
To be honest, I don't even know if my approach is correct.
  - I've heard many people talk about how TypeScript saves them time, but right now, it only slows me down. I plan to
  keep at it and hopefully get over that hump.
  - I kind of forgot that Remix is a SSG app. This means, there is code that is run on the server and on the client in the same file.
  Code that can only run on the server needs to be handled one way, and code that can only run on the client (relying on web APIs),
  needs the same attention. I rn into the problem in both directions. There are many React libraries that won't work with Remix out of the box.
  Server side code is an easier fix by moving all imports to a `*.server.ts` file.
  - Remix has a one way data flow model that spans accross the server and the client. I'm not sure how this cycle is supposed to interact with local state.
  I needed to maintain some local state to determine the visibility of a component. When receiving a response back from the server,
  I wanted to change that local state value, but I'm not sure how to do that. I ended up using `useTransition` to observe that response from the server,
  but it doesn't quite feel right.
  
  It's been a long time since I've done development in React. I think I did okay, but my code could definitely use some refactoring...
