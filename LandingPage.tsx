// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from 'react';
const App: React.FC = () => {
return (
<div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
{/* Hero Section */}
<div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
{/* Background Image */}
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=Colorful%20snake%20and%20ladder%20board%20game%20background%20with%20playful%20dice%20and%20game%20pieces%2C%20vibrant%20colors%20with%20purple%20and%20blue%20gradient%2C%20modern%20digital%20art%20style%2C%20game%20board%20pattern%2C%20clean%20and%20minimalist%2C%20perfect%20for%20a%20game%20app%20background&width=1440&height=900&seq=1&orientation=landscape"
alt="Snake and Ladder Background"
className="w-full h-full object-cover object-top opacity-30"
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
{/* Content Container */}
<div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
<div className="max-w-3xl">
<h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-900 leading-tight">
Play Snake & Ladder Online!
</h1>
<p className="text-xl md:text-2xl mb-10 text-indigo-700 font-['Quicksand']" style={{fontFamily: "'Quicksand', sans-serif"}}>
Challenge friends in real-time multiplayer matches and climb your way to victory!
</p>
<div className="flex flex-col items-center space-y-4">
<a
href="https://readdy.ai/home/b5a91de3-2610-4529-909a-6192c2cca62c/710e9074-0bac-4a86-8bf4-8386167a9017"
data-readdy="true"
className="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 text-lg md:text-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
>
Play Now
</a>
<a
href="https://readdy.ai/home/b5a91de3-2610-4529-909a-6192c2cca62c/653a5875-379f-4bca-b141-d079e9f1ed7a"
data-readdy="true"
className="!rounded-button whitespace-nowrap text-indigo-700 hover:text-indigo-900 font-medium py-2 px-6 transition-all duration-300 underline underline-offset-4 cursor-pointer"
>
New Player? Register Here
</a>
</div>
<div className="mt-16 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl">
<h2 className="text-2xl font-bold text-indigo-800 mb-4">Game Features</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="flex flex-col items-center">
<div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
<i className="fas fa-users text-2xl text-purple-600"></i>
</div>
<h3 className="font-bold text-lg text-gray-800">Multiplayer</h3>
<p className="text-gray-600">Play with friends or random opponents</p>
</div>
<div className="flex flex-col items-center">
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
<i className="fas fa-trophy text-2xl text-indigo-600"></i>
</div>
<h3 className="font-bold text-lg text-gray-800">Leaderboards</h3>
<p className="text-gray-600">Compete for the top positions</p>
</div>
<div className="flex flex-col items-center">
<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
<i className="fas fa-dice text-2xl text-emerald-600"></i>
</div>
<h3 className="font-bold text-lg text-gray-800">Custom Boards</h3>
<p className="text-gray-600">Play on various themed boards</p>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Testimonials Section */}
<div className="bg-gradient-to-r from-indigo-100 to-purple-100 py-16">
<div className="container mx-auto px-6 md:px-12">
<h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">What Players Say</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white p-6 rounded-xl shadow-md">
<div className="flex items-center mb-4">
<div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
<i className="fas fa-user text-indigo-600"></i>
</div>
<div className="ml-4">
<h3 className="font-bold text-gray-800">Sarah K.</h3>
<div className="text-yellow-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
</div>
</div>
<p className="text-gray-600">"The most fun I've had playing an online board game! The animations are smooth and the multiplayer works flawlessly."</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-md">
<div className="flex items-center mb-4">
<div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
<i className="fas fa-user text-purple-600"></i>
</div>
<div className="ml-4">
<h3 className="font-bold text-gray-800">Michael T.</h3>
<div className="text-yellow-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star-half-alt"></i>
</div>
</div>
</div>
<p className="text-gray-600">"I play with my kids who live across the country. It's become our weekly tradition and we love the custom boards!"</p>
</div>
<div className="bg-white p-6 rounded-xl shadow-md">
<div className="flex items-center mb-4">
<div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
<i className="fas fa-user text-emerald-600"></i>
</div>
<div className="ml-4">
<h3 className="font-bold text-gray-800">James L.</h3>
<div className="text-yellow-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
</div>
</div>
<p className="text-gray-600">"The leaderboard feature keeps me coming back. I'm determined to reach the top spot. Highly addictive and fun!"</p>
</div>
</div>
</div>
</div>
{/* How to Play Section */}
<div className="py-16 bg-white">
<div className="container mx-auto px-6 md:px-12">
<h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">How to Play</h2>
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
<span className="text-2xl font-bold text-indigo-600">1</span>
</div>
<h3 className="font-bold text-lg text-gray-800 mb-2">Create Account</h3>
<p className="text-gray-600">Register and set up your player profile</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
<span className="text-2xl font-bold text-indigo-600">2</span>
</div>
<h3 className="font-bold text-lg text-gray-800 mb-2">Join a Game</h3>
<p className="text-gray-600">Create a new game or join an existing one</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
<span className="text-2xl font-bold text-indigo-600">3</span>
</div>
<h3 className="font-bold text-lg text-gray-800 mb-2">Roll the Dice</h3>
<p className="text-gray-600">Take turns rolling and moving your piece</p>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
<span className="text-2xl font-bold text-indigo-600">4</span>
</div>
<h3 className="font-bold text-lg text-gray-800 mb-2">Win the Game</h3>
<p className="text-gray-600">Be the first to reach the final square</p>
</div>
</div>
<div className="mt-16 text-center">
<a
href="https://readdy.ai/home/b5a91de3-2610-4529-909a-6192c2cca62c/710e9074-0bac-4a86-8bf4-8386167a9017"
data-readdy="true"
className="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 text-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
>
Start Playing Now
</a>
</div>
</div>
</div>
{/* Footer */}
<footer className="bg-indigo-900 text-white py-8">
<div className="container mx-auto px-6 md:px-12">
<div className="flex flex-col md:flex-row justify-between items-center">
<div className="mb-6 md:mb-0">
<div className="flex items-center">
<i className="fas fa-dice text-2xl text-indigo-300 mr-2"></i>
<span className="text-xl font-bold">Snake & Ladder Online</span>
</div>
</div>
<div className="text-indigo-200 text-sm">
© {new Date().getFullYear()} Snake & Ladder Online. All rights reserved.
</div>
</div>
</div>
</footer>
{/* Custom Animation Styles */}
<style jsx>{`
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
}
export default App
