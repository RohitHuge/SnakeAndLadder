// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);  // Remove TypeScript syntax
  const [avatarPreview, setAvatarPreview] = useState('');  // Remove TypeScript syntax
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);  // Remove TypeScript syntax
  const navigate = useNavigate();  // Fix naming convention
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
const handleAvatarChange = (e) => {
if (e.target.files && e.target.files[0]) {
const file = e.target.files[0];
setAvatar(file);
const reader = new FileReader();
reader.onloadend = () => {
setAvatarPreview(reader.result);
};
reader.readAsDataURL(file);
}
};
const triggerFileInput = () => {
if (fileInputRef.current) {
fileInputRef.current.click();
}
};
const validateForm = () => {
const errors = {
username: '',
email: '',
password: '',
confirmPassword: ''
};
let isValid = true;
if (!username.trim()) {
errors.username = 'Username is required';
isValid = false;
}
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
} else if (password.length < 6) {
errors.password = 'Password must be at least 6 characters';
isValid = false;
}
if (!confirmPassword) {
errors.confirmPassword = 'Please confirm your password';
isValid = false;
} else if (password !== confirmPassword) {
errors.confirmPassword = 'Passwords do not match';
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
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        body:formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // Registration successful
      setIsLoading(false);
      setError('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
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
<div className="absolute bottom-1/3 right-1/4 animate-bounce-slow opacity-70" style={{animationDelay: '1s'}}>
<i className="fas fa-dice-three text-5xl text-purple-600"></i>
</div>
<div className="absolute top-1/3 right-1/3 animate-bounce-slow opacity-70" style={{animationDelay: '1.5s'}}>
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
<div className="mb-6 text-center">
<div className="flex items-center justify-center">
<i className="fas fa-dice text-4xl text-indigo-600 mr-2"></i>
<h1 className="text-3xl font-bold text-indigo-900" style={{fontFamily: "'Quicksand', sans-serif"}}>
Snake & Ladder Online
</h1>
</div>
<h2 className="mt-2 text-xl text-indigo-700" style={{fontFamily: "'Quicksand', sans-serif"}}>
Create Your Account
</h2>
</div>
{/* Registration Form */}
<div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 transition-all duration-300">
{error && (
  <div className={`mb-4 p-3 rounded-lg flex items-center ${
    error.includes('successful') 
      ? 'bg-green-100 border border-green-400 text-green-700'
      : 'bg-red-100 border border-red-400 text-red-700'
  }`}>
    <i className={`mr-2 fas ${
      error.includes('successful') 
        ? 'fa-check-circle'
        : 'fa-exclamation-circle'
    }`}></i>
    {error}
  </div>
)}
<form onSubmit={handleSubmit} className="space-y-5">
{/* Username Field */}
<div>
<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
Username
</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<i className="fas fa-user text-gray-400"></i>
</div>
<input
id="username"
name="username"
type="text"
autoComplete="username"
value={username}
onChange={(e) => {
setUsername(e.target.value);
if (validationErrors.username) {
setValidationErrors({...validationErrors, username: ''});
}
}}
className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
validationErrors.username ? 'border-red-500' : 'border-gray-300'
} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
placeholder="Choose a username"
/>
</div>
{validationErrors.username && (
<p className="mt-1 text-sm text-red-600">
{validationErrors.username}
</p>
)}
</div>
{/* Email Field */}
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
setValidationErrors({...validationErrors, email: ''});
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
{/* Password Field */}
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
autoComplete="new-password"
value={password}
onChange={(e) => {
setPassword(e.target.value);
if (validationErrors.password) {
setValidationErrors({...validationErrors, password: ''});
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
{/* Confirm Password Field */}
<div>
<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
Confirm Password
</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<i className="fas fa-lock text-gray-400"></i>
</div>
<input
id="confirmPassword"
name="confirmPassword"
type={showConfirmPassword ? "text" : "password"}
autoComplete="new-password"
value={confirmPassword}
onChange={(e) => {
setConfirmPassword(e.target.value);
if (validationErrors.confirmPassword) {
setValidationErrors({...validationErrors, confirmPassword: ''});
}
}}
className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
placeholder="••••••••"
/>
<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
<button
type="button"
onClick={() => setShowConfirmPassword(!showConfirmPassword)}
className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
>
<i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</button>
</div>
</div>
{validationErrors.confirmPassword && (
<p className="mt-1 text-sm text-red-600">
{validationErrors.confirmPassword}
</p>
)}
</div>
{/* Avatar Upload */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Avatar <span className="text-gray-500 text-xs">(optional)</span>
</label>
<div className="flex items-center space-x-5">
<div className="flex-shrink-0">
<div className={`h-20 w-20 rounded-full border-2 border-dashed ${avatarPreview ? 'border-indigo-300' : 'border-gray-300'} flex items-center justify-center overflow-hidden bg-gray-100`}>
{avatarPreview ? (
<img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
) : (
<i className="fas fa-user text-3xl text-gray-400"></i>
)}
</div>
</div>
<div>
<input
type="file"
ref={fileInputRef}
onChange={handleAvatarChange}
accept="image/*"
className="hidden"
/>
<button
type="button"
onClick={triggerFileInput}
className="!rounded-button whitespace-nowrap inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
>
<i className="fas fa-upload mr-2"></i>
{avatar ? 'Change Avatar' : 'Upload Avatar'}
</button>
{avatar && (
<p className="mt-1 text-xs text-gray-500">
{avatar.name}
</p>
)}
</div>
</div>
</div>
{/* Register Button */}
<div className="pt-2">
<button
type="submit"
disabled={isLoading}
className="!rounded-button whitespace-nowrap w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 cursor-pointer"
>
{isLoading ? (
<>
<i className="fas fa-spinner fa-spin mr-2"></i>
Creating Account...
</>
) : (
'Register'
)}
</button>
</div>
</form>
<div className="mt-6 text-center">
<p className="text-sm text-gray-600">
Already have an account?{' '}
<Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
Log in here
</Link>
</p>
</div>
</div>
{/* Game Hint */}
<div className="mt-6 text-center max-w-md">
<p className="text-sm text-indigo-700">
<i className="fas fa-dice-d6 mr-1"></i>
Join thousands of players in the ultimate Snake & Ladder experience!
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
// Remove the extra App component closure

export default Registration;
