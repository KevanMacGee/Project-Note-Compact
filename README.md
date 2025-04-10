# Project Notes - Compact

This is a very basic tool to replace Notepad notes on projects. When I work on small side projects, I always end up with a .txt file full of To-Dos and reference URLs of resources related to the project I'm working on. This is a replacement for that.

It's important to note that this is a very basic "duct tape engineering" level tool, not a really replacement for something like Notion or Evernote. It's vibe coded and is an appropriate level of functionality for that.

This is technically a basic web app, but it is designed to be used locally only. Also, think of this as a document rather than a web app. You will use a different instance of this for each project you are using it for. It isn't intented to keep track of multiple projects.

##### What this project is:
* It's a hacky little rudimentary tool to organize ToDos and relevant links when working on a project.

##### What it is not:
* Perfect. 
* Made with users in mind that are not me.

### Features:

- KanBan board with 4 columns and editable cards.
  - KanBan card description is optional.
  - KanBan cards are draggable to change their status.
- Link collection area, basically just a list of URLs with an optional description.
  - Links aren't editable, just delete and redo if you want to change something.
- Local storage should save your edits from session to session, but this is a risky way to save data.
- The app has the ability to export and import all data as JSON files.
  - Note: any import will overwrite all data.
- Light and Dark modes courtesy of https://bootswatch.com/.
- All HTML, CSS and JS powering the app are written inline in one html file. Not a great feature for production, but in this instance, you get the convenience of only having one file.
- Spell check should be handled by your browser.

### How to use: 

- Simply save the index.html file to the directory you want to use it in. (Generally, I keep it in my gitignore folder.) 
- Then just open the html file in any browser to edit the cards and links.
- Occasionally, export the data to make a back up if you like. 



