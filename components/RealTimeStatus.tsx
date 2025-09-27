"use client";

import { useState, useEffect } from "react";

interface RealTimeStatusProps {
  isConnected: boolean;
  isSpeaking: boolean;
  callStatus: string;
}

const RealTimeStatus = ({ isConnected, isSpeaking, callStatus }: RealTimeStatusProps) => {
  const [connectionTime, setConnectionTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected && callStatus === "ACTIVE") {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {callStatus === "ACTIVE" && (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm">
            {isSpeaking ? 'AI Speaking...' : 'Listening'}
          </span>
        </div>
      )}
      
      {callStatus === "ACTIVE" && (
        <div className="text-sm font-mono">
          {formatTime(connectionTime)}
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        Status: {callStatus}
      </div>
    </div>
  );
};

export default RealTimeStatus;