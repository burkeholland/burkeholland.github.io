---
layout: post
title: "Ideas Were Never the Problem"
date: 2026-03-10 10:00:00 +0000
categories: posts
permalink: /posts/ideas-were-never-the-problem/
preview: true
---

I have a friend -- had a friend, we've lost touch -- who had a new app idea every single time we got together. Every coffee, every happy hour, every time we ended up standing in a parking lot way too long after an event because neither of us wanted to be the one to end the conversation. He'd lean in and say "okay, I've been thinking about this thing" and off we'd go.

I'm embarrassed to admit this, but I used to dismiss most of them. Not out loud. I'd nod and ask questions and say "yeah, that's interesting." But in my head I was doing the developer math: how long would that take, how complicated is the backend, who would actually use this. And I'd arrive at the same conclusion every time: not worth it.

The thing is, I don't actually know if those ideas were good or not. Because none of them ever got built. And I was, more often than not, the person standing between the idea and the code. Developers have been the default arbiter of what gets built -- not because we're the smartest people in the room, but because we're the ones who knew how to do the building. That's changing.

<div style="text-align: center; margin-bottom: 2rem;">
  <img src="/assets/images/ideas-were-never-the-problem.jpg" alt="An open gate revealing a vast landscape" style="max-width: 100%; height: auto;">
</div>

## The GarageBand Moment

When Apple shipped GarageBand, it changed music production. Suddenly you didn't need a $10,000 mixing board and a guy who knew how to use it. You had loops, you had virtual instruments, you had something you could actually sit down with on a Tuesday afternoon and make something that sounded... okay. Sometimes pretty good.

But here's the thing I keep thinking about: ask yourself if music is actually *better* now. There's more of it, absolutely. Way more. An almost incomprehensible amount of it. But a lot of it sounds the same. The tools lowered the barrier but they didn't raise the ceiling. They made it easy to sound decent, and now "decent" is everywhere. The transcendent stuff -- the stuff that genuinely moves you -- is still rare. Maybe rarer, because it's harder to find in the flood.

I've written about this already -- the strip malls thing, the cathedrals thing. [Go read that if you want the full anxiety spiral.](/posts/nothing-worth-remembering/) The short version: accessible tools have a way of producing a lot of output that looks like the thing without being the thing.

AI and code are in that same moment right now. Anyone can sit down, describe what they want, and get something that runs. That's genuinely remarkable. I don't want to be the person who dismisses that. But "something that runs" and "something worth building" are not the same sentence.

## The 80/20 Problem

Here's where I land: you can vibe your way to about 80% of any given project. Maybe more, for simple stuff. A landing page, a personal tool, a prototype you want to show someone. AI is shockingly good at this. You describe the thing, it builds the thing, you move some stuff around, it looks like software.

Then you hit the 20%.

The 20% is where things get serious. Security isn't a vibe. You can't feel your way through an auth implementation and hope it's right. A production database that loses customer data because someone vibed their way through the access control layer is a real problem with real consequences. Not "oops, the button is the wrong shade of blue" consequences. "We are being sued and your users' data is on a forum somewhere" consequences.

Performance isn't a vibe either. An app that works fine with 10 users and falls over with 1,000 isn't a finished app -- it's a prototype that got promoted. Deployment, observability, reliability: these are disciplines. They have depth. You can learn them, but you can't shortcut them by asking nicely.

Look, I'm not saying AI can't help here. It can. But the person using AI to navigate the last 20% needs to actually understand what they're doing. They need to know when the AI is wrong. They need to know what questions to ask. They need to know that "it compiles" is not the same as "it's correct." That requires real technical knowledge. The kind you build over years, not over a weekend.

Vibes don't deploy. Not reliably. Not safely. Not at scale.

## The Flip Side (and This Is the Good Part)

Here's what I've been sitting with, though: this is actually a great moment to be a developer.

Think about what the job used to look like. A huge part of it was being the gatekeeper. Someone comes to you with an idea, you estimate it, the estimate is big, the idea dies. You've done this a hundred times. Most developers I know have a graveyard of projects that never got off the ground because the cost of getting started was too high. The math never worked.

That math is different now. The people who used to stop at "I have an idea" can now get a lot further before they need you. They can validate, prototype, poke at the thing. And when they do come to a developer, they're not coming with a napkin sketch -- they're coming with something half-built and a clear picture of what they actually need. They've done the discovery work themselves.

I mean, that changes the job entirely. Instead of sitting in meetings trying to translate a fuzzy business requirement into code, you're inheriting something that already basically works and being asked to make it real. Make it secure. Make it fast. Make it production-ready. Make it something that will still be running in two years without the person who built the prototype even remembering they wrote it.

That's a more interesting job. That's the part I always liked, honestly.

## What This Actually Means

The flood of ideas my friend used to bring me -- the ones I was quietly dismissing -- a lot of those ideas are going to get built now. Not all of them are good. Probably most of them aren't. But some of them are. Some of them would have been worth building years ago if anyone had found the time and the money and the right person to build them.

AI didn't change that ideas were the problem. Ideas were never the problem. The problem was the gap between the idea and the execution. That gap is smaller now. A lot smaller.

But the gap isn't zero. The last mile is still real. The craft is still real. The person who actually understands how software works -- how it breaks, how it scales, how to make it trustworthy -- that person is still necessary. If anything, they're more necessary, because there are more things trying to make it across the finish line.

The ceiling didn't get higher. But a lot more people just found the door.
