---
layout: post
title: "Essential custom instructions for GitHub Copilot"
date: 2025-01-05 11:58:00 +0000
categories: posts
permalink: /posts/essential-custom-instructions/
---

Prompt engineering - or should I say ["Prompt Negotiation"](./2024-04-21-prompt-engineering.md) - is (currently) an important part of productivity with AI. Your success working with tools like GitHub Copilot is gonna be directly related to how well you prompt it. GitHub Copilot does try to handle as much of the prompt engineering for you behind the scenes as it can, but just like all your passive agressive relationships, you need to tell it what you want instead of expecting it to just know. It's not a mind reader. You need to give it Custom Instructions. 

## Custom Instructions

[Custom Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization) are exactly that - custom prompts that get sent to the model with every request. 

You can define these at a project level or at an editor level. Often these are demonstrated as specific project level instructions such as a command like `prefer fetch over axios`. These project specifc custom instructions are quite powerful and can be checked in and shared. You can create a custom instructions file for your project by adding a `.github/gopilot-instructions.md` file, or by adding a [file attribute to the instructions settings](https://code.visualstudio.com/docs/copilot/copilot-customization#_use-settings). You can have multiple of these file attributes which means you can have multiple different instructions files.

These very specific types of project instructions are super helpful with getting better help from your AI pair progammer. But it's less obvious what you can/should do with the more global, editor level instructions.

I've been working heavily with GitHub Copilot for the past several months, and I've added 4 custom instructions that I've found greatly increase my productivity with GitHub Copilot. These are more generic prompt engineering "best practices" will help you avoid pitfalls and get better code from the LLM.

You can add the "global instructions" that I'm about to give you by going to your User Settings (JSON) file and adding keys like so...

```json
"github.copilot.chat.codeGeneration.instructions": [
    { "text": "this is an example of a custom instruction" }
]
```

Ok - let's do it.

## Ask for missing context

>"Avoid making assumptions. If you need additional context to accurately answer the user, ask the user for the missing information. Be specific about which context you need."

The achilles heal of LLM's is that they are designed to provide a response no matter what. It's [the paperclip problem](https://cepr.org/voxeu/columns/ai-and-paperclip-problem) applied to LLM's. If you design a system to provide an answer, it is going to do that at all costs. This is why we get hallucinations. 

If I said to you, "make a GET request to the api", you would likely ask me several follow-up questions so that you could actually complete that task in a way that works. An LLM will just write a random GET request because it _does not actually care_ if the code works or not.

Copilot tries to mitigate a lot of this for you with its sytem prompt, but you can reduce hallucinations further by instructing the AI to ask you for clarification if it needs more context.

This isn't bullet proof. LLM's seem so hell bent on answering you at all costs that often I find this instruction is just ignored. But on the occasions that it works, it's a nice surprise.

![Copilot asking for missing context](/assets/missing-context.png)

## Provide file names

>"Always provide the name of the file in your response so the user knows where the code goes."

I've noticed that Copilot will sometimes give me back several blocks of code, but won't mention where they belong. I then have to figure out which files it is referring to which takes an extra cycle. This prompt forces the LLM to always provide the file name. 

If you are working in theoretical space where you aren't talking about specific project files, Copilot will provide made up file names for the code snippets. This is fine because it's a detail that doesn't matter in that context.

## Write modular code

>"Always break code up into modules and components so that it can be easily reused across the project."

I tend to write a lot of frontend code, which is all about components these days. I've found that Copilot will often try and do too much in a single file when it should ideally break out UI code into separate components. AI's are fairly good at organization, so if you ask it to break things out into components, Copilot will do an impressive job of suggesting the right places to decouple. I've found this prompt works quite well in non-UI code as well. If I ask for a change in an API, this prompt helps Copilot break out services, repositories, etc.

## Code quality incentives

> "All code you write MUST be fully optimized. 'Fully optimized' includes maximizing algorithmic big-O efficiency for memory and runtime, following proper style conventions for the code, language (e.g. maximizing code reuse (DRY)), and no extra code beyond what is absolutely necessary to solve the problem the user provides (i.e. no technical debt). If the code is not fully optimized, you will be fined $100."

This prompt comes almost verbatim from Max Wolf's ["Can LLM's write better code"](https://minimaxir.com/2025/01/write-better-code/). In this post, Max decribes trying to get LLM's to write better by code iterating on the same piece of code with the prompt, "write better code". He finds that the above prompt combined with Chain of Thought produces very nice results - specifically when used with Claude. He uses the very last line to incentivize the LLM to improve it's answers in iteration. In other words, if the LLM returns a bad answer, your next response should inform the LLM that it has been fined. In theory, this makes the LLM write better code because it has an incentive to do so when it otherwise might keep on returning bogus answers.

Chain of thought is when you tell the model to "slow down and go one step at a time". You don't need to tell Copilot to do this because that is already part of the system prompt.

## The model matters more than the prompt

While these prompts will help you get better results from Copilot, in my experience the most effective thing you can do is pick the right model for the job. As of today, I see it like this...

**GPT-4o**: Specific tasks that don't require much "creativity". Use 4o when you know exactly what code you need and it's just faster if the LLM writes it.

**Claude**: Harder problems and solutions requiring creative thinking. This would be when you aren't sure how something should be implemented, it requires multiple changes in multiple files, etc. Claude is also exponentially better at helping with design tasks than GPT-4o seems to be in my experience

**o1**: Implementation plans, brainstorming and docs writing. My friend [Martin Woodward](https://bsky.app/profile/martin.social) finds that o1 is particularly good with tricky bugs and performance optimizations.

**Gemini**: Not widely available yet. I'm using this one more and watching it closely to see where it shines. I have high hopes.

## Living instructions

I hope these instructions are helpful for you. I consider them "living" and I hope to keep this list updated as I add more or change these as Copilot itself evolves, new models come along and our general knowledge of prompting improves.

