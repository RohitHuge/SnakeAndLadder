import {useState, useEffect} from "react";
import { io } from "socket.io-client";
import { SOCKET_BASE_URL, API_BASE_URL } from "../config";
import GameBoard from "./GameBoard.jsx";
import GameLobby from "./GameLobby.jsx";
import { useNavigate } from "react-router-dom";

function Game() {
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState("lobby");
    const [gameData, setGameData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeSocket = async () => {
            try {
                console.log('Starting socket initialization...');
                
                // First, create the socket instance
                const newSocket = io(SOCKET_BASE_URL, {
                    withCredentials: true,
                    transports: ["websocket", "polling"],
                    reconnectionAttempts: 3,
                    timeout: 10000,
                });

                // Add connection event listeners for debugging
                newSocket.on('connect', () => {
                    console.log('Socket connected successfully');
                });

                newSocket.on('connect_error', (error) => {
                    console.error('Socket connection error:', error);
                });

                // Wait for socket to connect
                await new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject(new Error('Socket connection timeout after 10 seconds'));
                    }, 10000);

                    newSocket.on('connect', () => {
                        clearTimeout(timeoutId);
                        resolve();
                    });

                    newSocket.on('connect_error', (error) => {
                        clearTimeout(timeoutId);
                        reject(error);
                    });
                });

                // After socket is connected, activate it on the server
                console.log('Activating socket on server...');
                const response = await fetch(`${API_BASE_URL}/socket/activate`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Failed to activate socket: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Socket activation response:', data);

                setSocket(newSocket);
                setIsLoading(false);
            } catch (error) {
                console.error("Error initializing socket:", error);
                setError(error.message || 'Failed to connect to game server');
                setIsLoading(false);
            }
        };

        initializeSocket();

        // Cleanup function
        return () => {
            if (socket) {
                console.log('Cleaning up socket connection...');
                socket.disconnect();
            }
        };
    }, []);

    const startGame = (gameData) => {
        setGameData(gameData);
        setGameState("board");
    };

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-4">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
                        >
                            Retry Connection
                        </button>
                        <button 
                            onClick={() => navigate('/home')} 
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Connecting to game server...</p>
                    <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {gameState === 'lobby' ? (
                <GameLobby socket={socket} onGameStart={startGame} />
            ) : (
                <GameBoard socket={socket} gameData={gameData} />
            )}
        </div>
    );
}

export default Game;
// export{setSocket, gameState, gameData};
