import React from 'react';

const Loader = () => {
  return (
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className="relative w-48 h-48 text-sm"
    >
      <div className="absolute rounded-full top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-gray-600 z-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-hamster z-10 w-28 h-14">
        <div className="relative w-full h-full">
          <div className="absolute bg-yellow-600 rounded-full top-0 left-0 w-[2.75em] h-[2.5em] transform origin-bottom animate-hamsterHead">
            <div className="absolute bg-red-300 rounded-full top-[-0.25em] right-[-0.25em] w-3 h-3 transform origin-bottom animate-hamsterEar"></div>
            <div className="absolute bg-black rounded-full top-[0.375em] left-[1.25em] w-2 h-2 animate-hamsterEye"></div>
            <div className="absolute bg-red-200 rounded-full top-[0.75em] left-0 w-1 h-1"></div>
          </div>
          <div className="absolute bg-yellow-300 rounded-full top-[0.25em] left-[2em] w-[4.5em] h-[3em] transform origin-[17%_50%] animate-hamsterBody">
            <div className="absolute bg-yellow-600 top-[2em] left-[0.5em] w-4 h-6 clip-limbFr transform origin-top animate-hamsterFRLimb"></div>
            <div className="absolute bg-yellow-400 top-[2em] left-[0.5em] w-4 h-6 clip-limbFl transform origin-top animate-hamsterFLLimb"></div>
            <div className="absolute bg-yellow-600 top-[1em] left-[2.8em] w-6 h-10 clip-limbBr transform origin-[50%_30%] animate-hamsterBRLimb"></div>
            <div className="absolute bg-yellow-400 top-[1em] left-[2.8em] w-6 h-10 clip-limbBl transform origin-[50%_30%] animate-hamsterBLLimb"></div>
            <div className="absolute bg-red-300 rounded-full top-[1.5em] right-[-0.5em] w-4 h-2 transform rotate-30 translate-z-[-1px] origin-[0.25em_0.25em] animate-hamsterTail"></div>
          </div>
        </div>
      </div>
      <div className="absolute rounded-full top-0 left-0 w-full h-full bg-gradient-radial from-gray-600 to-transparent animate-spoke z-0"></div>
    </div>
  );
};

export default Loader;
