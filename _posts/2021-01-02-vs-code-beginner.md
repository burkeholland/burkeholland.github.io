---
layout: post
title:  "VS Code for the complete beginner"
date:   2021-01-02 06:00:00 +0000
categories: posts
published: false
---

In this post, I want to help you get started with Visual Studio Code (also called VS Code) if you are a complete beginner. No skill is required here. You don't even have to know how to code. 
## Installing

VS Code is a tool that helps you write, run and debug your code. It's kind of like Google Docs, only instead of writing a report or making a flyer for your Justin Bieber cover band, you build applications. VS Code supports every programming language, and can be installed on [Windows](https://code.visualstudio.com/download), [Mac](https://code.visualstudio.com/download), [Linux](https://code.visualstudio.com/download) or even a [Raspberry Pi](https://code.visualstudio.com/docs/setup/raspberry-pi-os).

VS Code is free and there are no in-app purchases or other things you'll be tricked into buying. It's just free. 

During the installation, you can just click next on all the screens until the button says "Finish". Don't worry about changing any of the options.
## Opening VS Code for the first time

OK, now VS Code is installed, but where the heck is it?

If you're on Windows, hit the Windows Key (⊞) and type "code". 

![VS Code in Windows Menu](/assets/found-it-windows.jpg)

If you're on a Mac, press Command (⌘) and while you're holding that key down, press the spacebar. Then type "code". 

![VS Code in Mac Spotlight Menu]()

### The Welcome Screen

The first time you open VS Code, you'll see something called the "welcome" screen.

![](/assets/first-run.jpg)

There is a lot on this screen. Lots of words. Lots of things you may have never heard of like, "Atom", "Vim" or "GitHub". That's ok. You don't need to know what any of this stuff is to use VS Code. Just pretend it's not there.

### Create a new file

In order to write code, you're going to need a file to put it in. If you look closely on the "Welcome" screen, there is a "New file" link you can click. You can also choose the "New file" option from the "File" menu which is right next to the VS Code icon in the upper left-hand corner. 

![](/assets/new-file.jpg)

If you want to be super fancy, you can do it by pressing the Command (Mac) / Control (Windows) key and then while you're holding that key down, press the N key. This is a special combination of keys called a "keyboard shortcut". 

You'll get a new tab that says "Untitled-1". That's your new file. The welcome screen is still there in the tab next to it. You can think of these like browser tabs. You can have as many open as you like. 

![](/assets/new-tab.jpg)

Now that you have a file, you can write some code.

### Writing code

Start by adding some code to this file. For this article, we'll use JavaScript. But if you know Java or Python, you can write that if you like. Let's do something relatively simply like just printing out "Hello World". 

```javascript
console.log("Hello, World!")
```

> Side note: Why is every tutorial you see called "Hello World"? It's because printing something out to the screen is one of the simplest things you can do in programming. It actually comes from a 1974 internal memo at Bell Labs. It then appeared in 1978 one of the earliest programming books. It's 42 years later and we're still doing it.

You'll notice that your text just looks like...text. My sample is highlighted. Yours is not. 

![](/assets/no-highlighting.jpg)

This is because VS Code does not know what programming language you are using. There are [over 700 programming languages](https://en.wikipedia.org/wiki/List_of_programming_languages). 😲. And many of them look a lot alike. You need to tell VS Code that this is a "JavaScript" file. 

In the bottom bar (also called the "Status Bar"), you'll see that it says "Plain Text". If you click on this, you can change it to "JavaScript". 

![](/assets/select-language.jpg)

Now your code has colors. This is called "syntax highlighting". As you write more and more code, the syntax highlighting will make it easier to read. Otherwise it will look like a big block of text and your brain won't like that very much. Syntax highlighting is a key feature of code editors.

## Save your file

The file that you've created doesn't actually exist yet anywhere besides in VS Code. In order to run code, you have to first save the file to your computer. This is something that you'll do a lot. It's best to learn the keyboard shortcut for this, which is (Windows) Ctrl + S / (Mac) ⌘ + S. 

You'll need to find a folder where you want to save the file. Since most applications have many files in them, it's best to create a folder where all your code from a project will go. Every project gets its own folder. I put all my project folders in a main folder called "dev" which I created on my C drive. But you can put your projects anywhere you like.

![](/assets/save-file.jpg)

Notice that the file name changes and it now has a ".js" extension. This is another way that you can tell VS Code what programming language a file uses - the file extension.

![](/assets/file-extension.jpg)

## Open the project folder

Normally you work on a project, not one file. As we just saw, projects are just folders with project files in them. 

Click on the "Explorer" icon on the far left side. This will open something called the "Sidebar". This is bar that runs down the left side is called the "Activity Bar". Click on the "Open Folder" button.

![](/assets/sidebar.jpg)

Select the folder where you just saved your "main.js" file. I put mine in "C:\dev\vs-code-beginner\"

![](/assets/select-folder.jpg)

This will open the folder in VS Code, and you'll see your "main" file in the Sidebar. You can **right-click** in the sidebar to create more files. You can also create folders and put files inside those folders. Files and folders are how projects are structured.

![](/assets/sidebar-action.gif)

OK! You've got code, you've got a project folder. It's time to run that code.

## Running code

Believe it or not, your computer doesn't know how to run JavaScript files. In fact, if you're on a PC, it doesn't know how to run Python, Java, or pretty much any other language you can think of. macOS ships with support for Python built in, but none of the others. 

I know that sounds crazy because there are applications running all over the place. You're using one right now (a web browser) to read this blog post.

To run applications on your computer, you need to install something that can read your code files. For JavaScript, that's a program called "[Node.js](https://nodejs.org/en/download/)". Once you install "Node.js", your computer will know how to run JavaScript files. These programs are called "runtimes".

This post assumes that you already have Node, Python, Java or some runtime installed on your computer.

To execute the "main.js" code file, you need to use the built-in terminal in VS Code. The terminal can be opened from the [VS Code Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#:~:text=Command%20Palette%23&text=The%20most%20important%20key%20combination,provides%20access%20to%20many%20commands.)

### The Command Palette

Press F1 to open the VS Code Command Palette. This is a box that contains virtually everything that VS Code can do. You can use this box to create files, folders, change the language of a file - everything that we've done so far can be found in this box. Just search for what you want. In our case, search for "terminal". Select "Create JavaScript debug terminal".

![](/assets/create-terminal.jpg)

The terminal appears at the bottom of VS Code. Your terminal may look different than mine depending on whether you are on Windows or Mac, and whether or not you've customized your terminal like I have.

![](/assets/terminal.jpg)