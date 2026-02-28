---
layout: post
date: 2024-09-26 08:38:00 +0000
title: "Throw that AI code away"
permalink: "blog/throw-ai-code-away"
---

There's a lot of debate these days on whether or not AI generated code is a good thing. People are quite worried about the volume of code being written by AI right now, and how that's going to affect us all in this field down the road. Most developers don't get to work on new projects - they maintain and build on existing ones. What will it be like to maintain these things when most of that code is written by AI?

We could argue that we already have no lack of poorly written, fragile code bases. You don't need an AI to do that. Plenty of us have worked at places with software that is held together by bubble game and bailing wire and everyone just prays that nothing breaks. So maybe having more AI generated code is a _good_ thing. Because at least there will be some baseline for quality.

That feels a bit like a race to the bottom though. We should aspire to impove our craft, not find the lowest tolerable position for the quality.

In [his article](https://erikbern.com/2024/09/27/its-hard-to-write-code-for-humans.html) titled, "It's hard to write code for computers, but it's even harder to write code for humans", Erik Bernhardsson says this about code written for other developers like SDK's and API's...

> Writing this code is much harder, because you're not just telling a computer what to do, you're also grappling with another user's mental model of your code. Now it's equal part computer science and psychology of reasoning, or something. How do you get that person to understand your code?

If code is "equal part computer science and pyschology", then there is nothing more unqualified to write it than AI. AI has no clue what good code looks like, and in any event, the definition of "good code" changes depending on what you're building. 

But what if what you're building can simply be thrown away?

Developer's tend to underestimate the value of "throw-away apps". These are small applications, utilities, scripts and the like that we write to do a specific thing at a point in time. And we do a LOT of this - scripts to copy things, a quick and dirty CLI utility to pull in some data, a shell script to create thumbnails from videos. These are things that likely never get checked into source control. They just kind of sit on our computer to be used a few times and then forgotten about forever more.

I think that AI is particularly suited for these throw-away automatation programs. Particularly because code quality _doesn't matter_ in these types of programs. For instance, the other day I needed to scrape some data from YouTube to pull in all the videos from my channel along with the descriptions and titles. This is straightfoward work - call the YouTube API and spit out the right fields into a CSV. But I don't know the YouTube API. I don't know the shape of the response. I don't know how to authenticate. It would have takenme some ttime to learn these concepts and get something working. But I was able to do it with GitHub Copilot in about 30 minutes.

Furthermore, I _understand_ the code that Copilot is writing. It's like me paying a contractor to write some apps for me where I don't care how they do it, just as long as it gets done. Only this contractor is only 9$ a month.

We can't undersell the value of AI in these scenarios. We do need to be careful though as one-off's do sometimes graduate to real applications. In fact, that's probably how a lot of applications that exist today started. 

I think generally speaking, if you're building something that's throw-away, you can go pretty willy nilly with the AI. The second that you realize that this thing is going to be a thing, you must be much more responsible about how you engage with AI to write the code. As someome once told me years ago, "Remember, you're writing code for the moron who has to maintain this app later on, which is mostly likely you."

