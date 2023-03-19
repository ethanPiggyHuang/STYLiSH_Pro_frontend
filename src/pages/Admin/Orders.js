import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createdGlobalStyle } from 'styled-components/macro';
import ChatComponet from '../Home/Chat';
import chatIcon from './chat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {
  faExpand,
  faCompress,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0 49px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const Rank = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  width: 80vw;
  flex-direction: column;
  height: 100vh;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const Split = styled.div`
  border-top: 2px solid orange;
  width: 100%;
  height: 2px;
`;

const Title = styled.div`
  height: 30px;
  font-weight: bold;
  font-size: 25px;
`;

const RankTitle = styled.div`
  height: 30px;
  margin-bottom: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  justify-items: center;
`;

const Header = styled(GridContainer)`
  background-color: #f1f1f1;
  font-weight: bold;
  padding: 22px 30px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(GridContainer)`
  border-bottom: 1px solid #ccc;
  padding: 22px 30px;
`;

const Label = styled.label`
  grid-column: ${(props) => props.column};
`;

const ItemRank = styled.span`
  grid-column: 1;
`;

const ItemName = styled.span`
  grid-column: 2;
`;

const ItemID = styled.span`
  grid-column: 3;
`;

const ItemAmount = styled.span`
  grid-column: 4;
`;

const ItemTotal = styled.span`
  grid-column: 5;
`;

const ItemState = styled.span`
  grid-column: 6;
  color: ${(props) =>
    props.status === 'up' ? 'green' : props.status === 'down' ? 'red' : 'gray'};
`;

const PromoteBtn = styled.button`
  grid-column: 7;
  border: none;
  background-color: #fd6d6d;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8d8d;
  }
`;

const Discount = styled.select`
  grid-column: 8;
  width: 80px;
  height: 30px;
  border: none;
  background-color: #f4f4f4;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const FixedImage = styled.img`
  position: fixed;
  bottom: 60px;
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
  position: fixed;
  bottom: 90px;
  left: 80px;
  width: 350px;
  height: 300px;
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

function Order() {
  const [itemState, setItemState] = useState('UP');
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleChatboxToggle = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper>
      <Rank>
        <RankTitle>
          <Title>| 暢銷排名</Title>
          <Split></Split>
        </RankTitle>
        <ChatComponet />
      </Rank>
    </Wrapper>
  );
}

export default Order;
