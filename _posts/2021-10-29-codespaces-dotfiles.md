---
layout: post
title: "How to add your dotfiles to GitHub Codespaces"
date: 2021-10-29
categories: posts
permalink: /posts/codespaces-dotfiles
---

One of the first things you are gonna realize after you get started with Codespaces, is that you desperately want your own custom environment setup that you enjoy locally to somehow magically be in Codespaces as well. You can do that using a "dotfiles" repo, and in this post, we're going to look at how to setup a dotfiles repo, and what quirks you need to be aware of to use it with Codespaces.

## What's a dotfile?

A "dotfile" is any configuration files that start with a dot. You can view your dotfiles by going to your home directory on your machine (`cd ~`) and running `ls -al`. For instance, the ".zshrc" file allows you to tweak how your shell (terminal) looks and works. Behold, the glory of my terminal in Codespaces - powered by my .zshrc file...

![codespaces terminal running zsh](/assets/terminal-glory.jpg)
 
For this post, we're only going to focus on the ".zshrc" file as that's where all of my terminal configuration can be found. But this post isn't about oh-my-zsh and how it's the best shell and that's not up for debate. This process will work for any dotfiles.

People like things that come in steps, so here you go...

## Step 1. Setup a dotfiles GitHub repo

It's common practice to put your dotfiles in a GitHub repo. There are plenty of blog posts that will tell you all about how to setup the repo, create symlinks, keep everything in sync with cron jobs or something - I don't know. I didn't actually read them. It's the internet and I'm too busy to do my own research. 

All you need to know for now is that you need to create a GitHub repo called "dotfiles". Convention over configuration and all of that, but no surprise there because GitHub is a Rails app after all. 

So create the "dotfiles" repo on GitHub and then on to step 2.

## Step 2. Add your dotfiles

Copy just the ".zshrc" file into your "dotfiles" project. That's all there is for step 2. A paragraph has at last 3 sentences.

## Step 3. Update your .zshrc file

Your ".zshrc" file needs a little updating. You need to find anywhere that references your home path directly and replace it with the HOME environment variable. This is because Codespaces don't run under your account so the directory structure is doing to be a bit different. 

**BEFORE**

```bash
# Path to your oh-my-zsh installation.
export ZSH="/home/burkeholland/.oh-my-zsh"
```

**AFTER**

```bash
# Path to your oh-my-zsh installation.
export ZSH="${HOME}/.oh-my-zsh"
```

Now you can add whatever you like - themes, plugins, stuff you copied and pasted from StackOverflow and you don't remember what it does. You know - all the stuff you normally do in your ".zshrc" file. To keep it simple, I'm just going to do a theme and plugins, but we'll throw a wrench in here and use plugins that need to be installed separately and then cover how to do that. So here's our completed sample ".zshrc" file. Don't forget to source `oh-my-zsh.sh`!

```bash
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="cloud"

# zsh-nvm and zsh-autosuggestions must be installed separately
plugins=(git zsh-nvm zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh
```

### Step 4. Add a shell script to load your dotfiles

Now if our ".zshrc" file wasn't trying to load plugins that don't exist, we could just use it as is. As long as it's in the root of the repo, Codespaces will copy this (and any other dotfile) to the $HOME directory in your Codespace. Which is where you want them. But we threw some chaos into the situation by including plugins that need to be installed separately, and I did that so we can examine what happens when you need to run a script to properly "install" your dotfiles - which is frequently the case because you'll end up trying to do all manner of crazy things to your Codespace and by God, I want you to realize all your hopes and dreams.

