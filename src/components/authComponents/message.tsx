import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface WebPushMessageProps {
  msg: string;
  type: 'success' | 'error' | 'info';
}

const WebPushMessage: React.FC<WebPushMessageProps> = ({ msg, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  let bgColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  if (!visible) return null;

  return (
    <div className={`message-anime fixed bottom-4 left-4 p-4 rounded-full shadow-lg text-white ${bgColor} flex items-center z-[1000]`}>
      <span className="flex-grow">{msg}</span>
      <button onClick={() => setVisible(false)} className="ml-4">
        <FaTimes />
      </button>
    </div>
  );
};

export default WebPushMessage;

