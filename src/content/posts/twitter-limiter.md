---
title: How to limit the number of Twitter posts in your timeline using JavaScript
description: >-
  I have a bit of a problem scrolling too much of the awesome content on Twitter. There are just too many other people
  creating cool ideas and software! At first I justified it by the fact that I find academic papers (my feed is curated
  to mostly academic CS/ML/SE), but now I admit it's too much! In a bid to waste more time in order to waste less time,
  I created a simple script that puts an extra UI onto each post in my Twitter feed: - For the first five posts, it
  numbers them to remind me how many I've browsed. - After that, it blocks them out with a reminder of the limit I set
  (currently I keep it at five posts).
date: 2024-03-12
kind: blog
---

I have a bit of a problem scrolling too much of the awesome content on Twitter. There are just too many other people creating cool ideas and software! At first I justified it by the fact that I find academic papers (my feed is curated to mostly academic CS/ML/SE), but now I admit it's too much!
In a bid to [waste more time in order to waste less time](https://xkcd.com/1205/), I created a [simple script](https://gist.github.com/bstee615/1f4aa8a6d63dc74aff53dac17d287d91) that puts an extra UI onto each post in my Twitter feed:

- For the first five posts, it numbers them to remind me how many I've browsed.
- After that, it blocks them out with a reminder of the limit I set (currently I keep it at five posts).

Here's what the result looks like:
![A screenshot of twitter.com showing the post numbering and limiting features.](/media/twitter-limiter.webp)

Here's the link to the script: [JavaScript for Twitter Post Limiter · GitHub](https://gist.github.com/bstee615/1f4aa8a6d63dc74aff53dac17d287d91).
I currently import it automatically with [ViolentMonkey](https://violentmonkey.github.io/).
Plans are to turn it into a FireFox extension (once conference deadline season is over 🙃).
Hope it's useful!
