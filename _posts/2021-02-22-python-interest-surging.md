---
layout: post
title: "Google trends shows Python interest surging"
date: 2021-02-22
categories: posts
permalink: /posts/python-interest-surging/
---

While looking at Google Trends the other day for ["visual studio code"](https://trends.google.com/trends/explore?q=visual%20studio%20code&geo=US), I noticed that one of the rising trends was "visual studio code format json". Today, it's gone, but still in the top related queries along with "how to format code".

This got me curious as to what it is that people search for the most along with "visual studio code" or "vs code" in the last 12 months.

## Top Related Searches

It varries slightly depending on whether you search for "visual studio code" or "vs code", but not nearly as much as you might think...

### "visual studio code"

1. visual studio vs visual studio code
2. vs code
3. vs code vs visual studio
4. download visual studio code
5. visual studio code python

### "vs code"

1. vs code vs visual studio
2. visual studio code vs visual studio
3. visual studio
4. visual studio code
5. python

In both cases, what struck me is that Python shows up in the top 5. What's even more interesting is that if you expand the time range to 2 years, Python drops off the list completely. So in the past 12 months, Python has gone from "not on the list" to "in the top 5". That's quite the movement.

### Why Python?

One of the reasons could be the overall meteoric rise of Python. In December, Stack Overflow reported that it was the [4th most popular technology](https://insights.stackoverflow.com/survey/2020#most-popular-technologies) on their site, beating out Java by 4 percentage points. This was [also true in 2019](https://insights.stackoverflow.com/survey/2019#technology), but only by a razor thin margin when compared to Java. In 2018, [it was number 7](https://insights.stackoverflow.com/survey/2018#technology) overall with Java enjoying a 7 point lead. 

Stack Overflow is only one measurement and certainly pulls only from the "Stack Overflow" demographic. The TIOBE index attempts to rate based on an aggregation of the "number of skilled engineers world-wide, courses and third party vendors." According to [TIOBE's February 2021 numbers](https://www.tiobe.com/tiobe-index/), Python is number 3, beaten only Java with the leader being C? Which, I was onboard until "C". That seems hard to believe.

So Python is popular, but why is _that_?

There are a lot of potential reasons. Certainly one is that Python is a popular language for students. 

This is because it's syntatically easier to write than it's C-based counterparts. It is also dynamic, which means that it doesn't require a compilation step. And possibly most important of all - it skirts around the painfully abstract "object-oriented" programming model. I spent far more **time** trying to understand classes and inheritance than I ever did using them.

There is also the rise in popularity of data science as a profession. Although I remain skeptical of this. I still don't know anyone who works as a "data scientist". I'm not saying the job doesn't exist - I know that it does. And a lot of other people must expect that it does too, because "Data scientist or machine learning specialist" is the [#2 on people "actively looking for a job"](https://insights.stackoverflow.com/survey/2020#work-whos-actively-looking-for-a-job) on the same Stack Overflow survey I referenced earlier. But it only occupies [8% of the total available roles](https://insights.stackoverflow.com/survey/2020#developer-roles). I'm just saying that perhaps the hype is a lot bigger than the demand.

## Python is big

All arguments on what people are doing with Python aside, it's certainly popular even by Google Trends standards - even when you *aren't* searching for it. That's a measurement that is quite hard to deny. So if you are looking to do Python with Visual Studio Code, here is a list of resources that I hope you find helpful...

* [Python Coding Pack](https://code.visualstudio.com/learntocode?WT.mc_id=devcloud-17278-buhollan) - A complete install of VS Code that also installs Python, the Python extension and configures your enviornment. Recommended for folks who just want to get up and running with a single install.

* [Python in VS Code Tutorial](https://code.visualstudio.com/docs/python/python-tutorial?WT.mc_id=devcloud-17278-buhollan) - Official VS Code docs on using Python in VS Code complete with "Hello World" tutorial.

* [Python for Beginners Video Series](https://channel9.msdn.com/Series/Intro-to-Python-Development?WT.mc_id=python-c9-niner&WT.mc_id=devcloud-17278-buhollan) - Don't know Python? No problem! This free video series starts from the beginning.

* [Python Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python&WT.mc_id=devcloud-17278-buhollann) - IntelliSense, linting, debugging, formatting AND support for Jupyter Notebooks

* [Jupyter Notebooks Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter&WT.mc_id=devcloud-17278-buhollan) - Support for Jupyter Notebooks. This extension is included when you install the Python extension so you should do that instead.

* [Use a Docker Container as a Development Enviornment with VS Code](https://docs.microsoft.com/learn/modules/use-docker-container-dev-env-vs-code/?WT.mc_id=devcloud-17278-buhollan) - How to spin up a Python dev env using a Docker container. All examples are in Python.