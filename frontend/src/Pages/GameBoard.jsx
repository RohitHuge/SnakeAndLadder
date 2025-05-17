// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const GameBoard = ({ gameData, socket }) => {
  const navigate = useNavigate();
  // Add logging for game data
  // Game state
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceRoll, setDiceRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameMessage, setGameMessage] = useState("Player 1's turn to roll");
  const [winner, setWinner] = useState(null);
  const [showWinModal, setShowWinModal] = useState(false);
  
  // Player positions (1-100)
  const [playerPositions, setPlayerPositions] = useState([1, 1]);

  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
       setDiceRoll(Math.floor(Math.random() * 6) + 1);
     }, 100);
   }
   return () => {
    if(isRolling){
      clearInterval(interval);
    }
   }

  }, [isRolling]);


  useEffect(() => {
    socket.on("exitGame", () => {
      navigate('/home');
    });
    socket.on("GameStatus", (data) => {
      if (data.type === "initiateGame") {
        setCurrentPlayer(data.data.turn.username === gameData.player1.username ? 1 : 2);
        setPlayerPositions([data.data.P1position, data.data.P2position]);
      }
      if (data.type === "rollDice-start") {
        setIsRolling(true);
      }
      if (data.type === "rollDice-end") {
        setDiceRoll(data.data.roll);
        movePlayer(data.data.roll);
        setIsRolling(false);
      }
    });

  }, []);



  // If gameData is not available, show loading state
  if (!gameData || !gameData.player1 || !gameData.player2) {
    console.log("GameBoard: Missing game data", gameData);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading game data...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we set up your game</p>
        </div>
      </div>
    );
  }

  // Define snakes and ladders
  const ladders = {
    3: 22,
    5: 8,
    11: 26,
    20: 41,
    27: 84,
    35: 44,
    50: 67,
    70: 90,
    77: 98
  };

  const snakes = {
    17: 7,
    30: 12,
    39: 21,
    47: 25,
    56: 37,
    63: 59,
    72: 52,
    88: 45,
    95: 75,
    99: 58
  };

  // Player data
  const players = [
    {
      id: 1,
      name: gameData.player1.username,
      avatar: gameData.player1.avatar,
      color: "bg-purple-600"
    },
    {
      id: 2,
      name: gameData.player2.username,
      avatar: gameData.player2.avatar,
      color: "bg-blue-600"
    }
  ];

  // Function to roll dice
  const rollDice = () => {

      
    if (isRolling || winner) return;
    setIsRolling(true);
    setGameMessage("Rolling dice...");

    socket.emit("rollDice", {
      roomCode: gameData.roomCode,
    });
    
    
  };

  // Function to move player
  const movePlayer = (roll) => {
    const playerIndex = currentPlayer - 1;
    let newPosition = playerPositions[playerIndex] + roll;

    // Check if player wins
    if (newPosition === 100) {
      const newPositions = [...playerPositions];
      newPositions[playerIndex] = newPosition;
      setPlayerPositions(newPositions);
      setWinner(currentPlayer);
      setGameMessage(`Player ${currentPlayer} wins!`);
      setShowWinModal(true);
      return;
    }

    // Check if player goes beyond 100
    if (newPosition > 100) {
      setGameMessage(`Too far! You need exactly ${100 - playerPositions[playerIndex]} to win.`);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setTimeout(() => {
        setGameMessage(`Player ${currentPlayer === 1 ? 2 : 1}'s turn to roll`);
      }, 2000);
      return;
    }

    // Check for ladder
    if (ladders[newPosition]) {
      setTimeout(() => {
        setGameMessage(`Yay! Climbed up a ladder from ${newPosition} to ${ladders[newPosition]}!`);
      }, 500);
      newPosition = ladders[newPosition];
    }

    // Check for snake
    if (snakes[newPosition]) {
      setTimeout(() => {
        setGameMessage(`Oops! Slid down a snake from ${newPosition} to ${snakes[newPosition]}!`);
      }, 500);
      newPosition = snakes[newPosition];
    }

    // Update player position
    const newPositions = [...playerPositions];
    newPositions[playerIndex] = newPosition;
    setPlayerPositions(newPositions);

    // Switch turns
    // setTimeout(() => {
    //   setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    //   setGameMessage(`Player ${currentPlayer === 1 ? 2 : 1}'s turn to roll`);
    // }, 2000);
  };

  // Function to restart game
  const restartGame = () => {
    setPlayerPositions([1, 1]);
    setCurrentPlayer(1);
    setDiceRoll(null);
    setWinner(null);
    setShowWinModal(false);
    setGameMessage("Player 1's turn to roll");
  };

  // Function to exit game
  const handleExitGame = () => {
    console.log("Exiting game, would redirect to /home");
    socket.emit("exitGame");
    navigate('/home');
  };

  // Function to get cell coordinates from position (1-100)
  const getCellCoordinates = (position) => {
    const row = 9 - Math.floor((position - 1) / 10);
    let col;
    if (row % 2 === 1) {
      // Odd rows go left to right
      col = (position - 1) % 10;
    } else {
      // Even rows go right to left
      col = 9 - ((position - 1) % 10);
    }
    return [row, col];
  };

  // Generate board cells (1-100)
  const generateBoardCells = () => {
    const cells = [];
    let cellNumber = 100;
    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        const isEvenRow = row % 2 === 0;
        const actualNumber = isEvenRow ? cellNumber - col : cellNumber - 9 + col;

        // Determine cell color
        let cellClass = "bg-white";
        if ((row + col) % 2 === 0) {
          cellClass = "bg-purple-50";
        }

        // Check if cell has a snake or ladder
        const hasSnake = Object.keys(snakes).includes(actualNumber.toString());
        const hasLadder = Object.keys(ladders).includes(actualNumber.toString());

        // Check if any player is on this cell
        const player1Here = playerPositions[0] === actualNumber;
        const player2Here = playerPositions[1] === actualNumber;

        rowCells.push(
          <div
            key={`cell-${row}-${col}`}
            className={`relative border border-gray-200 ${cellClass} flex items-center justify-center`}
            style={{ height: "100%", width: "100%" }}
          >
            {/* Cell number */}
            <span className="absolute top-1 left-1 text-xs text-gray-500">{actualNumber}</span>
            
            {/* Snake indicator */}
            {hasSnake && (
              <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-red-500 border-r-transparent transform rotate-0"></div>
            )}
            
            {/* Ladder indicator */}
            {hasLadder && (
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b-8 border-l-8 border-b-green-500 border-l-transparent transform rotate-0"></div>
            )}
            
            {/* Player tokens */}
            <div className="flex items-center justify-center space-x-1">
              {player1Here && (
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-600 border-2 border-white z-10 flex items-center justify-center text-white text-xs font-bold`}>
                  1
                </div>
              )}
              {player2Here && (
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 border-2 border-white z-10 flex items-center justify-center text-white text-xs font-bold`}>
                  2
                </div>
              )}
            </div>
          </div>
        );
      }
      cells.push(
        <div key={`row-${row}`} className="grid grid-cols-10 h-full">
          {rowCells}
        </div>
      );
      cellNumber -= 10;
    }
    return cells;
  };

  // Render dice face based on roll value
  const renderDiceFace = (value) => {
    if (value === null) return <i className="fas fa-dice text-4xl text-gray-400"></i>;
    const diceIcons = [
      "fa-dice-one",
      "fa-dice-two",
      "fa-dice-three",
      "fa-dice-four",
      "fa-dice-five",
      "fa-dice-six"
    ];
    return <i className={`fas ${diceIcons[value - 1]} text-5xl text-purple-600`}></i>;
  };

  // Render snake and ladder legend items
  const renderLegendItems = () => {
    const snakeEntries = Object.entries(snakes).slice(0, 5);
    const ladderEntries = Object.entries(ladders).slice(0, 5);
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h4 className="font-semibold text-red-600 mb-1 flex items-center">
            <i className="fas fa-arrow-down mr-1"></i> Snakes
          </h4>
          <ul className="space-y-1">
            {snakeEntries.map(([from, to]) => (
              <li key={`snake-${from}`} className="text-gray-700">
                {from} <i className="fas fa-arrow-right text-xs mx-1"></i> {to}
              </li>
            ))}
            {Object.keys(snakes).length > 5 && (
              <li className="text-gray-500 italic">...and more</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-green-600 mb-1 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i> Ladders
          </h4>
          <ul className="space-y-1">
            {ladderEntries.map(([from, to]) => (
              <li key={`ladder-${from}`} className="text-gray-700">
                {from} <i className="fas fa-arrow-right text-xs mx-1"></i> {to}
              </li>
            ))}
            {Object.keys(ladders).length > 5 && (
              <li className="text-gray-500 italic">...and more</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  // Function to get roll button state and text
  const getRollButtonState = () => {
    if (winner !== null) {
      return {
        disabled: true,
        text: "Game Over",
        className: "bg-gray-400 cursor-not-allowed"
      };
    }
    if (isRolling) {
      return {
        disabled: true,
        text: "Rolling...",
        className: "bg-gray-400 cursor-not-allowed"
      };
    }
    if (currentPlayer !== 1) {
      return {
        disabled: true,
        text: `${gameData.player2.username}'s turn`,
        className: "bg-gray-400 cursor-not-allowed"
      };
    }
    return {
      disabled: false,
      text: "Roll Dice",
      className: "bg-purple-600 hover:bg-purple-700"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 opacity-20 animate-bounce duration-3000">
        <i className="fas fa-dice-five text-purple-300 text-6xl"></i>
      </div>
      <div className="absolute bottom-40 right-20 opacity-20 animate-bounce duration-2000 delay-1000">
        <i className="fas fa-dice-two text-purple-300 text-6xl"></i>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with game title and player info */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-2xl font-bold text-purple-700 flex items-center">
              <i className="fas fa-dice text-purple-600 mr-3"></i>
              <h1>Snake & Ladder Game</h1>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center ${currentPlayer === player.id ? 'ring-2 ring-offset-2 ring-purple-500 rounded-full' : ''}`}
              >
                <img
                  src={player.avatar}
                  alt={player.name}
                  className={`w-10 h-10 rounded-full border-2 ${currentPlayer === player.id ? 'border-purple-500' : 'border-gray-300'}`}
                />
                <div className="ml-3">
                  <p className={`font-medium ${currentPlayer === player.id ? 'text-purple-700' : 'text-gray-600'}`}>
                    {player.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Position: {playerPositions[index]}
                  </p>
                </div>
                {currentPlayer === player.id && (
                  <div className="ml-2 animate-pulse">
                    <i className="fas fa-circle text-purple-500 text-xs"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleExitGame}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Exit Game
          </button>
        </header>

        {/* Main game content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Player 1 info */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={players[0].avatar}
                    alt={players[0].name}
                    className="w-20 h-20 rounded-full border-4 border-purple-400"
                  />
                  <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                    <span>P1</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-purple-800">{players[0].name}</h3>
                <div className="mt-4 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Current Position:</span>
                    <span className="font-semibold text-purple-700">{playerPositions[0]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${Math.min(100, playerPositions[0])}%` }}
                    ></div>
                  </div>
                </div>
                {currentPlayer === 1 && (
                  <div className="mt-4 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg flex items-center">
                    <i className="fas fa-hourglass-half mr-2 animate-pulse"></i>
                    <span>Your turn to roll!</span>
                  </div>
                )}
              </div>
            </div>
            {/* Game legend */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Game Legend</h3>
              {renderLegendItems()}
            </div>
          </div>

          {/* Center - Game board */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="aspect-square w-full border-4 border-purple-200 rounded-lg overflow-hidden grid grid-rows-10">
                {generateBoardCells()}
              </div>
            </div>
          </div>

          {/* Right sidebar - Player 2 info and dice */}
          <div className="lg:col-span-1 order-3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={players[1].avatar}
                    alt={players[1].name}
                    className="w-20 h-20 rounded-full border-4 border-blue-400"
                  />
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                    <span>P2</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{players[1].name}</h3>
                <div className="mt-4 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Current Position:</span>
                    <span className="font-semibold text-blue-700">{playerPositions[1]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${Math.min(100, playerPositions[1])}%` }}
                    ></div>
                  </div>
                </div>
                {currentPlayer === 2 && (
                  <div className="mt-4 py-2 px-4 bg-blue-100 text-blue-700 rounded-lg flex items-center">
                    <i className="fas fa-hourglass-half mr-2 animate-pulse"></i>
                    <span>Your turn to roll!</span>
                  </div>
                )}
              </div>
            </div>
            {/* Dice section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Dice Roll</h3>
              <div className="flex flex-col items-center">
                <div className="mb-6 h-24 flex items-center justify-center">
                  {renderDiceFace(diceRoll)}
                </div>
                <button
                  onClick={rollDice}
                  disabled={getRollButtonState().disabled}
                  className={`w-full py-3 px-6 rounded-button text-white font-medium text-lg transition-all cursor-pointer whitespace-nowrap ${getRollButtonState().className}`}
                >
                  {getRollButtonState().text}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-gray-700">{gameMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game info section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Game Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-dice text-purple-500 mt-1 mr-2"></i>
                  <span>Roll the dice to move your piece along the board.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-arrow-up text-green-500 mt-1 mr-2"></i>
                  <span>Climb up the ladders to advance quickly.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-arrow-down text-red-500 mt-1 mr-2"></i>
                  <span>Avoid the snakes that will slide you down.</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-purple-500 mt-1 mr-2"></i>
                  <span>You need to roll the exact number to land on 100 and win.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-sync-alt text-blue-500 mt-1 mr-2"></i>
                  <span>If your roll would take you beyond 100, your turn is skipped.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-trophy text-yellow-500 mt-1 mr-2"></i>
                  <span>First player to reach square 100 wins!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Snake & Ladder Online. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="text-purple-500 hover:text-purple-700 cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-purple-500 hover:text-purple-700 cursor-pointer">Terms of Service</a>
            <a href="#" className="text-purple-500 hover:text-purple-700 cursor-pointer">Help</a>
          </div>
        </footer>
      </div>

      {/* Win modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 animate-fade-in-up">
            <div className="text-center">
              <div className="mb-6">
                <i className="fas fa-trophy text-yellow-500 text-6xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                Player {winner} Wins!
              </h2>
              <p className="text-gray-600 mb-6">
                Congratulations! Player {winner} has reached square 100 and won the game!
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                <button
                  onClick={restartGame}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Play Again
                </button>
                <button
                  onClick={handleExitGame}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-home mr-2"></i>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
