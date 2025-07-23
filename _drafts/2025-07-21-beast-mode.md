---
layout: post
title: "How I use Beast Mode in VS Code"
date: 2025-07-21 07:41:00 +0000
categories: posts
permalink: /posts/beast-mode/
---

[Beast Mode](https://gist.github.com/burkeholland/88af0249c4b6aff3820bf37898c8bacf) is a custom chat mode for VS Code that is designed to leverage the strengths (and weaknesses) of the GPT 4.1 model to make it _actually_ useful for agentic coding scenarios.

## The Problem(s) with 4.1

It's hard to name just one, but if we had to enumerate 4.1's shortcomings here we could sum them up as...

1. Lack of agency
2. Lack of reasoning / thinking
3. Obsessive tool calling

This results in a rather frustrating experience in VS Code for GPT-4.1. The model will often tell you exactly what needs to be done and then not do any of it. Or say, "Next, I'm going to do X and Y and Z..." and give you a nice bulleted list and then just not do any of it.

When it does finally work after 5 "please do it" prompts, it's apt to be quite wreckless. It moves quickly - which is great - the speed is impressive. But it doesn't think before it acts. Which means it makes a lot of really dumb mistakes - like trying to use `useEffect` in a server-side component or using `node-fetch` when it knows good and well that we're working with Node ~20 where `fetch` is built in.

Finally, because it was designed by OpenAI with tool calling in mind, it gets into a tool calling loop that it cannot get itself out of. It will frequently read the same files and folders over and over again with zero communication to the user on why its doing what its doing. 

Beast Mode tries to fix these issues by addressing these particular shortcomings.

## A peak inside Beast Mode

Beast Mode is built on OpenAI's 4.1 agent prompt suggestion from the [OpenAI 4.1 prompting guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide).

In the head of the prompt you'll find instructions - mostly from OpenAI - to try and increase the agency of the model. Here are some examples...

```md
You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user.
```

```md
You MUST iterate and keep going until the problem is solved.

You have everything you need to resolve this problem. I want you to fully solve this autonomously before coming back to me.
```

```md
You MUST keep working until the problem is completely solved...
```

```md
You are a highly capable and autonomous agent, and you can definitely solve this problem without needing to ask the user for further input.
```

This "keep working" sentiment appears over and over again. This is the first lesson with 4.1, which is that if you repeat yourself, the model is more likely to "remember" these instructions - or maybe we could say "prioritize" them. It simply thinks they are more important because you said it a bunch of times. You have to be very careful with both repition, as well as bolding or saying "IMPORTANT" with 4.1 as those instructions can override the importance of previous instructions. It seems to have trouble with multiple things being of high importance and will forget entirely previous important instructions.

Next comes an opinionated workflow for the agent. Again, this is in OpenAI's cookbook, but altered by me for an opinionated workflow. The important bit here is that the steps are numbered. GPT 4.1 likes it when you tell it exactly what steps to follow, so we start with a high-level workflow. 

This is where I try to get 4.1 to work like I do...

```md
1. Fetch any URL's provided by the user using the `fetch_webpage` tool.
2. Understand the problem deeply. Carefully read the issue and think critically about what is required. Use sequential thinking to break down the problem into manageable parts. Consider the following:
   - What is the expected behavior?
   - What are the edge cases?
   - What are the potential pitfalls?
   - How does this fit into the larger context of the codebase?
   - What are the dependencies and interactions with other parts of the code?
3. Investigate the codebase. Explore relevant files, search for key functions, and gather context.
4. Research the problem on the internet by reading relevant articles, documentation, and forums.
5. Develop a clear, step-by-step plan. Break down the fix into manageable, incremental steps. Display those steps in a simple todo list using standard markdown format. Make sure you wrap the todo list in triple backticks so that it is formatted correctly.
6. Implement the fix incrementally. Make small, testable code changes.
7. Debug as needed. Use debugging techniques to isolate and resolve issues.
8. Test frequently. Run tests after each change to verify correctness.
9. Iterate until the root cause is fixed and all tests pass.
10. Reflect and validate comprehensively. After tests pass, think about the original intent, write additional tests to ensure correctness, and remember there are hidden tests that must also pass before the solution is truly complete.
```

This is just how I work. I first try to understand the problem by looking at the code. I can't understand how to fix it unless I know how the code works. Then I usually will read docs or google something - I can't even remember how to properly link a stylesheet half the time. Then I get to work.  With the agent we are a little more prescriptive in terms of telling it to make small changes, test, check for errors. We also tell it to use a todo list to track its progress.

## AI's and todo lists

The todo list has become quite popular in a lot of agentic code editors such as Claude Code and Cursor. I think that Claude Code was the first place that I saw it.

I don't know if the todo list actually makes GPT 4.1 any smarter, but it sure gives the appearance of it. I feel like the todo list is as much for the user as it is for the LLM, but it sure is satisfying to watch GPT 4.1 check items off as it goes. 

I use Markdown as the format for the todo list as the LLM seems to struggle with other formats. I tried emoji lists and it just couldn't seem to get the format right - frequently putting all the items on one line or just re-rendering a completely todo list every single time it rendered it in the chat.

```md
Use the following format to create a todo list:
- [ ] Step 1: Description of the first step
- [ ] Step 2: Description of the second step
- [ ] Step 3: Description of the third step

Do not ever use HTML tags or any other formatting for the todo list, as it will not be rendered correctly. Always use the markdown format shown above.
```

The other item of note in the prompt is the heavy emphasis on using Google.

## Google everything

I go out of my way to force Googling things as part of the workflow for the LLM. This seems like a no-brainer to me. These LLM's are out of date - always. And they neither know that or are even aware of their need to check to see if something has been updated. I don't know why all tools don't make extensive use of internet search as part of the workflow of the agent.

In any event, this added "Googling" capability makes the mode really good at doing other things - like researching something before you try and implement it. Or just doing research that has nothing to do with code at all. 

So that's a peak inside of Beast Mode - let's now take a look at how I'm using it in my workflows today.

## How I use Beast Mode

I use VS Code for pretty much everything AI. When you go to Chat GPT to do something, I stay in VS Code and try to get the agent to do it. So I use it for much more than coding, but let's start with coding since that's the most obvious use of VS Code.

### Coding with Beast Mode

Beast Mode exists to try and save you from premium Claude requests in VS Code. If you are a pro user have 300 of those. So each one is precious. 

Of course, your workflow will depend heavily on what type of project you are working on. But let's take a greenfield project here just so we have an example to work from.

I do mostly web dev so I generally start with a shadcn/ui / Nextjs project. I don't make AI generate this. Partially because I don't trust it to, but also because scaffolding is a solved problem.

```bash
pnpm dlx shadcn@latest init
```

I choose this because both Next and shadcn are quite opinionated. And LLM's _really_ like strong opinions. The more context you provide the less hallucination you will get - and opinions are really just context.

I use supabase for all things backend. This is because Supabase is _really_ good. They have fairly good docs and most importantly, they have an [MCP Server](https://supabase.com/docs/guides/getting-started/mcp) that allows the agent to work directly with it to gather context and even stand up or knock down resources.

I usually setup the Supabase project manually and then copy the project URL and anon keys into a `.env.local` file.

Now we're ready to use AI. 

Before I write any code I will add my docs instructions file. The purpose of these instructions is to get the agent to rely on [Context7](https://context7.com/) to read documentation. Context7 provides documentation for popular projects like NextJS and shadcn in markdown format - and they have an MCP Server. 

So I'll have a .github/instructions/docs.instructions.md file. 

```md
---
applyTo: '**'
---

You are an advanced language model agent specializing in UI development using shadcn/ui / nextjs. To ensure your work is always accurate, robust, and up-to-date, follow these instructions rigorously for every task:

## 1. Documentation-Driven Workflow

- **Always use the latest shadcn/ui documentation and guides.**
- For every UI-related request, begin by searching for the most current shadcn/ui documentation, guides, and examples.
- Use the following tools to fetch and search documentation:
  - `#mcp_context7_get-library-docs` for the latest shadcn/ui library docs.
  - `#mcp_supabase_search_docs` for guides, references, and examples.

## 2. Recursive Research

- For each documentation page or guide you fetch, **recursively follow and analyze all relevant links** within the content.
- Continue this process until you have gathered all authoritative and up-to-date information needed for the task.
- Never rely solely on prior knowledge or training data; always verify with the latest sources.

## 3. Synthesis and Verification

- **Summarize and synthesize** the findings from all sources before making any recommendations or code changes.
- Only proceed with UI implementation after confirming your approach with the latest, authoritative documentation.

## 4. Robust UI Implementation

- Generate code and recommendations that strictly follow the latest best practices and patterns.
- If you encounter multiple approaches, prefer the one most recently documented or recommended by the official sources.
- For edge cases or advanced usage, always check for additional documentation or community guides.

## 5. Continuous Improvement

- After implementing a change, re-verify with the documentation to ensure no updates have been missed.
- If new documentation or patterns are discovered, update your recommendations and code accordingly.

**Example Workflow:**

1. Receive a request.
2. Search for the latest documentation and guides using the specified tools.
3. Recursively search the docs for all required context.
4. Implement the change, strictly following the latest best practices.
5. Re-verify with documentation, update as needed, and communicate findings clearly.

---

**Failure to follow this process will result in incomplete, inaccurate, or outdated UI implementations.**
```

You can create these instructions files in VS Code by choosing "New Instructions File" from the Command Palette. These instructions files get passed with every request.

I also create one of these for NextJS - so that the LLM doesn't name the components in some strange case or put them in a "ui" folder or do other goofy things that it likes to do...

````md
---
applyTo: '**'
---

# Next.js Best Practices for LLMs (2025)

_Last updated: July 2025_

This document summarizes the latest, authoritative best practices for building, structuring, and maintaining Next.js applications. It is intended for use by LLMs and developers to ensure code quality, maintainability, and scalability.

---

## 1. Project Structure & Organization

- **Use the `app/` directory** (App Router) for all new projects. Prefer it over the legacy `pages/` directory.
- **Top-level folders:**
  - `app/` — Routing, layouts, pages, and route handlers
  - `public/` — Static assets (images, fonts, etc.)
  - `lib/` — Shared utilities, API clients, and logic
  - `components/` — Reusable UI components
  - `contexts/` — React context providers
  - `styles/` — Global and modular stylesheets
  - `hooks/` — Custom React hooks
  - `types/` — TypeScript type definitions
- **Colocation:** Place files (components, styles, tests) near where they are used, but avoid deeply nested structures.
- **Route Groups:** Use parentheses (e.g., `(admin)`) to group routes without affecting the URL path.
- **Private Folders:** Prefix with `_` (e.g., `_internal`) to opt out of routing and signal implementation details.

- **Feature Folders:** For large apps, group by feature (e.g., `app/dashboard/`, `app/auth/`).
- **Use `src/`** (optional): Place all source code in `src/` to separate from config files.

## 2.1. Server and Client Component Integration (App Router)

**Never use `next/dynamic` with `{ ssr: false }` inside a Server Component.** This is not supported and will cause a build/runtime error.

**Correct Approach:**
- If you need to use a Client Component (e.g., a component that uses hooks, browser APIs, or client-only libraries) inside a Server Component, you must:
  1. Move all client-only logic/UI into a dedicated Client Component (with `'use client'` at the top).
  2. Import and use that Client Component directly in the Server Component (no need for `next/dynamic`).
  3. If you need to compose multiple client-only elements (e.g., a navbar with a profile dropdown), create a single Client Component that contains all of them.

**Example:**

```tsx
// Server Component
import DashboardNavbar from '@/components/DashboardNavbar';

export default async function DashboardPage() {
  // ...server logic...
  return (
    <>
      <DashboardNavbar /> {/* This is a Client Component */}
      {/* ...rest of server-rendered page... */}
    </>
  );
}
```

**Why:**
- Server Components cannot use client-only features or dynamic imports with SSR disabled.
- Client Components can be rendered inside Server Components, but not the other way around.

**Summary:**
Always move client-only UI into a Client Component and import it directly in your Server Component. Never use `next/dynamic` with `{ ssr: false }` in a Server Component.

---

## 2. Component Best Practices

- **Component Types:**
  - **Server Components** (default): For data fetching, heavy logic, and non-interactive UI.
  - **Client Components:** Add `'use client'` at the top. Use for interactivity, state, or browser APIs.
- **When to Create a Component:**
  - If a UI pattern is reused more than once.
  - If a section of a page is complex or self-contained.
  - If it improves readability or testability.
- **Naming Conventions:**
  - Use `PascalCase` for component files and exports (e.g., `UserCard.tsx`).
  - Use `camelCase` for hooks (e.g., `useUser.ts`).
  - Use `snake_case` or `kebab-case` for static assets (e.g., `logo_dark.svg`).
  - Name context providers as `XyzProvider` (e.g., `ThemeProvider`).
- **File Naming:**
  - Match the component name to the file name.
  - For single-export files, default export the component.
  - For multiple related components, use an `index.ts` barrel file.
- **Component Location:**
  - Place shared components in `components/`.
  - Place route-specific components inside the relevant route folder.
- **Props:**
  - Use TypeScript interfaces for props.
  - Prefer explicit prop types and default values.
- **Testing:**
  - Co-locate tests with components (e.g., `UserCard.test.tsx`).

## 3. Naming Conventions (General)

- **Folders:** `kebab-case` (e.g., `user-profile/`)
- **Files:** `PascalCase` for components, `camelCase` for utilities/hooks, `kebab-case` for static assets
- **Variables/Functions:** `camelCase`
- **Types/Interfaces:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

## 4. API Routes (Route Handlers)

- **Prefer API Routes over Edge Functions** unless you need ultra-low latency or geographic distribution.
- **Location:** Place API routes in `app/api/` (e.g., `app/api/users/route.ts`).
- **HTTP Methods:** Export async functions named after HTTP verbs (`GET`, `POST`, etc.).
- **Request/Response:** Use the Web `Request` and `Response` APIs. Use `NextRequest`/`NextResponse` for advanced features.
- **Dynamic Segments:** Use `[param]` for dynamic API routes (e.g., `app/api/users/[id]/route.ts`).
- **Validation:** Always validate and sanitize input. Use libraries like `zod` or `yup`.
- **Error Handling:** Return appropriate HTTP status codes and error messages.
- **Authentication:** Protect sensitive routes using middleware or server-side session checks.

## 5. General Best Practices

- **TypeScript:** Use TypeScript for all code. Enable `strict` mode in `tsconfig.json`.
- **ESLint & Prettier:** Enforce code style and linting. Use the official Next.js ESLint config.
- **Environment Variables:** Store secrets in `.env.local`. Never commit secrets to version control.
- **Testing:** Use Jest, React Testing Library, or Playwright. Write tests for all critical logic and components.
- **Accessibility:** Use semantic HTML and ARIA attributes. Test with screen readers.
- **Performance:**
  - Use built-in Image and Font optimization.
  - Use Suspense and loading states for async data.
  - Avoid large client bundles; keep most logic in Server Components.
- **Security:**
  - Sanitize all user input.
  - Use HTTPS in production.
  - Set secure HTTP headers.
- **Documentation:**
  - Write clear README and code comments.
  - Document public APIs and components.

# Avoid Unnecessary Example Files
Do not create example/demo files (like ModalExample.tsx) in the main codebase unless the user specifically requests a live example, Storybook story, or explicit documentation component. Keep the repository clean and production-focused by default.
````

> Note that you'll need to update the front matter of the Beast Mode prompt to include the context7 tools.



Now we're ready to do some vibe coding! Or whatever I'm about to show you I do is called.

## Working incrementally

The key to working with AI is to work incrementally. Stop trying to one-shot things. Yes - you can theoretically do it if you write a specification that has exactly the right detail. But the chances of you forgetting some important detail are almost 100% and also, who on earth wants to write detailed specs all day? Call me lazy, but that sounds like a nightmare and not at all fun. I've just had no luck with this, so I don't do it. 

What I do instead is do one thing at a time.

So I'll start with something simple - like a login form...

```md
Add a login form to this app using supabase for auth. Support username and password and google.
```

It's a lazy prompt and that's fine. Beast Mode and GPT 4.1 are completely capable of building this login form. It will be ugly - but it doesn't matter right now - it just needs to work.

And then we just keep moving. 

```md
Create a dashboard page and route and make sure it is protected by the login.
```

Now you will get to a point in the process where you actually do need to turn your lazy prompt into a plan. A good example of this is 