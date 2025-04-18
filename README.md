Project status: It's just about finished except for the following:
* Done ~~Need to determine if criteria for it to accept a URL is good enough or needs to be fine tuned. (Especially local files.)~~
* Final security auditing.
* I'm not quite done testing it on Chromium based browsers but I should have all or almost all the bugs there squashed. However it's had almost no testing on FireFox yet.
* It needs a better description here on the README, including the addition of a demo video. I also haven't even written a repo description yet.

# Project Notes

This is a very basic tool to replace Notepad .txt notes on projects. When I work on small side projects, I always end up with a .txt file full of To-Dos and reference URLs of resources related to the project I'm working on. This is a replacement for that.

It's important to note that this is a very basic "duct tape engineering" level tool, not a really replacement for something like Notion or Evernote. It's a product of a combination of vibe coding, bouncing the code off other models for refactoring and manual review and adjustments.

This is technically a basic web app, but it is designed to be used locally only. Also, think of this as a document rather than a web app. You will use a different instance of this for each project you are using it for. It isn't intended to keep track of multiple projects in the same instance.

### What this project is:
* It's a hacky little rudimentary tool to organize ToDos and relevant links when working on a project.

### What it is not:
* Perfect. 
* Made with users in mind that are not me.

### Features:

- KanBan board with 4 columns and editable cards.
  - KanBan card description is optional.
  - Cards are draggable to change their status.
- Link collection area: basically just a list of URLs with an optional description.
  - Links aren't editable, just delete and redo if you want to change something.
- The order of the links can be dragged and dropped to change the order of the list.
- Local storage should save your edits from session to session, but this is a slightly risky way to save data.
- The app has the ability to export and import all data as a JSON file.
  - Note: any import will overwrite all data. (This is on my list of "I should probably fix this but I'm not sure if I care enough to do so." things)
- Light and Dark modes courtesy of https://bootswatch.com/.
- All HTML, CSS and JS powering the app are written inline in one html file. Not a great feature for production, but in this instance, you get the convenience of only having one file.
- Spell check should be handled by your browser.

### How to use: 

- Simply save the index.html file to the directory you want to use it in with a unique filename. (Generally, I keep it in my gitignore folder.)
  - WARNING: :warning: Each instance of this app MUST have a unique file name in order for the local storage to work correctly. :warning: 
- Then just open the html file in any browser to edit the cards and links.
- Occasionally, export the data to make a back up if you like.
Note: This has been tested on Chromium browsers. It should work on FireFox but it hasn't been tested there yet.
