import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const InstructionCard: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  
  const useCases = [
    'Blog to LinkedIn',
    'Email to Tweet',
    'Report to WhatsApp',
    'Newsletter to Instagram',
    'Article to Thread'
  ];

  return (
    <div className={`rounded-2xl shadow-lg p-8 border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-semibold mb-3 transition-all duration-300 ${
          isDarkMode ? 'text-slate-100' : 'text-gray-900'
        }`}>How it works</h2>
        <div className="flex items-center justify-center space-x-8 text-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">1️⃣</span>
            <span className={`font-medium transition-all duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>Paste your content</span>
          </div>
          <div className={`hidden sm:block w-8 h-px transition-all duration-300 ${
            isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
          }`}></div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">2️⃣</span>
            <span className={`font-medium transition-all duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>Choose a platform</span>
          </div>
          <div className={`hidden sm:block w-8 h-px transition-all duration-300 ${
            isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
          }`}></div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">3️⃣</span>
            <span className={`font-medium transition-all duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>Copy formatted text</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {useCases.map((useCase, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border hover:shadow-md transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 border-slate-600' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border-indigo-100'
            }`}
          >
            {useCase}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InstructionCard;