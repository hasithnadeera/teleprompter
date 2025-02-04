'use client';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

// Define the initial state constant for script sections
const initialScriptState = {
  hook: '',
  openingImage: '',
  setup: '',
  catalyst: '',
  debate: '',
  breakIntoAct2: '',
  funAndGames: '',
  allIsLost: '',
  transformation: '',
  finalImage: '',
  callToAction: ''
};

export default function ScriptPage() {
  const [scriptElements, setScriptElements] = useState(initialScriptState);
  const [isDone, setIsDone] = useState(false);
  const socketRef = useRef(null);
  const router = useRouter();

  // On component mount, initialize socket connection
  useEffect(() => {
    // Initialize socket connection
    fetch("/api/socket").then(() => {
      socketRef.current = io({
        path: "/api/socketio",
      });
      
      console.log("Socket connected:", socketRef.current.id);

      // Load stored script if available
      const storedScript = localStorage.getItem('scriptElements');
      const storedIsDone = localStorage.getItem('isDone');
      
      if (storedScript) {
        try {
          setScriptElements(JSON.parse(storedScript));
        } catch (error) {
          console.error('Error parsing stored script elements:', error);
          localStorage.removeItem('scriptElements');
        }
      }
      
      if (storedIsDone === 'true') {
        setIsDone(true);
      }
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Allow input changes only if the script is not done
  const handleInputChange = (field, value) => {
    if (isDone) return; // prevent changes if done
    setScriptElements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // When the Push button is clicked for a section
  const handlePush = (field) => {
    if (!socketRef.current) return;
    
    // Emit the script content through socket
    socketRef.current.emit('pushScript', {
      field,
      content: scriptElements[field]
    });

    // Show feedback that content was pushed
    const button = document.querySelector(`button[data-field="${field}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Pushed!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    }
  };

  // Clear all fields, remove stored script, and enable editing
  const handleClear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scriptElements');
      localStorage.removeItem('isDone');
    }
    setScriptElements(initialScriptState);
    setIsDone(false);
  };

  // Lock the script so that fields cannot be edited and store it
  const handleDone = () => {
    console.log('Final script elements:', scriptElements);
    setIsDone(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('scriptElements', JSON.stringify(scriptElements));
      localStorage.setItem('isDone', 'true');
    }
  };

  return (
    <div
      className="p-4 sm:p-8 max-w-4xl mx-auto min-h-screen"
      style={{ fontFamily: 'Helvetica, sans-serif' }}
    >
      <h1
        className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8"
        style={{ color: '#241440' }}
      >
        Script
      </h1>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8">
        {Object.entries(scriptElements).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4"
          >
            {/* Display the section name */}
            <label
              className="w-full sm:w-32 text-base sm:text-sm font-medium"
              style={{ color: '#241440' }}
            >
              {key
                .replace(/([A-Z])/g, ' $1')
                .toLowerCase()
                .replace(/^\w/, c => c.toUpperCase())}
            </label>
            <div className="flex w-full gap-2 items-center">
              {/* Input for the section */}
              <input
                type="text"
                value={value}
                disabled={isDone}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="flex-1 p-2 border rounded-lg text-base"
                style={{
                  borderColor: '#241440',
                  color: isDone ? 'grey' : '#241440'
                }}
              />
              {/* Push button for the section */}
              <button
                data-field={key}
                onClick={() => handlePush(key)}
                className="px-6 py-2 rounded-lg text-white text-base w-auto"
                style={{ backgroundColor: '#241440' }}
              >
                Push
              </button>
            </div>
          </div>
        ))}

        {/* Clear and Done buttons in a single row */}
        <div className="flex justify-between mt-6 w-full">
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow text-base"
          >
            Clear
          </button>
          <button
            onClick={handleDone}
            className="px-6 py-2 rounded-lg text-white text-base"
            style={{ backgroundColor: '#241440' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
