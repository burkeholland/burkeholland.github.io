---
layout: post
title: "We need practical AI workflows"
date: 2025-11-17 08:40:00 +0000
categories: posts
permalink: /posts/promptfiles-vs-instructions-vs-agents/
---

In VS Code, there are 3 main ways that you can guide AI to help you with software development tasks: **Prompt Files**, **Instructions**, and **Agents**. Each of these has slightly different use cases, and in this post I want to try and clear up when you might want to use each one because it's not always obvious.

## Understanding the agent system prompt

Before we get into what all of these are, it's important to first understand that the agent in Copilot is driven by a system prompt. Any instructions that you give the agent are appended to this system prompt. The system prompt is dynamic and can change depending on the model that you select, but generally speaking it looks something liks this:

```md
Core Identity and Global Rules:
    - A brief set of global rules that are always used regardless of the task, model or agent selected - i.e. "You are an expert AI programming assistant..."
General Instructions (dynamic based on model, agent, etc)
    - More generic instructions that may be tweaked based on the model selected - i.e. "NEVER print out a codeblock with file changes unless..."
Tool Use Instructions
    - High-level tool use guidelines - i.e. "Don't call the run_in_terminal tool multiple times in parallel..."
Output Format Instructions
    - Tells the agent how to format its output - like how to link to files in the workspace from the chat, etc.
**Custom Instructions**
    - The content of any custom instruction files.
**Custom Agent Instructions**
```

There's more details to it than that, but that's the general idea. This prompt gets passed as the system prompt to the model. 

Next, a user prompt is added that provides context about the user's current workspace...

```md
**Prompt Files**
    - The content of any prompt files the user has referenced in their prompt.
Environment Info:
    - Information about the OS, etc.
Workspace Info:
    - Sends all of the files and folder names in your workspace in a simple tree format.
```

Finally, your actual prompt is added to the conversation as a user message. If you were to type "Hello, World!", the user prompt that gets sent would look something like this:

```md
Context
    - Current Date/Time
    - List of open terminals if any
Editor Context
    - Any files that you have added to the chat
User Request
    - "Hello, World!"
```

A simple, "Hello, World!" to Claude Opus 4.5 will use approximately 12.8K tokens.

And now you understand the basic structure of the agent prompt in VS Code. Still with me? Great! Now let's look at what happens when you use custom instructions, prompt files, and agents.

## Custom Instructions

Custom Instructions are a way to pass information to the prompt on every single request.

You can have as many custom instruction files as you like, and they can either be global to every project, or they can be specific to a particular workspace.

To create a new instructions file, you can use the "Chat: New Instructions File". You are then prompted to put them either in the `.github` folder in your workspace, or in "User Data", which is the global location.

The most common use case for custom instructions is the `.github\copilot-instructions.md` file. This file typically contains important information about your project - "Big Picture" architecture, project specific conventions, etc. You can even have the agent generate this file for you by choosing "Chat: Generate Workspace Instructions File" from the Command Palette.

> Note that you can also use the AGENTS.md file name instead of `.github\copilot-instructions.md` if you prefer. The AGENTS.md file can be anywhere in your project`.

But you can have as many custom instructions files as you would like. For instance, I have an instructions file called ".github/instructions/memory.instructions.md" where I put things I want the AI to remember - things like "don't run unit tests automatically, let me do it" or "Remember that `useEffect` can only be used in client components in NextJS."

These files will get appended to the system prompt on every single request, and the **custom instructions file always gets appended last**. This means that if there are any conflicts between the `copilot-instructions.md` file and other instructions, it's likely that the custom instructions will take precedence.

So just to recap, if we have a `.github/copilot-instructions.md` file in our project and a `.github/instructions/memory.instructions.md` file, the system prompt will look something like this:

```md
Core Identity and Global Rules
General Instructions
Tool Use Instructions
Output Format Instructions
**memory.instructions.md contents**
**copilot-instructions.md contents**
```

> Custom instructions do allow you to conditionally include them based a glob pattern to match files in the context. For more info on Custom Instructions, see [here]().

## Prompt Files

Prompt files are a second way for you to pass instructions to the agent. However, unlike custom instructions, prompt files are only included in the prompt when you explicitly reference them in your user prompt. Prompt files can be local to your workspace or global - just like custom instructions.

Prompt files are added to the same **user prompt** where your chat message is added. 

The main differences between prompt files and instructions are...
1. You can only have one prompt file per chat request, but you can have multiple instructions files.
2. Prompt files allow you to specifically enable or disable tools in the frontmatter. 

For instance, I have a prompt file called "remember" that automatically writes things to the memory.instructions.md file. It can ONLY be used to read and write things to memory. So it only has the "read" and "edit" tools available. 

---
agent: agent
tools: ['read', 'edit']
---

The user is asking you to save something to your memory. 

Your "memory" is a special instruction file located in the root of the project at ".github/instructions/memory.instructions.md".

If this file does not exist, you'll need to create it with the appropriate frontmatter.

```markdown
---
applyTo: '**'
---
```
```

