// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const errors = {
      email: '',
      password: ''
    };
    let isValid = true;

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await api.post('/users/login', {
          email,
          password,
        });

        // Login successful - response.data now contains user, accessToken, and refreshToken
        login(response.data.accessToken, response.data.user);
        navigate('/home');
      } catch (err) {
        console.error('Login error:', err);
        if (err.status === 400) {
          setError('Invalid email or password');
        } else if (err.status === 401) {
          setError('Please login to access this resource');
        } else {
          setError(err.message || 'An error occurred. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
      {/* Floating Game Elements */}
      <div className="absolute top-1/4 left-1/4 animate-bounce-slow opacity-70">
        <i className="fas fa-dice-five text-5xl text-indigo-600"></i>
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-bounce-slow opacity-70" style={{ animationDelay: '1s' }}>
        <i className="fas fa-dice-three text-5xl text-purple-600"></i>
      </div>
      <div className="absolute top-1/3 right-1/3 animate-bounce-slow opacity-70" style={{ animationDelay: '1.5s' }}>
        <i className="fas fa-chess-pawn text-5xl text-emerald-500"></i>
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Colorful%2520snake%2520and%2520ladder%2520board%2520game%2520background%2520with%2520playful%2520dice%2520and%2520game%2520pieces%252C%2520vibrant%2520colors%2520with%2520purple%2520and%2520blue%2520gradient%252C%2520modern%2520digital%2520art%2520style%252C%2520game%2520board%2520pattern%252C%2520clean%2520and%2520minimalist%252C%2520perfect%2520for%2520a%2520game%2520app%2520background&width=1440&height=900&seq=1&orientation=landscape"
          alt="Snake and Ladder Background"
          className="w-full h-full object-cover object-top opacity-20"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <i className="fas fa-dice text-4xl text-indigo-600 mr-2"></i>
            <h1 className="text-3xl font-bold text-indigo-900" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Snake & Ladder Online
            </h1>
          </div>
        </div>
        {/* Login Form */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 transition-all duration-300">
          <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Log In to Play
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: '' });
                    }
                  }}
                  className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                  placeholder="your@email.com"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors({ ...validationErrors, password: '' });
                    }
                  }}
                  className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                    validationErrors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="!rounded-button whitespace-nowrap w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New player?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Register here
              </Link>
            </p>
          </div>
        </div>
        {/* Game Hint */}
        <div className="mt-8 text-center max-w-md">
          <p className="text-sm text-indigo-700">
            <i className="fas fa-info-circle mr-1"></i>
            Demo credentials: demo@example.com / password
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-4 text-center text-gray-600 text-sm relative z-10">
        <p>© {new Date().getFullYear()} Snake & Ladder Online. All rights reserved.</p>
      </footer>
      {/* Custom Animation Styles */}
      <style>{`
@keyframes bounce-slow {
0%, 100% {
transform: translateY(0);
}
50% {
transform: translateY(-20px);
}
}
.animate-bounce-slow {
animation: bounce-slow 3s infinite;
}
`}</style>
    </div>
  );
};

export default Login;
