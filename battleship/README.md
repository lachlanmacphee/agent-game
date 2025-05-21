# Battleship Game

A classic Battleship game implementation built with React and Vite. Play against the computer in this turn-based naval strategy game.

![Battleship Game](https://github.com/lachlanmacphee/agent-game/raw/main/battleship/public/vite.svg)

## Overview

This project is a web-based implementation of the classic Battleship board game. Players take turns guessing the location of their opponent's ships on a 10x10 grid. The first player to sink all of their opponent's ships wins the game.

## Features

- Interactive game board with visual feedback
- Random ship placement
- Turn-based gameplay against computer AI
- Game state management (win/lose conditions)
- Responsive design

## Installation

1. Clone the repository and navigate to the battleship directory:

   ```
   cd battleship
   ```

2. Install dependencies:

   ```
   npm i
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Play the game in your browser (typically at http://localhost:5173)

## How to Play

1. The game starts with ships randomly placed on both your board and the computer's board
2. Click on cells in the computer's board to attack that position
3. Hit ships appear in red, missed shots appear in gray
4. The computer will automatically take its turn after you
5. Sink all of the computer's ships to win the game
6. Use the "Reset Game" button to start a new game at any time

## Project Structure

```
battleship/
├── public/                # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── assets/            # Application assets
│   │   └── react.svg      # React logo
│   ├── components/        # React components
│   │   ├── Board.jsx      # Game board component
│   │   ├── Cell.jsx       # Individual cell component
│   │   ├── Game.jsx       # Main game component
│   │   └── GameControls.jsx # Game controls component
│   ├── styles/            # Component-specific styles
│   │   ├── Board.css      # Board component styles
│   │   ├── Cell.css       # Cell component styles
│   │   ├── Game.css       # Game component styles
│   │   └── GameControls.css # Game controls styles
│   ├── utils/             # Utility functions
│   │   └── gameLogic.js   # Game logic functions
│   ├── App.css            # App component styles
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package-lock.json      # Package lock file
├── package.json           # Package configuration
├── README.md              # This file
└── vite.config.js         # Vite configuration
```

## Key Components

### Game.jsx

The main game component that manages the game state, including player and computer boards, turns, and win/lose conditions.

### Board.jsx

Renders the game board as a grid of cells. Used for both player and computer boards.

### Cell.jsx

Represents an individual cell on the game board. Shows different states (ship, hit, miss) based on game progress.

### GameControls.jsx

Provides game controls like reset button and displays game status messages.

## Game Logic

The game logic is contained in `src/utils/gameLogic.js` and includes functions for:

- Initializing the game board
- Placing ships randomly
- Checking if a ship can be placed at a specific position
- Determining when the game is over

## Technologies Used

- React 19
- Vite 6
- CSS3
- JavaScript (ES6+)

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally

## Future Improvements

- Add difficulty levels for the computer AI
- Allow manual ship placement by the player
- Add sound effects
- Implement multiplayer functionality
- Add animations for hits and misses
- Save game state to local storage

## License

[MIT](https://choosealicense.com/licenses/mit/)
