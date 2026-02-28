---
title: "How to switch themes in VS Code based on the time of day"
date: 2021-02-16 13:53:57 +0000
categories: posts
permalink: /posts/vscode/auto-switch-themes/
---

It's a good idea to switch between dark and light mode depending on what time of day it is. During the day when your body is more awake, it might make more sense to use a light theme where reading comprehension is better. At night, your eyes become more tired and bright screen light can be harder on your tired eyes.

Visual Studio Code doesn't do this out-of-the-box, but just like Steve Jobs once said, "There's an extension for that".

## Theme Switcher Extension

The [Theme Switcher Extension](https://marketplace.visualstudio.com/items?itemName=savioserra.theme-switcher&WT.mc_id=devcloud-8766-buhollan) for VS Code will let you define times of the day at which to apply a different theme.

![](/assets/theme-switcher-extension.jpg)

Open the `settings.json` file and add in the `themeswitcher.mappings` property which takes an array of time and theme combinations. The theme will take affect at the designated time (24 hour format). Here's mine...

```json
"themeswitcher.mappings": [
    {
        "time": "06:00",
        "theme": "GitHub Light"
    },
    {
        "time": "17:00",
        "theme": "GitHub Dark"
    }
],
```

You can have as many of these "change points" as you like. Change themes every hour if that makes you happy.

Last, make sure you set the "utcOffset" property in `settings.json` to account for your time zone. The extension doesn't do that autmoatically. I'm Central Standard Time which is UTC - 6.

```json
"themeswitcher.utcOffset": -6
```

You can find your UTC offset based on timezone [here](https://www.timeanddate.com/time/zones/). 

Now VS Code will switch themes automatically based on the time of day. It's not light theme vs dark theme, it's enjoying the best of both worlds.


