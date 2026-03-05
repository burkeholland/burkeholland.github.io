---
layout: post
title: "We need practical AI workflows"
date: 2025-11-17 08:40:00 +0000
categories: posts
permalink: /posts/practical-workflows/
---

I've been thinking a lot about practical AI workflows for software development lately. Not the flashy demos or the "wow" factor of generating code from a prompt, but the day-to-day, grind-it-out workflows that actually help developers build and maintain real software projects.

The reality is, most AI-generated code today ends up being more of a distraction than a help. 

Developers spend more time tweaking prompts, sifting through irrelevant suggestions, and trying to coax the AI into producing something useful than they do actually accepting said code. This isn't because the technology is bad. It's because the workflows around using AI in development are still immature. It's also because we have sold developers on the idea that they can one shot things if they have the perfect prompt and hold their mouth just right. I'm guilty of doing that myself. This is great for demos, but is not how real development works - at all. And so when the AI doesn't deliver exactly what you want in one go, frustration sets in quickly.

I've been experimenting over the past few weeks with building more structured workflows that actually let me build in an iterative manner - irrespective of what misconceptions I may have about _how_ the AI should work. Here's what I've found...

1. **Move in simple, testable increments.** Instead of asking the AI to generate large chunks of code or entire features, I break down tasks into small, steps that can be easily tested and validated. When you ask for too much from the AI at once, you can get thousands of lines of code. This is impossible to review. And if it breaks something else, you have no idea where to start looking. Small increments let you validate each piece before moving on.

2. **Git is more important than ever.** It is more important than EVER to have a solid git workflow in place. AI makes it too easy to just run everything down main and hope for the best. This is a recipe for disaster. Use feature brances, make small commits, and review changes carefully. If something goes wrong (and I assure you that it will), you want to be able to quickly revert to a known good state.

3. **You are single-threaded.** You can run a bunch of AI agents in parallel, but you are still single-threaded. You can only focus on one thing at a time and your context window is also limited. Trying to juggle multiple AI-generated changes or features at once will lead to confusion and mistakes. Focus on one task, get it done, then move on to the next.

These are not ground breaking statements. In fact, 2 years ago they would be considered common sense. But with the hype around AI, it's easy to forget the fundamentals of good software development. AI is a tool, not a magic wand. It can help you be far more productive than you would be on your own, but you need to scope your expectations and build a workflow that works for you.

There are no silver bullets here, but I've put together what I feel is a solid, foundational workflow that you can customize. VS Code is really designed to provide you all the pieces you need to create your own workflows that let you be productive with AI. You just need to put the pieces together in a way that works for you.

## Foundational Pieces of AI Workflows

I've said before the "Prompt Engineering" is just giving the model the answer that you want. In other words, if the answer you need is in the context that you give the model, it will almost always identify it and regurgitate it back to you. LLM's are really good at this. The hard part is just getting the right context to the model in the first place because you do not in fact know what the answer you want is.

I've identified a 3 step process that I think helps you get from generic prompt to specifc context that you can use to build real software incrementally.

1. Plan
2. Generate
3. Implement

We'll break these down 1 by 1, but the difference between these steps and what you may have seen before is that these steps are all prompts which depend on each other. They are tightly coupled in a way that lets you build up context using more capable models and then implement with smaller models that are faster and cheaper.

### 1. Plan

In the planning phase, the model is focused on understanding the problem, gathering context, and breaking the work down into steps. The planning prompt assumes that whatever it has been asked to do will all be done in a single branch. It's then the planners job to identify all of the steps that need to be done to complete the work. Each step is a commit that will be made to the branch. It also identifies missing context and iterates with the user to gather that context before moving on to the next step.

The plan is saved in the "plans" folder underneath a subfolder that matches the branch name. At this point, the planning document is the only asset we are after. We are not interested in code at all.

A sample planning prompt might look like this:

```
/plan Add drag and drop to the items in the list view
```

This will create a `plan.md` document and place it in the `plans/add-drag-and-drop` folder.

Recommended Model: Claude Haiku 4.5

### 2. Generate

In the generate phase, the model is given the planning document from step 1 and told to create implementation documents for each step. It will break down steps into multiple different phases.

```
/generate #


There are no shortage of planning prompts out there. The problem is that many of them are just too generic to be useful. What does a plan look like? What level of detail should be in it? What exactly are you supposed to do with a plan once you have it?


