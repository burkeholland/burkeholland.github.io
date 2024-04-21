---
layout: post
title: "GSAP, Webpack and invalid tweens"
date: 2019-11-27
categories: posts
permalink: /posts/invalid-tween/
---

Before I forget, I wanted to document for posterity how I lost about 4 hours yesterday to gsap/webpack issue.

I was working on a Vue project (CLI) with some gsap powered animations that I did not write. Not having written them, I can confess that I have no idea what they are or what they do. Any time I see the word “Tween”, I get flashbacks to actual _Flash_ timelines and this very visceral feeling that I do not know, nor will I ever, know what I’m doing.

The application ran fine in development mode. But when I built the thing (`npm run build`) and deployed it, none of the animations worked. Because why would something ever work on your machine AND when you deploy it? That wouldn’t be software development at all. That would be cooking. Or carpentry. But the first rule of software development is that it only works for you. This is either because software is hard, or because god hates you.

Either way, here’s the error you googled for…

    Invalid visibility tween of visible Missing plugin? gsap.registerPlugin()

First off, is it just me or is this error message missing some punctuation? Should there be a period after “visible”? Also, “invalid visibility tween of visible”? That’s the most circular 5 words I have ever read. Even now I’m not quite sure what they are trying to say in this error. The last part is kind of helpful - `gsap.registerPlugin()`. OK, so it thinks I need to register a plugin to change the visibility of things. Except that there is no plugin in gsap to do that. Like I said, I have no idea what I’m doing, but if the line to animate the visibility looks like this..

    mounted() {
        TweenMax.set("#thisisfine", {
          visibility: "visible"
        });
    }

Where, exactly, is the visibility plugin? And isn’t that something that gsap should just do in it’s base library? If TweenMax can’t change the visibility of something without a plugin, what good is it for?

This one really stumped me. I noticed that not only visibility, but every single animation in the app was broken. All kinds of errors, all of them roughly the same…

    Invalid filter tween of none Missing plugin? gsap.registerPlugin()
    Invalid fill tween of hsl(+=0%, -=100%, +=0%) Missing plugin? gsap.registerPlugin()
    Invalid y tween of -28 Missing plugin? gsap.registerPlugin()
    Invalid rotation tween of 10 Missing plugin? gsap.registerPlugin()
    Invalid transformOrigin tween of 50% 50% Missing plugin? gsap.registerPlugin()

Again, all of this works in development.

I did a lot of Googling on this issue and read a lot of forum posts I didn’t understand. What’s relatively clear here is that somehow, in a production build, Webpack is not including all of the necessary parts of gsap to make this work. It includes them in the development bundle, but not the production one.

I eventually found [this forum post](https://greensock.com/forums/topic/21298-premium-plugins-vue-npm-run-build/) on the gsap forums about Webpack shaking gsap plugins out during the tree-shaking part of the build process. This happens if you aren’t referencing the plugins anywhere in your code. The suggested fix is to explicitly include the plugin in your code so that Webpack knows that you are in fact going to use it.

    import MorphSVGPlugin from "gsap/src/uncompressed/plugins/MorphSVGPlugin";

    // You need to reference the plugin somewhere in your code
    const plugins = [MorphSVGPlugin];

But as we already saw, I don’t have that problem. The code I’m working with is importing `TweenMax` and using `TweenMax`. WebPack should be including that. If we look a the import for gsap, you can see that VS Code does see a “visibility” property on the gsap import.

![visibility property on gsap object in VS Code](/assets/vs-code-gsap.png)

On a hunch, I imported `visibility` and then included it as per the forum post.

    import { TimelineMax, TweenMax, Circ, visibility } from "gsap";
    const plugins = [visibility];

And, SUCCESS! But not just for the visibility animation, for ALL of them. All of the animations now work.

I’m not sure why this is. It’s like whatever code allows gsap to animate visibility allows it to do everything else. So including that one property includes what we actually want, which is a functioning gsap.

In any event, hopefully this post is a quick Google search away and you didn’t have to spend 4 hours on it like I did.