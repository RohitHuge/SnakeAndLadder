import {useState, useEffect} from "react";
import GameBoard from "./GameBoard.jsx";
import GameLobby from "./GameLobby.jsx";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from '../config';

function Game() {
    const [gameState, setGameState] = useState("lobby");
    const [gameData, setGameData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();
    const [playingUser, setPlayingUser] = useState(null);
    // const [user, setUser] = useState(location.state?.user);

    useEffect(() => {
        // Create socket instance
        const newSocket = io(SOCKET_BASE_URL, {
            withCredentials: true,
            transports: ["websocket", "polling"],
            reconnectionAttempts: 3,
            timeout: 10000,
        });

        // Connection event handlers
        const handleConnect = () => {
            console.log('Socket connected successfully');
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        };

        const handleError = (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        };

        // Add event listeners
        newSocket.on('connect', handleConnect);
        newSocket.on('disconnect', handleDisconnect);
        newSocket.on('connect_error', handleError);

        setSocket(newSocket);

        // Cleanup function
        return () => {
            newSocket.off('connect', handleConnect);
            newSocket.off('disconnect', handleDisconnect);
            newSocket.off('connect_error', handleError);
            newSocket.disconnect();
        };
    }, []);

    const startGame = (data) => {
        console.log("Starting game with data:", data);
        if (!data || !data.player1 || !data.player2) {
            console.error("Invalid game data received:", data);
            return;
        }
        setGameData(data);
        setGameState("board");
        socket.emit("startGame", data);
    };

    // Add effect to log game state changes
    useEffect(() => {
        console.log("Game state changed:", { gameState, gameData });
    }, [gameState, gameData]);

    if (!isConnected) {
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
                <GameLobby socket={socket} onGameStart={startGame} setGameData={setGameData} setPlayingUser={setPlayingUser} />
            ) : (
                <GameBoard gameData={gameData} socket={socket} playingUser={playingUser} />
            )}
        </div>
    );
}

export default Game;
