---
title: how does matrix ACTUALLY work though
description: a sequel to the matrix dev diary
date: 2025-07-08
tags:
  - matrix
  - dev-diary
number: 2
hide: false
---
i'm beginning to realise, after drafting out the first we are 1 dev diary, that my original matrix dev diary was very overly short. it was more of a faq page than a dev diary to be completely honest. there's no actual documentation of how it works other than the platforms i used. so i thought i'd just talk about it here for anyone who's interested!

there's not gonna be a lot of jargon here because i get that not everyone is into this stuff and i find it really hard to keep up with jargon as well so i totally get it. i'll define terms for the sake of anyone who wants to look this stuff up but otherwise i'm mostly going to be using more basic and generic wording.
# backend
the backend is basically an obsidian vault. for those of you who are unaware, obsidian is a note-taking app that organises everything into vaults. each vault is like a directory of markdown files, which are basically files that you can write text in, but you can also add things to them to make them look fancy. most texting apps have their own flavor of markdown (e.g. putting asterisks or underscores around words to make them bold or italic).

each file has six properties: title, description, date, tags, number and hide. the first four are quite self-explanatory, but the last two are a bit different. the number is for series numbering and ordering. if you're reading this right after i upload this, **series** are probably not very familiar to you because not a lot of the posts are organised in series. however, this post and the original matrix dev diary are a functioning series!

meanwhile, "hide" prevents the files from being displayed on the site. you can access hidden files if you have the link, and my site will render blog pages for hidden files, but they won't appear in any other view.

these files are all uploaded onto this thing called a **vercel blob**, which is basically just a space on vercel where you can put files. it's designed to be quick with response timing, so the site doesn't take forever to load.
## compilation
the files alone are not enough for a backend, especially if you want to quickly index all the data. that's why i have a workflow for everytime i push my files to github! what usually happens is:
- i generate a *build.json* file containing all the property values
- i clear out the blob
- i generate a timestamp
- i upload all the files to the blob, with the timestamp in the filenames
## timestamping
the reason why we need a timestamp is mainly because of caching. vercel is very stubborn with cache, meaning that pulling from the same url will give the same results after the file has changed. and i found the best way to sidestep this was just to use new filenames every single time. the timestamp is a unique string of sorts because i know it'll never repeat!

the original plan for timestamps was to put it in a file called *timestamp.txt*, then retrieve that file from the vercel blob. but that's the problem - the vercel blob is very stubborn with cache. so what i did was put *timestamp.txt* on github instead, and then use the github api to pull from there. the reason why i didn't just list the files on the blob was for similar reasons - the results would probably be stale (i.e. cached from earlier calls and not up to date).
# frontend
let's talk about how the website works. the website works completely on fetching files. 

how we fetch files is that we obtain *timestamp.txt* from github, and then from there, we reconstruct the name of the file we're looking for and fetch it from the vercel blob.

there are two important files at the base of the backend github repo (i.e. the huge folder i push to github), *build.json* and *config.json*.
- *build.json* contains all property values of all files. this is generated after every push on the github server.
- *config.json* contains all information about which posts to pin, and which directories are actually series.

let's go through how each of the features in the site works!
## blog
this just pulls the file from the server using the method explained earlier and displays it.
## cards
cards are basically summaries of posts generated from the properties. they look like empty rectangles with rounded white borders. all the data in these is pulled from *build.json*
## directory/tree
this one uses *build.json*. *build.json* is a JSON file, which means that it has key-value pairs. a simpler term for this, which python also uses, is a **dictionary**. build.json has all of file paths as keys, and all of the property dictionaries as values. this means that to find all paths in a certain folder, i can essentially index all the keys, and find all the keys that start with that path. from there, we can render the directory!
## home
this one has four main rows of cards. but how do we get the paths?
- pinned: in *config.json*.
- latest: in *build.json* but you have to sort by date and then get the latest 10.
- tags: in *build.json* but you need to collapse every tag from every post into one list with no dupes.
- series: in *config.json*.
## search/tags pages
these work on the same concepts i briefly talked about for directory/tree and home. basically we look through *build.json* and find all entries that have the corresponding tag or contain the search term in their title or description.
## homepage animation
i am **so proud** of this animation idea. i hate doing animations in web apps usually because they're annoying and my brain doesn't work well with them, but this was a lot easier.

the idea behind this animation was that we'd have a list of words, and every word would be still for 2 *insert unit of time* and transitioning into the next word for 1 *unit of time*. at the moment, the full 4-word cycle (12 *units of time*) is 6 seconds (so each *unit of time* is half a second). 

the transition basically treats the words that it transitions from and to (e.g. matrix and origin) as base-36 numbers. from there, based on the current second, it transitions linearly to the number. so if we were exactly halfway through the transition, the word at that moment would be (tw: **math**):

$$
\frac{\text{MATRIX}_{36} + \text{ORIGIN}_{36}}{2}
$$
# suffering and pain
on a more serious note.

it's been a very long time since i last worked on a big project with react. i forgot how you should always avoid anything that uses buffer in it. and i also forgot how you should never update react from the template you start with. please don't. i spent a few hours staying up until 3am just so i could wrap it up before i went to sleep.

**please please i am begging you. learn from my mistakes. don't do any of the above.**

and that concludes my follow-up dev diary for matrix! thank you so much for reading and being remotely interested in any of my thinky thoughts. have a good day!
