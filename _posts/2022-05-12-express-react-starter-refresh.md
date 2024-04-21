---
layout: post
title: "Running Express and React in the same project"
date: 2022-05-12
categories: posts
permalink: /posts/express-react-starter-refresh
---

All of us have, at some point, stood in front of a mirror looking into our own soul and asked the question that every JavaScript developer is destined to ask before they die - "How do you run Express and React in the same project"?

This week I revisited my answer to that existential nightmare in the form of a refresh to the [Express React Starter](https://github.com/burkeholland/express-react-starter). Because I feel a desperate need to get _some_ content out this week AND the original blog post on the subject is completely AFK, here's another run down of how I use Express to serve up React.

First - a disclaimer...

### Why run Express and React in the same project?

Well, there are a lot of reasons, but the most fundamental one is because **I want to**. And let me just say, it's way harder than it should be. My goodness - it's a website. All of this has gotten way out of hand, but so many people have already written that blog post and I certainly can't say "get off my lawn" better than they can.

The point is that I am acknowledging that it's way easier to run the React app in one project and the API in another and avoid this problem entirely.

But what if you had a single app instance where you wanted to host your app in your preferred cloud provider? You would have to pay for a second to host the API, and maybe you don't want to do that. Or maybe you just think everything is cleaner with a single project and not pointlessly running in multiple locations. And also, you did ASP.NET Webforms back in the day baby, back when all the logic for a web app was self-contained and pages were assembled on the server the way god intended - way before "JavaScript" was considered even a remotely good idea to do anything at all other than disable the back button because SOME MEN JUST WANT TO WATCH THE WORLD BURN.

![](https://i.kym-cdn.com/photos/images/newsfeed/000/505/362/3f4.gif)

### Express React Starter

Express React Starter (ERS - pronounced "ears", because I made it and therefore you have to pronounce it anyway I say) is a template, but really more of an example on how to go about setting this up. It's a static GitHub project and therefore can't possibly keep up with changes in create-react-app. Let's take a look at how I put it together so you can tell me why it's wrong.

I start with a fresh "create-react-app" scaffold.

`npx create-react-app@latest project-name`

Then I add in Express directly to this project into a folder called "server".

{% highlight bash %}
npx express-generator server
cd server && npm i
{% endhighlight %}

So now we have a project structure that looks like this...

```text
🗂 node_modules
🗂 public
🗂 server
🗂 src
📄 .gitignore
📄 package-lock.json
📄 package.json
📄 README.MD
```

### Configuring Express to serve as the API

What we want from Express in this situations is to serve up the website in production (in development the webpack dev server will do that) and to serve as the API. To do that, we need to tell Express to serve up anything it sees on the "api" route. Anything it doesn't recognize, just return the "index" page because React is handling all other routing. We also need to tweak the `express.static` path because the "index.html" file is going to be in a folder called "build" when we eventually run `npm run build`.

```javascript
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", indexRouter);
app.get("*", (req, res) => {
  res.sendFile("client/index.html", { root: global });
});
```

> We modify the express.static route as well because when we run the build, the index file will be in the "build" folder. Look - I told you this was way harder than it should be.

Now we can setup a sample route in `server/routes/index.js` and return some data from the API...

```javascript
/* GET /api/message */
router.get("/message", function (req, res, next) {
  res.json({ message: "Hello from the API!" });
});
```

That sets up Express to handle requests correctly. We just need to inform React of how to send any request to "/api" to the Express server. So the next step is like every other problem in America at the moment - getting these two things to talk to each other.

### Talking to Express from React

When you're in development, React is going to handle any and all URLs you try and call. So if you tried to go to `https://localhost:3000/not/here`, you just get sent back to "index.html". But we can instruct React to send any request that it doesn't recognize to our Express server which runs on port 3000. That is done via the "proxy" attribute in the "package.json" file..

```json
"proxy": "http://localhost:3000"
```

"But wait! Isn't the React app already running on port 3000?!?". YES. We'll get to that - one thing at a time please.

Let's modify the `src/App.js` file to do a fetch to our Express API for some data.

```javascript
import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessage();
  }, []);

  async function getMessage() {
    const result = await fetch("/api/message");
    const json = await result.json();

    setMessage(json);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo">
        <p>{message.message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

OK! We're ready to fire this monstrosity up. We need to modify our `start` command so that the React app starts on port 3001 since Express has already laid claim to 3000.

```json
"scripts": {
    "start": "PORT=3001 react-scripts start"
}
```

I used to try and run both the React Frontend AND the API in the same `start` command, but it's messy and I hate it. So instead, just run it in separate terminal tabs.

Start the backend...
`cd server && npm start`

Start the frontend...
`npm start`

In VS Code you can right-click / rename those terminal tabs so you can keep track of what's what...

![](/assets/terminal-tabs.png)

And you can find this monster running at http://localhost:3001.

![](/assets/hello-from-api.png)

That's the stuff! And just when you thought we were done, let's talk about going to production with this thing...

### Building for production

It's really not that bad. All we want to do here is build the frontend and drop the "build" in the "server" folder. A simple `mv` command _should_ have been enough, but since there is no cross-platform equivalent, I add a simple `copy.js` file to the project root.

```javascript
// This is a simple script to copy the "build" folder to the "server" directory
const { promises: fs } = require("fs");
const path = require("path");

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
}

async function main() {
  await copyDir("build", "server/build");
}

main();
```

Then modify the "build" command in the main "package.json" to call this "copy.js" file...

```json
"build": "react-scripts build && node copy.js",
```

Then run your build...

```bash
npm run build
```

The "server" folder now contains your entire built project. To run it...

```
cd server && npm start
```

If you were going to production, you would just deploy that server folder.

### Things I hate about this

There are so many, but just a few things I hate about this setup....

1. Two package.json files. It's wrong and nobody can change my mind on that.
1. Starting two processes in two separate tabs. I really wanted that "F5" feeling where you just press the green play button and everything magically works.
1. The "server" folder as the output feels wrong. Output folders should be called "dist". Maybe the "copy.js" file should copy everything to dist?

I can't solve all the world's problems. But I can offer you this humble Express React Starter. Check it out [on GitHub](https://github.com/burkeholland/express-react-starter).

❤️
