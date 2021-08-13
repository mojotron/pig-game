# Pig Game

This project is inspired by awesome tutorial [Complete Javascript Course](https://www.udemy.com/course/the-complete-javascript-course/) by Jonas Schmedtmann and his version of [Pig game](https://pig-game-v2.netlify.app/). To challenge myself, instead of recreating whole project, i added a twist with 20 sided die and couple of more rules in game logic. Here is reference to original [pig game](<https://en.wikipedia.org/wiki/Pig_(dice_game)>).
Goal of this project is reinforce my knowledge at the current learning path. I tried to use all tricks I learned in my other projects, to nail them down in brain.

## What have I learned?

- Dynamically update DOM element depending on state variables. Using one variable (current player) to update score end multiple DOM elements.
- Activate/Deactivate event listeners depending on game state. When initialize new game activate roll and hold button and when end game is reached, deactivate those buttons so player cannot use them until start of next new game.
- Init function for setting up starting state. Making code DRY.
- Not depending on global flag variables to change game state.
- How to add a browser tab icon (favicon) for a website
