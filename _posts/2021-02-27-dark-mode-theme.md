---
layout: post
title: "How to use 'Dark Mode' in VS Code"
date: 2021-02-27
catogories: posts
permalink: /posts/vscode/dark-mode-theme/
---

After my post on [how to auto-switch your theme based on the time of day](http://localhost:1313/posts/vscode/auto-switch-themes/), a few readers pointed out that VS Code "does this automatically". In other words, you don't need the extension that I recommended to do this.

I had no idea! Is this true? Kind of...

While VS Code doesn't have built-in ability to change your theme based on the time of day, it **does** have the ability to change your theme based on whether or not you are using "Dark Mode" in your Operating System. This is done via the `workbench.prefferedLightTheme` and `workbench.preferredDarkColorTheme` settings. You must use these in conjunction with the `autoDetectColorScheme` setting in order for them to have any effect.

{% highlight json %}
"window.autoDetectColorScheme": true,
"workbench.preferredDarkColorTheme": "GitHub Dark",
"workbench.preferredLightColorTheme": "GitHub Light"
{% endhighlight %}

By the way, I think the [GitHub themes](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme&WT.mc_id=devcloud-18058-buhollan) are the most underrated VS Code themes out there. Both the Light and the Dark are clean, sharp and Burke approved. Highly [recommended](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme&WT.mc_id=devcloud-18058-buhollan). 

![](/assets/github-theme.png)

Now this doesn't really solve the issue I was trying to tackle in the previous blog post about switching themes based on time of day, but it _can_.

## Switch to Dark Mode based on time of day

You can switch your entire operating system to Dark Mode based on the time of day. Dark Mode at night and Light Mode during the day. Or vice-versa if you think [society is a platypus](https://www.youtube.com/watch?v=qXZM5bxoccc). 

### For macOS

If you're on a Mac, this is built-in as of Catalina. There is an "Auto" setting when you choose between Light and Dark mode. This will switch you to dark mode with the sun goes down, and back to light when it comes back up. Unfortunately, Apple will decide that for you because let's be honest - they know what's best for you. Stop trying to live your life your way. 

If you want to control the exact time when this happens, you can use the [NightOwl](https://nightowl.kramser.xyz/#) app.

### For Windows

This is not yet built-in to Windows, but you can either [setup a scheduled task to do it](https://www.howtogeek.com/356087/how-to-automatically-enable-windows-10s-dark-theme-at-night/), or consider installing the [Windows Auto Night Mode](https://github.com/Armin2208/Windows-Auto-Night-Mode) program. 

I opted for the scheduled task as I'm not big into installing unsigned .exe's - even though that one looks legit.

Now VS Code will automatically switch color themes based on the time of day, and you don't need any extensions to do it.

I've been using it for about a week now and...

## I'm going back to the extension

I just don't like Dark Mode. It's one thing to have a dark VS Code theme. It's quite another to have it applied to the entire OS. I have trouble reading web pages and discerning parts of the screen. I'll stick with switching the theme in VS Code and leave Windows alone.

I know we're all supposed to love Dark Mode these days, but I just can't get into it. But let this blog post stand as the record that I did try.