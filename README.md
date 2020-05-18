Minesweeper excercise with React
==============================================================================================================================
This application has the following requirements:

Create a version of the classic game of Minesweeper in your prefered stack.
Minesweeper is a grid of tiles, each of which may or may not cover hidden mines. The goal is to click on every tile except those that have mines. When a user clicks a tile, one of two things happens: if the tile was covering a mine, the mine is revealed and the game ends in failure; if the tile was not covering a mine, it instead reveals the number of adjacent tiles (including diagonals) that are covering mines - and, if that number is 0, it behaves as if the user has clicked on every cell around it. With each turn, the game is validated:

* If the player uncovers a bomb tile, the player loses and the game ends.
* If the player uncovers a non-bomb tile (number) and there are remaining non-bomb tiles uncovered, the game continues. Otherwise, the player wins.

Design constraints

- The board should be an N x M grid and by default X hidden mines are randomly placed on the board. These parameters should be entered by the user before starting the game. The user should also be able to select between 3 pre-defined levels (easy, medium, hard).
- The user should be able to mark a tile with a flag (right click) that points that the tile could contain a bomb. That tile should be disabled and the user shouldn't be able to click it.
- The board header should display the remaining bombs in the game. This counter is modified when the user sets flags on the tiles.
- The app should have routing for different pages (game setup, game board, finished games list, etc).

Additional features are encouraged:

* Saving/loading (either server side or client side).
* Add a page that list all the games played by the user.
* The table must still appear if the page is refreshed.
* The columns
    * Start Time. Format: MM-DD-YYYY hh:mm (12hr format)
    * End Time: Format: MM-DD-YYYY hh:mm (12hr format)
    * Difficulty
    * Total time spent
    * Status: Won/Lost

-------------------------------------------------------------------------------------------
In order to have the database connected and operational, run the following command first:

npm run jsonDB

This will run the corresponding script to initialize the json-server database (a lightweighted json db). This will be listening to port 3001. Once this is done, you must run

npm run start

The application won't let you play unless you press Start. The Finish button functions as a "give up" option. Everytime you win/lose, a record will be added to the grid at the bottom (which can also be accessed by going to http://localhost:3000/games). The grid has 3 default difficulties, and the option of customizing the size and the amount of bombs if desired



