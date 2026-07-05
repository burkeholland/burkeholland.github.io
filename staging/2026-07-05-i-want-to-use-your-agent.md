---
layout: post
title: "I Want To Use Your Agent"
date: 2026-07-05 12:00:00 +0000
categories: posts
permalink: /posts/i-want-to-use-your-agent/
---

Rhys Sullivan recently wrote a piece called ["i don't want to use your agent"](https://x.com/RhysSullivan/status/2070989582850793947) where he argues that developers don't want to hand control to someone else's opaque AI. He's right about that. But I've been running an experiment this week where I'm trying to do everything with agents, and I've arrived at the exact opposite conclusion.

I definitely want to use your agent.

Or rather, I want my agent to use your agent.

What I don't want is your skill that was probably written by Claude, or your MCP server that just proxies API calls. I don't want to have to build an integration into your thing. I don't want to have to know anything about your API.

Because if my agent is going to have to use your product or service, I'm the one that's going to have to train it to be an expert. And I'm busy. I don't have time to wire up a bunch of integrations just so my agent can do what I'm already doing right now. I don't want to build a harness, I want my agent to triage my inbox.

We've got to make it easier for agents to be productive. That means we all need to be building the best possible agents for our own domain.

Think about it. Why should we all spend time training our agents to do the exact same thing when everyone could just focus on making the best possible agent for their product or service? Create the expert once and all of us can use it.

## Agents > API's

Ideally, all my agent should have to know how to do is authenticate. And hoepfully that's done with Oauth via MCP and handled by my harness.

I don't need an MCP server that is a wrapper for an API. That's just your API with extra steps. And I don't want a skill calling a CLI because I don't trust your skill. I'm sorry. I just don't. I don't know if you actually put some time into it or just one-shotted it with Claude and it very much matters which of those two things you did because skills created by agents are almost guaranteed not to work right or to break at some point.

But an MCP server that's backed by a real agent with domain expertise? One that actually understands your product and can figure things out on its own? That's what I want.

The best example I can think of today is Microsoft WorkIQ. Instead of you having to configure your agent with authorization and knowledge of the Microsoft Graph, you just ask WorkIQ. It's an agent that exposes itself via MCP. Your agent doesn't need to know anything about Microsoft's API. All you have to do is auth the MCP server and then your agent can ask WorkIQ for whatever emails, chats, meetings, or transcripts you might need. WorkIQ figures out the Graph calls. You don't.

That's the model. Not "here's my API as an MCP server." It's "here's my agent as an MCP server."

## HOWEVER

Nobody wants to give away free AI.

If I create an agent for my product or service, who is going to pay for that?

You aren't going to pay extra when you could just wire up your agent to the API yourself.

And if you do decide to stand up an agent anyone can interact with, you're probably going to use some super small and cheap model that may or may not follow any of the instructions I give it. I'd rather throw the biggest model I can afford at everything. Otherwise your agent is gonna be crap and I'm going to end up building the integration to your API for my agent anyway.

At the end of the day, the problem is still the price of compute.

The current answer is to pass the cost back down to you, the user, by having you build your own integration via a skill or MCP server.

But if agents are going to do real work for average users, this is not going to work. At all.

The average user is not going to download skills and configure MCP servers and go to developer portals to download access tokens and secrets and store them in .env files in their home directory.

This is the whole reason that heavy AI use is really restricted to just developers at the moment. And it's likely going to stay there until we figure this out.

## The price is too high

What we need more than anything is for calling an AI to be as cheap as calling an API. Right now, every agent interaction has a meter running. Every token costs money. That cost gets passed to someone, and usually it's the person least equipped to deal with it: the end user.

If intelligence becomes cheap enough to be unmetered, everything changes. Domain experts can build the definitive agent for their product once. They can expose it freely. Other agents can call it without anyone worrying about who's footing the bill. The whole ecosystem of agents talking to agents becomes viable because the marginal cost of one more conversation approaches zero. 

We're not there yet. But that's the future that actually works. Not a world where every developer hand-rolls their own janky integration to every service. A world where the people who know the product best build the agent, and the rest of us just use it.

## So what needs to happen

Three things. First, compute costs need to come down. We seem to be headed in the opposite direction as subsidies end, but OSS models are promising. Every 10x drop in inference cost unlocks a new tier of agent interactions that can happen without anyone thinking about the bill. Second, agent builders need to stop shipping MCP wrappers and start shipping actual intelligent agents that know their domain. Third, we need auth and discovery standards so agents can find and trust each other without a human wiring everything together.

We don't have all of this solved yet. But the direction is clear. Move the onus off the user. Build the expert once. Let the agents talk.