Then if I wanto the agent to remember that for the love of god, you can only use `useEffect` in client components in NextJS, I can just type this in the chat:

```
/remember for the love of god, you can only use `useEffect` in client components in NextJS.
```

The user prompt then looks something like this:

```md
**content of memory.prompt.md file**
Context
Editor Context
**User Request**
    - "Follow instructions in the memory.prompt.md (links to memory.prompt.md file instructions above) for the love of god, you can only use `useEffect` in client components in NextJS."
```

This is how I use prompt files and instructions files together to build up a memory for the agent as I go.

You can find a ton more prompt files and instructions files in the awesome-copilot repo. 

The last way that you have for passing instructions is with something called a "Custom Agent".

## Custom Agents

Custom Agents used to be called "Chat Modes". They are simply pre-configured sets of instructions that are tailored for specific tasks. These "Agents" will show up in the chat UI picker. 

When you use a custom agent, the instructions get appended to the system prompt AFTER the custom instructions. Like prompt files, custom agents also allow you to enable or disable specific tools in the frontmatter.

For instance, I have a custom agent called "LLM Coder". The whole job of this agent is to write code for LLM's, not for humans. So it has specific instructions about how to write code so that it's easier for LLM's to understand and easier for the agent to reason about as it goes. 

---
description: 'Describe what this custom agent does and when to use it.'
---

You are an AI-first software engineer. Assume all code will be written and maintained by LLMs, not humans. Optimize for model reasoning, regeneration, and debugging — not human aesthetics.

These coding principles are mandatory:

1. Structure
- Use a consistent, predictable project layout.
- Group code by feature/screen; keep shared utilities minimal.
- Create simple, obvious entry points.

2. Architecture
- Prefer flat, explicit code over abstractions or deep hierarchies.
- Avoid clever patterns, metaprogramming, and unnecessary indirection.
- Minimize coupling so files can be safely regenerated.

3. Functions and Modules
- Keep control flow linear and simple.
- Use small-to-medium functions; avoid deeply nested logic.
- Pass state explicitly; avoid globals.

4. Naming and Comments
- Use descriptive-but-simple names.
- Comment only to note invariants, assumptions, or external requirements.

5. Logging and Errors
- Emit detailed, structured logs at key boundaries.
- Make errors explicit and informative.

6. Regenerability
- Write code so any file/module can be rewritten from scratch without breaking the system.
- Prefer clear, declarative configuration (JSON/YAML/etc.).

7. Platform Use
- Use platform conventions directly and simply without over-abstracting.

8. Modifications
- When extending/refactoring, follow existing patterns.
- Prefer full-file rewrites over micro-edits unless told otherwise.

9. Quality
- Favor deterministic, testable behavior.
- Keep tests simple and focused on verifying observable behavior.

Your goal: produce code that is predictable, debuggable, and easy for future LLMs to rewrite or extend.
```

Custom Agents are very similar to prompt files with the major difference that you don't have to reference them explicitly in your prompt - they are automatically included when you select the agent from the picker. 

So this brings us to the actual meat of this post - when should you use each of these 3 methods for passing instructions to the agent?

## When to use each method

You can think of custom instructions, prompt files and custom agents as being different ways for you to assemble your own workflows for working with AI in VS Code. How you use them is up to you. There is no right or wrong way here and I don't think that their position in the prompt hierarchy necessarily implies any kind of importance.

That said, it helps to see how other people use these to compose their own workflows, so let me show you how I use them to do something that I like to call "Logical AI Programming".

