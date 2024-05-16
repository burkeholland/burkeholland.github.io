---
layout: post
date: 2024-05-16 04:14:00 +0000
title: "Prompt Negotiation"
permalink: "blog/prompt-negotiation"
---

Since the birth of ChatGPT, we've been fascinated by this new idea of "Prompt Engineering". Much has been written on this subject with multiple Prompt Engineering tutorial sites springing up and countless videos on the subject. I'm guilty of [making them myself](https://youtu.be/hh1nOX14TyY?feature=shared).

{% include youtubePlayer.html id="hh1nOX14TyY" %}

The term "engineering" implies (at least to me) that there is a known set of steps to get to an end result. For instance, I cannot write high-performance softare like a text editor such as VS Code. But there are engineers out there who absolutely can and [DO](https://youtu.be/hh1nOX14TyY?feature=shared). They know which algorithms and data structures are required, and can implement them to get the desired result. Even more than that, their ability to deliver that end result can be measured by the existance of said result. The text editor either exists and works when they are done, or it doesn't.

Prompt Engineering is just, not at all like traditional engineering.

While we know certain strategies for acheiving results with LLM's, we do not know _for certain_ what path will get us to that result. There is only trial and error. For instance, you may find that repeating a certain sentence in your prompt helps acheive a better answer. Why? NOBODY KNOWS. And a "better" answer is all you can hope for. Because the LLM will definitely give the wrong answer at least _some_ amount of the time. The best you can hope for is the _best_ answer that occurs the _most_ amount of times.

In her article, ["ChatGPT-4o vs Math"](https://www.sabrina.dev/p/chatgpt4o-vs-math), Sabrina Ramonov lays this out by trying to get the model to solve a math problem that has a picture and a verbal description. She does it 3 different ways, and all 3 times she does it without "Prompt Engineering", and then with. She uses the "Zero-Shot Chain-Of-Thought" strategy - which essentially means that you expect the answer in one interaction (Zero-Shot) and you tell the model to work in steps (Chain-Of-Thought). In one of her tests, this causes the model to give the right answer **3 times in a row** where without the Chain-Of-Thought, it only got it right once out of three times. Prompt Engineering works! But then in a subsequent test, the Chain-Of-Thought strat does nothing to improve the answer when trying to get the model to solve the problem based on an image. Prompt Engineering doesn't work!

An interesting side-note is that she tells the model to "take a deep breath and work on this problem step-by-step". That's the Chain-Of-Thought prompt. How important is the "take a deep breath"? I have no idea, but I've heard of this quirky kind of model interaction working well. For instance, I've read that ChatGPT gives better answers if you [promise to tip it](https://www.windowscentral.com/software-apps/chatgpt-will-provide-more-detailed-and-accurate-responses-if-you-pretend-to-tip-it-according-to-a-new-study).

Some of this feels more like negotiating with another human being than engineering. It's like some sort of AI Psychology that you need to be versed in more than it is "engineering".

This is where I would like to argue that Prompt Engineering is, therefore, not at all engineering to begin with.

Unfortunately, Upon checking with the Oxford Dictionary, it's clear that the word "engineering" is a bit of a catch-all. It can mean anything from "the application of science and mathematics by which the properties of matter and the sources of energy in nature are made useful to people" to "the design and manufacture of complex products" to "the action of working artfully to bring something about". Whoever got that last definition put in there pulled a fast one with "artfully". 

![screenshot of engineering definition](/assets/engineering-definition.png)

We might describe LLM output as "arftfull". That could be one way of saying it. It's not stochastic, it's art!  

Now it's true that if you provide more and more context to the LLM, the response gets better and better. But that's all answers are in the end - just a summarization of context. If you had all the context, you would already have the answer you're after. At some point, "prompt engineering" is just _giving the AI the answer that you want_. 

I think we should start calling it what it is - "Prompt Negotiation". You cannot engineer an answer from a model, but you can negotiate one. And as developers, it's going to be our job to do that negotiation so that our users don't have to. How do we do this? By building task-based solutions for our users so that they don't have to write any prompts at all. 

The academic Steven Pinker said it like this...

> "It's kind of a shame that the first large-scale implementation of AI was kind of a gimmick - a first-person chatbot. But there is tremendous promise for AI if it is task oriented."

Using GitHub Copilot as an example, task-oriented AI includes things like auto-completions which just complete code based on what you've already written. No prompt required. 

![ghost text reads your mind](/assets/ccdt-read-your-mind.gif)

Or Commit Message and PR Description generation. No prompt required for that either. 

![copilot writing a commit message](/assets/ccdt-commit-msgs.gif)

Or suggesting names when you do a rename on a symbol. 

![copilot suggesting alternate names for a symbol](/assets/copilot-rename.gif)

There is a prompt behind every single one of these things, but it's not your job as the user to worry about it. It's already been negotiated by engineers who have spent countless hours tweaking the prompts to get the best answer the most amount of times.

Or said another way, the _best_ prompt is the one that you don't have to write.