# Snake-Game-Practice
Snake Squad
=================

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

In order to use the Snapchat login and bitmoji functionality on index.html, your Snap username will need to be added 
to the project on SnapKit. 

In order to play the game: you are a snake that you can control with your arrow keys. 
The goal of the game is to eat as many apples as you can without accidentally eating yourself. 


## Learning Goals
* Learn the basics of creating static websites using HTML, CSS, and JavaScript
* Learn how to make a game dynamic using JavaScript
* Get familiar with JavaScript Syntax - Objects, Functions, and Loops
* Understand the basics of creating a video game using HTML5 Canvas


Project Directory
------------

### ← README.md

That's this file, where you can tell people what this project does and how to read it.

### ← index.html and index-login.js 

These two files are responsible for the home page of the game, including the log in via Snapchat's Login Kit. 

### ← game.html, game.css, and game.js

These are responsible for running the snake squad game. game.html relies on game.css for styling and game.js for interactivity. 
Most of your work will be in modifying game.js. 

### ← assets

You can drag in `assets`, like images or music, to add them to your project


### Model Data
* Snake Object
```
var snake = {
  x: 160,
  y: 160,
  x_step: grid, //snake velocity. moves one grid length every frame in either the x or y direction
  y_step: 0,
  cells: [],  //an array that keeps track of all grids the snake body occupies
  currentLength: 4 //current length of the snake. grows when eating an apple. 
};
```


Credits
------------
This starter code was adapted from Steven Lambert on Github (@straker).

Music: TeknoAxe - Nineteen Eighty Seven
Accessed 19 July 2020
Nineteen_Eighty_Seven.mp3
http://teknoaxe.com/Link_Code_3.php?q=1590&genre=Retro

Game Over Sound: Free Sounds Library - Game Over Sound Effect
Accessed 20 July 2020
game-over-sound-effect.mp3
https://www.freesoundslibrary.com/game-over-sound-effect/

Asteroid Image
Accessed 20 July 2020
Screenshot of Asteroid Huge.png
https://opengameart.org/content/pixel-art-2d-asteroid-pack

Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