You can add a script file to your dotfiles repo that will be executed when the dotfiles are loaded into your Codespaces. You do have to give it the proper name, but GitHub gives you [several to choose from](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-codespaces-for-your-account#dotfiles). For this example, we'll just use `install.sh`. When Codespaces detects a script file in your dotfiles repo, it clones the dotfiles repo to "/workspaces/.codespaces/.persistedshare/dotfiles" and then executes your script file. It expects your script file to do all of the copying of dotfiles to the correct place.

In the script file, you'll need to first make it executable by adding `#!/bin/bash`. Not all Linux distros include "bash", so if "bash" isn't present in your Codespace, you can use `#!/bin/sh`.

I like to wrap up all my logic in a function and call that function. This script file is only handling the ".zshrc", but it could handle all sorts of other dotfiles install logic in the future, so having separate functions will make me look like a "real" developer. In this function, we're going to install the 2 plugins: zsh-autosuggestions and zsh-nvm. 

```bash
#!/bin/sh

zshrc() {
    echo "==========================================================="
    echo "             cloning zsh-autosuggestions                   "
    echo "-----------------------------------------------------------"                    
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    echo "==========================================================="
    echo "                 cloning zsh-zsh-nvm                       "
    echo "-----------------------------------------------------------"                 
    git clone https://github.com/lukechilds/zsh-nvm ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-nvm
    echo "==========================================================="
    echo "                  Import zshrc                             "
    echo "-----------------------------------------------------------"
    cat .zshrc > $HOME/.zshrc
}

zshrc
```

"Adding" these plugins is just cloning them into the custom plugins directory. Just pay attention to the destination and make sure you are using the ZSH_CUSTOM variable so they end up in the right place.

The last thing we do in that script is overwrite the ".zshrc" file in the HOME directory with the contents of the one from our dotfiles repo. Remember, when when Codespaces detects a script file in your dotfiles repo, it copies the whole thing to "/workspaces/.codespaces/.persistedshare/dotfiles". So it's on YOU to copy those dotfiles to the right place with your script file.

### Step 5. Mark the install script as executable with git

Now you need to tell *git* that this file is executable. I figured this out just last week after getting "file is not executable" over and over and Googling my fingers off. You need to *git add* the "install.sh" as executable. If you've already added it, remove it with `git rm --cached install.sh`. 

```bash
git add install.sh --chmod=+x 
```

You can also mark the file as executable with `git update-index --chmod=+x install.sh`, but if you do that, every time you change the script file the executable bit will get flipped off and you'll have to run that command again and you will forget and get stuck in a cycle of "file is not executable" and you will subconsciously blame me and I don't need that on my conscience. 

> NOTE: After you add the install.sh with the +x (executable) bit turned on and commit, git may still show that install.sh file as having changes. Reject those changes because you'll just be flipping the bit back. It's tedious. I know.

Now commit all your files and push them to your repo.

## Step 5: Link your dotfiles repo to Codespaces

Navigate to [https://github.com/settings/codespaces](https://github.com/settings/codespaces) and select your dotfiles repo at the top. This will link your dotfiles repo to any new Codespace that you have. 

![dotfiles configuration screen in Codespaces](/assets/codespaces-dotfiles.png)

If you already have a Codespace, doing a rebuild should pull in your dotfiles. If you change your dotfiles, rebuilding your Codespace will pull in those changes as well.

## Step 6: Make sure the right shell is being loaded

By default, Codespaces load "oh-my-bash", which is kind of like "oh-my-zsh", but not at all "oh-my-zsh". You need to tell your Codespace to load zsh as your terminal. Thanks to [@brettsky on Twitter](https://twitter.com/brettsky) for pointing out that the easiest way to that is to add the following to your VS Code settings (<kbd>Cmd/Ctrl</kbd> + <kbd>,</kbd>)...

```json
"terminal.integrated.defaultProfile.linux": "zsh"
```

> If you don't do this, your zsh shell just won't be loaded and it will look like your dotfiles are doing nothing.


### Making it work with Remote-Containers

The [Remote-Containers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers&WT.mc_id=devcloud-0000-buhollan) uses virtually the same technology and configuration as Codespaces. With Remote-Containers, you are essentially hosting your own Codespace. With Remote-Containers, you can still use this exact same setup, but you need to change one setting in VS Code to tell Remote-Containers where your dotfiles repo is...

```json
"dotfiles.repository": "https://github.com/burkeholland/dotfiles"
```

## Take your custom environment with you

Having your dotfiles automatically installed basically lets you configure every Codespace automatically so you always get the environment that you know and love. It's also only specific to you, so someone who forks your repo won't get your terminal. Even though they would be better off if they did and we both know it.





