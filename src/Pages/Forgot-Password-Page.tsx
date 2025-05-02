// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const App: React.FC = () => {
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState({ type: '', text: '' });
const [validationError, setValidationError] = useState('');
const validateEmail = (email: string) => {
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
};
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
setValidationError('');
setMessage({ type: '', text: '' });
if (!email.trim()) {
setValidationError('Please enter your email address');
return;
}
if (!validateEmail(email)) {
setValidationError('Please enter a valid email address');
return;
}
setIsLoading(true);
// Simulate API call for password reset
setTimeout(() => {
setIsLoading(false);
setMessage({
type: 'success',
text: 'Password reset link has been sent to your email address. Please check your inbox.'
});
setEmail('');
}, 1500);
};
return (
<div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
{/* Background Image */}
<div className="absolute inset-0 z-0 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=Colorful%2520snake%2520and%2520ladder%2520board%2520game%2520pattern%2520with%2520soft%2520focus%2520background%252C%2520playful%2520dice%2520scattered%2520around%252C%2520vibrant%2520purple%2520and%2520blue%2520gradient%2520lighting%252C%2520modern%2520digital%2520art%2520style%252C%2520clean%2520and%2520minimalist%2520design%252C%2520perfect%2520for%2520a%2520password%2520reset%2520page%2520background&width=1440&height=900&seq=3&orientation=landscape"
alt="Snake and Ladder Background"
className="w-full h-full object-cover object-top opacity-20"
/>
</div>
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
<div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
{/* Logo */}
<div className="mb-8 text-center">
<div className="flex items-center justify-center">
<i className="fas fa-dice text-4xl text-indigo-600 mr-2"></i>
<h1 className="text-3xl font-bold text-indigo-900" style={{fontFamily: "'Quicksand', sans-serif"}}>
Snake & Ladder Online
</h1>
</div>
</div>
{/* Reset Password Form */}
<div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 transition-all duration-300">
<h2 className="text-2xl font-bold text-center text-indigo-900 mb-2" style={{fontFamily: "'Quicksand', sans-serif"}}>
Reset Password
</h2>
<p className="text-center text-gray-600 mb-6">
Enter your email address and we'll send you a link to reset your password
</p>
{message.type && (
<div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
<p className="flex items-center">
<i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
{message.text}
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
if (validationError) {
setValidationError('');
}
}}
className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
validationError ? 'border-red-500' : 'border-gray-300'
} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
placeholder="your@email.com"
/>
</div>
{validationError && (
<p className="mt-1 text-sm text-red-600">
{validationError}
</p>
)}
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
Sending Reset Link...
</>
) : (
'Send Reset Link'
)}
</button>
</div>
</form>
<div className="mt-6 text-center">
<p className="text-sm text-gray-600">
Remember your password?{' '}
<Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
Back to Login
</Link>
</p>
</div>
</div>
{/* Game Hint */}
<div className="mt-8 text-center max-w-md">
<p className="text-sm text-indigo-700">
<i className="fas fa-dice-d6 mr-1"></i>
Need help? Contact support@snakeladder.game
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
export default App
