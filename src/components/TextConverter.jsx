import React, { useState, useRef, useEffect } from 'react';
import { getConverter } from '../utils/converters';
import { converterTypes } from '../constants/converters';

function TextConverter({ initialType = 'morse' }) {
  const [textInput, setTextInput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [conversionType, setConversionType] = useState(initialType);
  const [lastEdited, setLastEdited] = useState(null);
  
  const textInputRef = useRef(null);
  const codeOutputRef = useRef(null);

  // Effect to handle conversions when inputs or conversion type changes
  useEffect(() => {
    const converter = getConverter(conversionType);
    
    if (!converter) return;
    
    if (lastEdited === 'text' && textInput !== '') {
      setCodeOutput(converter.encode(textInput));
    } else if (lastEdited === 'code' && codeOutput !== '') {
      setTextInput(converter.decode(codeOutput));
    }
  }, [textInput, codeOutput, conversionType, lastEdited]);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    setLastEdited('text');
  };

  const handleCodeChange = (e) => {
    setCodeOutput(e.target.value);
    setLastEdited('code');
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setConversionType(newType);
    
    // Re-convert existing content when changing conversion type
    const converter = getConverter(newType);
    if (!converter) return;
    
    if (textInput && lastEdited === 'text') {
      setCodeOutput(converter.encode(textInput));
    } else if (codeOutput && lastEdited === 'code') {
      setTextInput(converter.decode(codeOutput));
    }
  };

  const copyToClipboard = async (text, side) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${side} text copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearText = () => {
    setTextInput('');
    setCodeOutput('');
    textInputRef.current.focus();
  };

  return (
    <div className="w-full">
      {/* Conversion Type Selector */}
      <div className="mb-6">
        <select
          className="w-full md:w-auto bg-slate-800 text-white border border-emerald-500 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={conversionType}
          onChange={handleTypeChange}
        >
          {Object.entries(converterTypes).map(([key, name]) => (
            <option key={key} value={key}>
              Text ↔ {name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Text fields container */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Left text field (always plain text) */}
        <div className="flex-1 bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-medium">Plain Text</h2>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(textInput, 'Text')}
                className="text-emerald-400 hover:text-emerald-300 p-1"
                disabled={!textInput}
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
              <button
                onClick={clearText}
                className="text-gray-400 hover:text-gray-300 p-1"
                disabled={!textInput && !codeOutput}
                title="Clear both"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.143A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.857L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <textarea
            ref={textInputRef}
            className="w-full h-64 bg-slate-900 text-white rounded-md p-3 border border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Enter text here..."
          />
        </div>
        
        {/* Right text field (always code output) */}
        <div className="flex-1 bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-medium">{converterTypes[conversionType] || 'Code'}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(codeOutput, 'Code')}
                className="text-emerald-400 hover:text-emerald-300 p-1"
                disabled={!codeOutput}
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
          <textarea
            ref={codeOutputRef}
            className="w-full h-64 bg-slate-900 text-white rounded-md p-3 border border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            value={codeOutput}
            onChange={handleCodeChange}
            placeholder={`Enter ${converterTypes[conversionType] || 'code'} here...`}
          />
        </div>
      </div>
    </div>
  );
}

export default TextConverter;