import { ChatMessageInterface } from '@src/types/ChatMessageType';
import React from 'react';

const Message: React.FC<ChatMessageInterface> = ({ sender, text }) => {
  return (
    <div className="message-item">
      <p>
        <strong>{sender}:</strong> {text}
      </p>
    </div>
  );
};

export default Message;
