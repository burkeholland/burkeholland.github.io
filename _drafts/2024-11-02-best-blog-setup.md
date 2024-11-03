---
layout: post
title: "The best possible blog host is...GitHub Pages?"
date: 2024-11-02 10:30:17 +0000
categories: posts
permalink: /posts/gh-pages-best-blog/
---

I've had a lot of blogs over the years. I think I started on Wordpress (as one does) and then moved to Tumblr (yes, that happened) and then to my own site, then to Medium when that was the thing to do and now I'm coming to  you from GitHub Pages. Having seen a lot of...stuff...I can tell you that GitHub Pages is the best blogging platform you can get. Let me make my case.

Markdown is _probably_ the best way to compose prose. We don't need editors to bold and italicize things for us. Remember Windows Live Writer?

![Windows Live Writer screenshot](../assets/windows-live-writer.png)

We just need something to convert our Markdown to HTML. Static site generators are great at this. There's many to choose from, but this blog runs on Jekyll, and the whole site runs on GitHub Pages. After running this for some time, I've decided that this very under-engineered approach is by far the best when it comes to a blog. There are a few reasons for this.

### Ease of Deployment

GitHub really likes Jekyll. Like, a lot. In fact, they make it so easy to deploy a Jekyll site to GitHub Pages that it's almost a no-brainer. There's no action to configure. There's no build step to worry about. You just [add their gem](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll) and then just check your code in. There's always that question of which branch to build from and where the source code sites, but I just put the source in gh-pages and a README in main that says "Source is in gh-pages". So I don't forget. Because I will.

The only downside to setting up Jekyll is having to fool with Ruby, but I get around all of that by using a [dev container](https://code.visualstudio.com/docs/devcontainers/create-dev-container)  in VS Code. There is one just for Jekyll that is preconfigured for you. Just choose "Add dev container congiguration files" in VS Code from the Command Palette and choose "Jekyll". Done.

### Ease Of Composition

Of course, you don't want to have to build and deploy your site everytime you want to write a blog post. But you don't have to. GitHub offers an in browser editing experience on any repo by pressing the "." key. This opens VS Code in the browser with your repo as the backing "file system". Also called a "virtual file system" in VS Code. 

![Writing this blog in VS Code](../assets/blog-in-vscode.png)

You don't get the same control.

This means that I can compose a blog post in VS Code using Markdown with full preview all while in my browser. No code checkout required. Which means my iPad is perfectly (almost) suited for writing blog posts.

The problem with blogs is that they are too simple. To fix that, we have come up with some wildly over engineered solutions. The trickest part of any blog is getting to a place where you can preview while you're writing and not have to write HTML. Remember Windows Live Writer? 



Wordpress also had an editor. This makes composition of content easier, but you end up with some pretty nasty HTML after you've tried to center align things and do various layout magic with a visual interface.

