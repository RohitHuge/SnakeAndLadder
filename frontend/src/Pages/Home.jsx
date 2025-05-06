// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    avatarUrl: '',
    gamesPlayed: 0,
    gamesWon: 0,
    status: 'offline'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/current-user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const { data: userData } = await response.json();
        setUser(userData);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateGame = async () => {
    navigate('/game-lobby', {
      state: {
        isHost: true,
        user : user
      }
    });
  }

  const handleJoinGame = async () => {
    navigate('/game-lobby',
       {
      state: {
        isHost: false,
        user : user,
        roomCode : roomCode
      }
    }
    );
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 opacity-20 animate-bounce duration-3000">
        <i className="fas fa-dice-five text-purple-300 text-6xl"></i>
      </div>
      <div className="absolute bottom-40 right-20 opacity-20 animate-bounce duration-2000 delay-1000">
        <i className="fas fa-dice-two text-purple-300 text-6xl"></i>
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10">
        <i className="fas fa-chess-board text-purple-200 text-8xl"></i>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with logo and user info */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="text-3xl font-bold text-purple-700 flex items-center">
              <i className="fas fa-dice text-purple-600 mr-3"></i>
              <h1>Snake & Ladder Online</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <img 
                src={user.avatarUrl || 'https://readdy.ai/api/search-image?query=cute%20cartoon%20game%20character%20avatar%20with%20purple%20background%2C%20digital%20art%2C%20friendly%20face%2C%20game%20icon%20style%2C%20minimalist%20design%2C%20clean%20background%2C%20high%20quality&width=80&height=80&seq=avatar123&orientation=squarish'} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-purple-400"
              />
              <span className="ml-3 font-medium text-purple-800">{user.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap flex items-center"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </header>

        {/* Main content */}
        <main>
          {/* Welcome message */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-purple-800 mb-2">Welcome back, {user.username.toUpperCase()}!</h2>
            <p className="text-gray-600">What would you like to do today?</p>
          </div>

          {/* Game actions grid */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {/* Primary actions row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create Game - Primary action */}
              <div className="col-span-1">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-full border-2 border-purple-500 cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-plus text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">Create Game</h3>
                    <p className="text-gray-600">Start a new game and invite friends to join</p>
                    <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap" onClick={handleCreateGame}>
                      Create Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Join Game - Primary action */}
              <div className="col-span-1">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-full border-2 border-purple-500 cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-door-open text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">Join Game</h3>
                    <p className="text-gray-600">Enter a game code to join an existing game</p>
                    <div className="mt-6 flex w-full max-w-xs">
                      <input 
                        onChange={(e) => setRoomCode(e.target.value)}
                        type="text" 
                        placeholder="Enter game code" 
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors cursor-pointer whitespace-nowrap" onClick={handleJoinGame}>
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary actions row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Friends */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-user-friends text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Friends</h3>
                  <p className="text-gray-600 text-sm">Manage friends and invitations</p>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-cog text-yellow-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Settings</h3>
                  <p className="text-gray-600 text-sm">Customize your game preferences</p>
                </div>
              </div>

              {/* History */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-history text-red-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">History</h3>
                  <p className="text-gray-600 text-sm">View your past games and stats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Games Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
              <i className="fas fa-clock mr-2"></i>
              Recent Games
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-700 rounded-tl-lg">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-700">Players</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-700">Result</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-700 rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-purple-50">
                    <td className="py-3 px-4 text-sm text-gray-700">May 4, 2025</td>
                    <td className="py-3 px-4 text-sm text-gray-700">You, JohnDoe, GameMaster</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Victory</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="text-purple-600 hover:text-purple-800 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-eye mr-1"></i> View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="py-3 px-4 text-sm text-gray-700">May 3, 2025</td>
                    <td className="py-3 px-4 text-sm text-gray-700">You, AlexGamer</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Defeat</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="text-purple-600 hover:text-purple-800 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-eye mr-1"></i> View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="py-3 px-4 text-sm text-gray-700">May 1, 2025</td>
                    <td className="py-3 px-4 text-sm text-gray-700">You, GamePro, FunPlayer</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Victory</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="text-purple-600 hover:text-purple-800 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-eye mr-1"></i> View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                View All History <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </main>

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
    </div>
  );
};

export default Home;
