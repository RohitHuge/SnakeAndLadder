// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const GameLobby = () => {
  // Current user data
const location = useLocation();
const [user, setUser] = useState(location.state.user);
const navigate = useNavigate();
  const [currentUser] = useState({
    username: user.username,
    avatar: user.avatarUrl ||'https://readdy.ai/api/search-image?query=cute%2520cartoon%2520game%2520character%2520avatar%2520with%2520purple%2520background%252C%2520digital%2520art%252C%2520friendly%2520face%252C%2520game%2520icon%2520style%252C%2520minimalist%2520design%252C%2520clean%2520background%252C%2520high%2520quality&width=80&height=80&seq=avatar123&orientation=squarish',
    isHost: location.state.isHost
  });
 
  useEffect(() => {
    if (location.state.isHost) {
      const makeGameRoom = async () => {
        const response = await fetch(`${API_BASE_URL}/game/create-room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
        });
        if(!response.ok){
          throw new Error('Failed to create game room');
        }
        const data = await response.json();
        setroomCode(data.data.roomCode);
      };
  
      makeGameRoom();
    }
    else{
      const joinGameRoom = async () => {
        const response = await fetch(`${API_BASE_URL}/game/join-room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ roomCode: location.state.roomCode }),
        });
        if(!response.ok){
          throw new Error('Failed to join game room');
        }
        const data = await response.json();
        setroomCode(data.data.roomCode);
      };
      joinGameRoom();
    }
    }, []);
  
  const [friends] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://readdy.ai/api/search-image?query=friendly%20female%20game%20character%20avatar%20with%20green%20background%20digital%20art%20minimalist%20design%20clean%20background%20high%20quality%20professional&width=50&height=50&seq=friend1&orientation=squarish',
      status: 'online'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=friendly%20male%20game%20character%20avatar%20with%20blue%20background%20digital%20art%20minimalist%20design%20clean%20background%20high%20quality%20professional&width=50&height=50&seq=friend2&orientation=squarish',
      status: 'online'
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: 'https://readdy.ai/api/search-image?query=friendly%20female%20game%20character%20avatar%20with%20purple%20background%20digital%20art%20minimalist%20design%20clean%20background%20high%20quality%20professional&width=50&height=50&seq=friend3&orientation=squarish',
      status: 'offline'
    }
  ]);

  const [invitedFriends, setInvitedFriends] = useState([]);

  const sendInvite = (friendId) => {
    setInvitedFriends(prev => [...prev, friendId]);
    // Here you would typically make an API call to send the invite
    console.log(`Invite sent to friend ${friendId}`);
  };

  // Room code
  const [roomCode, setroomCode] = useState('Failed to get room code');
  const [copied, setCopied] = useState(false);
  
  // Opponent state (null = waiting, object = joined)
  const [opponent, setOpponent] = useState(null);

  // Copy room code to clipboard
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle leave lobby
  const handleLeaveLobby = async () => {
    const response = await fetch(`${API_BASE_URL}/game/delete-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ roomCode: roomCode }),
      credentials: 'include',
    });
    if(!response.ok){
      throw new Error('Failed to delete game room');
    }
    navigate('/home');
  };

  // Handle start game
  const handleStartGame = () => {
    console.log('Starting game...');
    // In a real app, this would initiate the game
  };

  const [inputValue, setInputValue] = useState('');

  // Example of handling input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce duration-3000">
        <i className="fas fa-dice-five text-purple-300 text-6xl"></i>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-bounce duration-2000 delay-1000">
        <i className="fas fa-dice-two text-purple-300 text-6xl"></i>
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-10">
        <i className="fas fa-chess-board text-purple-200 text-8xl"></i>
      </div>
      <div className="absolute bottom-1/4 left-1/4 opacity-10">
        <i className="fas fa-gamepad text-purple-200 text-8xl"></i>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Main content */}
        <main className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">Game Lobby</h1>
            {/* Room code display */}
            <div className="max-w-xs mx-auto mb-8">
              <p className="text-gray-600 mb-2">Room Code:</p>
              <div className="flex items-center justify-center">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-l-lg px-6 py-3 font-mono font-bold text-xl text-purple-800 tracking-wider">
                  {roomCode}
                </div>
                <button
                  onClick={copyRoomCode}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-r-lg transition-colors cursor-pointer whitespace-nowrap h-full"
                >
                  {copied ? (
                    <i className="fas fa-check"></i>
                  ) : (
                    <i className="fas fa-copy"></i>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-2 animate-fade-in">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>
          {/* Players section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Current player */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300 flex flex-col items-center">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-24 h-24 rounded-full border-4 border-purple-400 mb-4"
                />
                <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                  <span>P1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-purple-800">{currentUser.username}</h3>
              <p className="text-purple-600 mt-2">
                <i className="fas fa-crown mr-1"></i> Host
              </p>
            </div>
            {/* Opponent (waiting or joined) */}
            <div className={`rounded-xl p-6 border-2 flex flex-col items-center ${opponent ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'}`}>
              {opponent ? (
                <>
                  <div className="relative">
                    <img
                      src={opponent.avatar}
                      alt={opponent.username}
                      className="w-24 h-24 rounded-full border-4 border-blue-400 mb-4"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                      <span>P2</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800">{opponent.username}</h3>
                  <p className="text-blue-600 mt-2">
                    <i className="fas fa-user-check mr-1"></i> Joined
                  </p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 mb-4 flex items-center justify-center bg-gray-100">
                    <i className="fas fa-user text-gray-300 text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-500">Waiting for opponent...</h3>
                  <div className="mt-4 flex items-center text-gray-400">
                    <div className="animate-spin mr-2">
                      <i className="fas fa-circle-notch"></i>
                    </div>
                    <span>Invite a friend using the room code</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleStartGame}
              disabled={!opponent}
              className={`w-full max-w-xs py-3 px-6 rounded-button text-white font-medium text-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${opponent ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              <i className="fas fa-play-circle mr-2"></i>
              Start Game
            </button>
            <button
              onClick={handleLeaveLobby}
              className="w-full max-w-xs py-3 px-6 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-button font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
            >
              <i className="fas fa-door-open mr-2"></i>
              Leave Lobby
            </button>
          </div>
        </main>

        {/* Friends List Section - Only visible for host */}
        {currentUser.isHost && !opponent && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
              <i className="fas fa-user-friends mr-2"></i>
              Invite Friends
            </h3>
            <div className="space-y-4">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{friend.name}</h4>
                      <p className={`text-sm ${friend.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                        <i className={`fas fa-circle text-xs mr-1`}></i>
                        {friend.status}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => sendInvite(friend.id)}
                    disabled={invitedFriends.includes(friend.id)}
                    className={`px-4 py-2 rounded-button text-sm font-medium transition-all whitespace-nowrap
                    ${invitedFriends.includes(friend.id)
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                  >
                    {invitedFriends.includes(friend.id) ? (
                      <>
                        <i className="fas fa-check mr-1"></i>
                        Invite Sent
                      </>
                    ) : (
                      <>
                        <i className="fas fa-envelope mr-1"></i>
                        Send Invite
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
                {/* Game rules summary */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Game Rules
          </h3>
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
              <i className="fas fa-snake text-red-500 mt-1 mr-2"></i>
              <span>Avoid the snakes that will slide you down.</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-trophy text-yellow-500 mt-1 mr-2"></i>
              <span>First player to reach square 100 wins!</span>
            </li>
          </ul>
        </div>

        {/* Chat placeholder */}
        {/* <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <i className="fas fa-comments mr-2"></i>
            Game Chat
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-center justify-center border border-gray-200">
            <p className="text-gray-500">Chat will be available when the game starts</p>
          </div>
        </div> */}
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
      {/* Add this input element where you need it */}
      <input 
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-4 py-2"
        placeholder="Enter something..."
      />
      {/* You can use the value anywhere in your component */}
      <p>Current input value: {inputValue}</p>
    </div>
  );
};

export default GameLobby;
