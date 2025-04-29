import React from 'react';
import TextConverter from '../components/TextConverter';

function HomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Text Code Converter</h1>
      
      <TextConverter initialType="morse" />
      
      {/* Instructions */}
      <div className="mt-6 text-gray-300 text-sm bg-black/20 p-4 rounded-lg">
        <p>
          <strong>How to use:</strong> Enter plain text on the left or encoded text on the right.
          The opposite side will update automatically. Select different encoding types from the dropdown menu.
        </p>
      </div>
    </div>
  );
}

export default HomePage;