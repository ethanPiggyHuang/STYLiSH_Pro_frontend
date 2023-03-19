import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import StarRating from './Star';
import api from '../../utils/api';
import chatIcon from './chat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 0 46px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 15px 21px 6px;
  }
`;

const Product = styled(Link)`
  width: calc((100% - 120px) / 3);
  margin: 0 20px 50px;
  flex-shrink: 0;
  text-decoration: none;

  @media screen and (max-width: 1279px) {
    width: calc((100% - 12px) / 2);
    margin: 0 3px 24px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  vertical-align: middle;
`;

const ProductColors = styled.div`
  margin-top: 20px;
  display: flex;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
  }
`;

const ProductColor = styled.div`
  width: 24px;
  height: 24px;
  box-shadow: 0px 0px 1px #bbbbbb;
  background-color: ${(props) => props.$colorCode};

  @media screen and (max-width: 1279px) {
    width: 12px;
    height: 12px;
  }

  & + & {
    margin-left: 10px;

    @media screen and (max-width: 1279px) {
      margin-left: 6px;
    }
  }
`;

const ProductTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

const ProductPrice = styled.div`
  margin-top: 10px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;
  margin-bottom: 10px;
  @media screen and (max-width: 1279px) {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
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
  width: ${({ isExpanded }) => (isExpanded ? '500px' : '300px')};
  height: ${({ isExpanded }) => (isExpanded ? '400px' : '250px')};
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

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category') || 'all';

  const [isOnline, setIsOnline] = useState(true);

  const handleChatboxToggle = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    let nextPaging = 0;
    let isFetching = false;

    async function fetchProducts() {
      isFetching = true;
      setIsLoading(true);
      const response = keyword
        ? await api.searchProducts(keyword, nextPaging)
        : await api.getProducts(category, nextPaging);
      if (nextPaging === 0) {
        setProducts(response.data);
      } else {
        setProducts((prev) => [...prev, ...response.data]);
      }
      nextPaging = response.next_paging;
      isFetching = false;
      setIsLoading(false);
    }

    async function scrollHandler() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPaging === undefined) return;
        if (isFetching) return;

        fetchProducts();
      }
    }

    fetchProducts();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [keyword, category]);
  //todo 需改成變數
  const productRating = 2;
  return (
    <Wrapper>
      {products.map(({ id, main_image, colors, title, price }) => (
        <Product key={id} to={`/products/${id}`}>
          <ProductImage src={main_image} />
          <ProductColors>
            {colors.map(({ code }) => (
              <ProductColor $colorCode={`#${code}`} key={code} />
            ))}
          </ProductColors>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice uctPrice>TWD.{price}</ProductPrice>
          <StarRating></StarRating>
        </Product>
      ))}
      <FixedImage
        src={chatIcon}
        alt="Chat Icon"
        onClick={handleChatboxToggle}
      />
      <Chat isVisible={isChatboxVisible} isExpanded={isExpanded}>
        <ChatHeader onClick={toggleExpand}>
          <StatusIndicator isOnline={true} />
          客服在線上
          <ExpandIcon icon={isExpanded ? faCompress : faExpand} />
        </ChatHeader>
        <ChatMessages>
          <p>Hello!</p>
          <p>親,今天可以幫你做什麼呢?</p>
          <ChatInputContainer>
            <ChatInput type="text" placeholder="什麼時候會進貨呢?" />
            <SendButton>
              <FontAwesomeIcon icon={faPaperPlane} />
            </SendButton>
          </ChatInputContainer>
        </ChatMessages>
      </Chat>
      {isLoading && <Loading type="spinningBubbles" color="#313538" />}
    </Wrapper>
  );
}

export default Products;
