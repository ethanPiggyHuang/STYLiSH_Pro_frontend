import { Container } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import styled, { createdGlobalStyle } from 'styled-components/macro';
import SideBar from './SideBar';
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 50%;
`;

export const ChatTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const UserList = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-right: 40px;
  width: 40%;
  flex: 1;
`;

export const UserListTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666;
`;

export const User = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  &.unread {
    background-color: #ffcccc;
  }
`;

export const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
export const MessageTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666;
`;

export const ActiveUser = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  margin-bottom: 10px;
`;

export const Messages = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Message = styled.li`
  margin-bottom: 10px;
  color: #333;
`;

export const UserId = styled.input`
  display: none;
`;

export const Input = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: #ccc;
  }
`;

export const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition &:hover {
    background-color: #444;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 20px;
  margin-right: 10px;
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #ccc;
  font-size: 24px;
`;

export const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const Success = styled.span`
  color: green;
  font-size: 14px;
  margin-top: 5px;
`;

export const Loader = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #333;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function MessageDashboard() {
  const socketRef = useRef();
  const userId = 'customer-support';
  const [messageInput, setMessageInput] = useState('');
  // const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(new Map());
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    socketRef.current = io('https://side-project2023.online/');
    socketRef.current.emit('register', userId);
    socketRef.current.on('chat message', (data) => {
      // console.log(data);
      const { message, sender, timestamp } = data;
      setUsers((prevUsers) => {
        const newUsers = new Map(prevUsers);
        if (!newUsers.has(sender)) {
          newUsers.set(sender, { messages: [], unread: false });
        }
        const userData = newUsers.get(sender);
        const newMessages = [
          ...userData.messages,
          { sender, message, timestamp },
        ];
        newUsers.set(sender, {
          messages: newMessages,
          unread: activeUser !== sender,
        });
        return newUsers;
      });
      // setMessages((prev) => [...prev, { sender, message, timestamp }]);
    });

    return () => {
      socketRef.current.off('chat message');
    };
  }, []);

  const handleUserClick = (userId) => {
    setActiveUser(userId);
    const userData = users.get(userId);
    userData.unread = false;
    const newUsers = new Map(users);
    newUsers.set(userId, userData);
    setUsers(newUsers);
    // setMessages(userData.messages);
  };

  const handleSendMessage = () => {
    const timestamp = new Date().toISOString();
    socketRef.current.emit('chat message', {
      id: activeUser,
      message: messageInput,
      timestamp,
    });
    setMessageInput('');

    if (activeUser) {
      const userData = users.get(activeUser);
      const newMessages = [
        ...userData.messages,
        {
          sender: 'customer-support',
          message: messageInput,
          timestamp,
        },
      ];
      const newUsers = new Map(users);
      newUsers.set(activeUser, { messages: newMessages, unread: false });
      setUsers(newUsers);
      // setMessages(newMessages);
    }
  };

  return (
    <Wrap>
      <SideBar />
      <Wrapper>
        <ChatTitle>客戶服務控制中心</ChatTitle>
        <UserId id="userId" type="text" value={userId} readOnly />
        <Wrap>
          <UserList>
            <UserListTitle>User List</UserListTitle>
            <ul>
              {Array.from(users).map(([userId, userData]) => (
                <User
                  key={userId}
                  className={userData.unread ? 'unread' : ''}
                  backgroundColor={userData.unread ? 'red' : 'white'}
                  onClick={() => handleUserClick(userId)}
                >
                  <Icon>{userData.unread ? '!' : userId.charAt(0)}</Icon>
                  {userId}
                </User>
              ))}
            </ul>
          </UserList>
          <ChatMessage>
            <MessageTitle>Chat</MessageTitle>
            <ActiveUser>
              {activeUser ? (
                <Messages>
                  {users
                    ?.get(activeUser)
                    ?.messages?.map(({ sender, message, timestamp }, i) => (
                      <Message key={i}>{`${sender} (${new Date(
                        timestamp
                      ).toLocaleTimeString()}): ${message}`}</Message>
                    ))}
                </Messages>
              ) : (
                <EmptyState>Select a user to start chatting</EmptyState>
              )}
            </ActiveUser>
            <Form
              onSubmit={(e) => {
                e.preventDefault(); // prevent page from refreshing
                handleSendMessage();
              }}
            >
              <Input
                id="message"
                type="text"
                placeholder="Type a message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </Form>
          </ChatMessage>
        </Wrap>
      </Wrapper>
    </Wrap>
  );
}

export default MessageDashboard;
