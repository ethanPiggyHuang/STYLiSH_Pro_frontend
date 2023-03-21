import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { io } from 'socket.io-client';
import styled, { createdGlobalStyle } from 'styled-components/macro';
import chatIcon from './chat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {
  faExpand,
  faCompress,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const FixedImage = styled.img`
  position: fixed;
  bottom: 120px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-left: 0px;
  border-radius: 50%;
  background-color: #f2f2f2;
`;

const AdminImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-left: 0px;
  border-radius: 50%;
  background-color: #f2f2f2;
  align-self: flex-end;
`;

const Chat = styled.div`
  z-index: 2;
  position: fixed;
  bottom: 120px;
  left: 100px;
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0)' : 'translateX(100%)'};
  width: ${({ isExpanded }) => (isExpanded ? '70%' : '300px')};
  height: ${({ isExpanded }) => (isExpanded ? '500px' : '250px')};
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #828282;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? '#4CAF50' : '#ccc')};
`;

const ChatMessages = styled.div`
  padding: 30px;
  height: calc(100% - 100px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
`;

const ChatInput = styled.input`
  width: 100%;
  margin-bottom: 5px;
  padding: 10px;
  align-self: flex-end;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const ExpandIcon = styled(FontAwesomeIcon)``;
const CustomerMessage = styled.div`
  width: 150px;
  height: 50px;
  background-color: #bcaaa4;
  border-radius: 10px; /* Set the radius to your desired value */
  padding: 10px; /* Set the padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a shadow */
  align-self: flex-start;
`;

const Reply = styled.div`
  width: 150px;
  height: 50px;
  background-color: #8d6e63;
  border-radius: 10px; /* Set the radius to your desired value */
  padding: 10px; /* Set the padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a shadow */
  align-self: flex-end;
`;
const SendButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #828282;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 5px;
`;

const UnreadMessageIndicator = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #f44336;
  border-radius: 50%;
  bottom: 160px;
  left: 60px;
`;

const ChatIconWrap = styled.div``;

export const Socket = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isSupportOnline, setIsSupportOnline] = useState(false);
  const socketRef = useRef();
  const [itemState, setItemState] = useState('UP');
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    socketRef.current = io('https://side-project2023.online/');
    // socketRef.current = io("http://localhost:4000/");

    socketRef.current.on('chat message', (data) => {
      const { message, sender, timestamp } = data;
      setHasUnreadMessages(true);
      console.log(hasUnreadMessages);
      const formattedTime = timestamp.toLocaleString('en-US');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          sender,
          time: formattedTime,
        },
      ]);
    });

    socketRef.current.on('support-status', (isOnline) => {
      setIsSupportOnline(isOnline);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      socketRef.current.emit('check-support-status');
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    socketRef.current.emit('register', e.target.value);
  };

  const handleSendMessage = () => {
    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleString('en-US');
    console.log(formattedTime); // Outputs: Mon 02:47 AM GMTs
    if (userId === 'customer-support') {
      const recipientId = prompt('Enter the user ID to reply:');
      setHasUnreadMessages(true);
      console.log(hasUnreadMessages);
      socketRef.current.emit('chat message', {
        id: recipientId,
        message,
        formattedTime,
      });
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          sender: 'Me',
          time: formattedTime,
        },
      ]);

      socketRef.current.emit('chat message', { message });
    }

    setMessage('');
  };

  const handleChatboxToggle = () => {
    setIsChatboxVisible(!isChatboxVisible);
    if (isChatboxVisible) {
      setHasUnreadMessages(false);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  //   useEffect(() => {
  //     if (isExpanded) {
  //       setUnreadMessages(0);
  //     }
  //   }, [isExpanded]);

  return (
    <div>
      <ChatIconWrap>
        <FixedImage
          src={chatIcon}
          alt="Chat Icon"
          onClick={handleChatboxToggle}
        />
        <UnreadMessageIndicator
          style={{
            backgroundColor:
              hasUnreadMessages && !isChatboxVisible ? 'red' : 'transparent',
          }}
        ></UnreadMessageIndicator>
      </ChatIconWrap>
      <Chat isVisible={isChatboxVisible} isExpanded={isExpanded}>
        <ChatHeader onClick={toggleExpand}>
          <StatusIndicator
            id="support-status-light"
            isSupportOnline={true}
            style={{
              backgroundColor: isSupportOnline ? 'green' : 'red',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
            }}
          />
          {isSupportOnline ? '客服在線上' : '客服下班嘍'}
          <ExpandIcon icon={isExpanded ? faCompress : faExpand} />
        </ChatHeader>

        <ChatMessages>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Enter user ID"
          />

          {messages.map((msg, index) => {
            console.log('msg sender: ' + msg.sender);
            if (msg.sender === 'Me') {
              console.log('me');
              return (
                <>
                  <UserImage></UserImage>
                  <CustomerMessage key={index}>{msg.text}</CustomerMessage>
                </>
              );
            } else if (msg.sender === 'customer-support') {
              console.log('customer-support');
              return (
                <>
                  <AdminImage></AdminImage>
                  <Reply key={index}>{msg.text}</Reply>
                </>
              );
            }
          })}

          <ChatInputContainer>
            <ChatInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
            <SendButton>
              <FontAwesomeIcon
                onClick={handleSendMessage}
                icon={faPaperPlane}
              />
            </SendButton>
          </ChatInputContainer>
        </ChatMessages>
      </Chat>
    </div>
  );
};
export default Socket;
