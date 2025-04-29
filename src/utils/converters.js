import { morseCodeMap, reverseMorseCodeMap } from '../constants/converters';

// Morse code conversion functions
export const textToMorse = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (char === ' ') return '  '; // Two spaces for word separation
    return morseCodeMap[char] ? morseCodeMap[char] + ' ' : char;
  }).join('');
};

export const morseToText = (morse) => {
  return morse.split('  ').map(word => {
    return word.split(' ').map(char => {
      return reverseMorseCodeMap[char] || char;
    }).join('');
  }).join(' ');
};

// Binary conversion functions
export const textToBinary = (text) => {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
};

export const binaryToText = (binary) => {
  return binary.split(' ').map(bin => {
    try {
      return String.fromCharCode(parseInt(bin, 2));
    } catch (e) {
      return '';
    }
  }).join('');
};

// Base64 conversion functions
export const textToBase64 = (text) => {
  try {
    return btoa(text);
  } catch (e) {
    return 'Invalid input for Base64 encoding';
  }
};

export const base64ToText = (encoded) => {
  try {
    return atob(encoded);
  } catch (e) {
    return 'Invalid Base64 input';
  }
};

// Hex conversion functions
export const textToHex = (text) => {
  return Array.from(text).map(char => 
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join(' ');
};

export const hexToText = (hex) => {
  return hex.split(' ').map(h => {
    try {
      return String.fromCharCode(parseInt(h, 16));
    } catch (e) {
      return '';
    }
  }).join('');
};

// Get a converter object by type
export const getConverter = (type) => {
  const converters = {
    morse: {
      encode: textToMorse,
      decode: morseToText
    },
    binary: {
      encode: textToBinary,
      decode: binaryToText
    },
    base64: {
      encode: textToBase64,
      decode: base64ToText
    },
    hex: {
      encode: textToHex,
      decode: hexToText
    }
    // You can easily add more conversion types here
  };

  return converters[type] || null;
};