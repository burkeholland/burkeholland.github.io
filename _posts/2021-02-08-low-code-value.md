---
layout: post
title: "Using Azure Logic Apps to auto-print sales orders"
date: 2021-02-08
categories: posts
permalink: /posts/low-code-value/
---

No / Low Code tools (NoLow - I just coined that) have been the holy grail of software since I got into programming. I remain optimistic, but skeptical in regards to the idea that some day anyone will be able to build apps. 

Optimistic because we really need to get humans out of the business of writing code wherever we can. Less code means less bugs. Skeptical because in the 15 years I've been a developer, I've watched so many of these tools come and go. The problem isn't that we haven't made the right tools, it's that you still need to have significant level of technical knowledge about _how_ a problem can be solved. And that's not something you can abstract away with a nicer UI.

I think the strongest case for the success of NoLow at the moment has more to do with what it offers current developers than it's ability to turn non-coders into application developers. 

## A NoLow real world use case

My wife owns a small business. It's one of those yard sign businesses that have exploded in popularity during the pandemic. I was skeptical of the long-term viability of a business built on corrugated blown up letters stuck in your yard, but when she put up a sign for my birthday, it did make me feel special and I can understand why she's getting 5 and 6 orders a day at around 75 bucks a pop.

![Example yard sign in front of a house](/assets/low-code-value/yard-sign.JPEG)

I am defacto tech support for all the digital aspects of her business. Since it's a franchise, nearly everything she needs is provided by the company. And, if I might add, it's pretty good. She complains, but she has never used enterprise software before so her only frame of reference is her iPhone, on which everything kind of "just works".

From time to time, she has small automation needs. For instance, she gets orders emailed to her every day. She then has to print those orders out. So she made a simple request to have orders just automatically print out whenever they come in. 

I was halfway to building a Node application that auth'd to Gmail, parsed the body with an HTML parser and an npm package to send things to the printer before I realized that this is probably all solvable with low code tools. 

So I built an [Azure Logic App](https://docs.microsoft.com/azure/logic-apps/quickstart-create-first-logic-app-workflow?WT.mc_id=devcloud-15662-buhollan) that does this in - no joke - two steps. 

## Building the Logic App

First I had some prep work to do.  

I added a label to any incoming order email with an "Order" label. Gmail calls these "filters" by the way. The order format ALWAYS starts the same way and they always come from the same sender. Anybody could write this filter. 

![Gmail filter screen showing new filter](/assets/low-code-value/email-filter.jpg)


> Note: the easiest way to do this whole thing would be to forward the email once it comes in via the same filter in Gmail - cause you can do that. Unfortunately, this doesn't work. For some reason, the printer won't accept forwarded emails. I lost about an hour to that weirdness.

I started with a blank Logic App and added the Gmail Trigger to start. It has the ability to check for new mail, and you can even specify a label to filter on. 

![Logic App showing Gmail Trigger settings](/assets/low-code-value/gmail-trigger.jpg)


The next step is to add an action that sends any emails it found in step one to the printer. I've got an HP Envy 5640 that supports [HP ePrint](https://support.hp.com/us-en/document/c03721293) - "a cloud-based service that lets you print from anywhere...". Once you set it up, you get a super ugly email address that looks like `kslf11skjflk83@hpeprint.com`. But anything you send to that ugliness from a "trusted" sender will print. It works well.

![Logic App showing Gmail Trigger settings and Gmail send email action](/assets/low-code-value/full-logic-app.jpg)

> I put the printer email in a Logic App parameter so it's not part of the program itself. That's the coder in me. I can't help it.

This runs every 3 minutes and prints new orders when they come in.

And it is deceptively simple.

Consider what actually has to occur for this to work...

1. Authentication to Gmail on my behalf, implementing an OAuth flow and storing tokens for future requests.
1. Querying for any "new" emails with a particular label
1. Parsing the parts of the email and preserving the HTML of the body
1. Sending an email on my behalf

10 years ago we would have coded this from scratch and it would have taken a week - at least. And I would consider this "advanced" coding given the auth flow requirements. And think of the bugs, testing and maintenance down the line. 

## Could anyone do this?

So back to the point - could _anyone_ do this? It is pretty simple. Certainly a user with a moderate amount of technical knowledge could piece the Logic App together. But could they pull the _whole_ thing off by themselves?

I'm not so sure. There are a lot of things that I just glossed over where you could get seriously hung up. Think of what you have to _know_ to build this...

* You have to know that you need to query a collection of items (emails) based on a condition (label)
* You have to know that modern printers have this "email to printer" capability which requires you to know the printer's IP address which means...
* You have to know about IP addresses, that they are dynamic, that this will ultimately break your app which means...
* That you need to change the printer IP to static which means...
* You have to know how to log-in to your router and configure DHCP.

Coding is not just knowledge of a language. It is broad knowledge of platforms, and how systems communicate. 

Optimistic, but skeptical. 

For now, I think that NoLow apps might work for certain types of applications - a la "forms over data" like Microsoft Access. But the real "arrived" value might, at least today, seems to be enabling current developers to be more productive. It remains to be seen if developers will adopt these tools in lieu of a lucrative career inventing wheels.

