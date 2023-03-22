import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import ChatComponet from '../Home/Chat';
import SideBar from './SideBar';

import { AuthContext } from '../../context/authContext';

const Wrapper = styled.div`
  display: flex;
`;

const Orders = styled.div`
  padding-left: 80px;
  padding-top: 40px;
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

// const TitleLeft = styled.div`
//   font-size: 24px;
//   padding: 20px 0 16px;
//   text-align: center;
//   width: 150px;
//   font-weight: normal;
// `;

const OrderTable = styled.div`
  margin-top: 24px;
  font-size: 20px;
  margin-bottom: 50px;
`;

const Order = styled.div`
  width: calc(100vw - 300px);
  display: flex;
  justify-content: space-around;
  padding: 20px;
  cursor: pointer;
  cursor: ${({ index }) => (index === 0 ? 'default' : 'pointer')};

  background-color: ${({ index, isExpand }) =>
    index === 0 ? '#c1c1c1' : isExpand ? '#f1f1f1' : ''};

  border-top: ${({ isExpand }) => (isExpand ? '1px grey solid' : '')};
`;

const OrderId = styled.div`
  width: 100px;
`;

const OrderDate = styled.div`
  width: 200px;
`;

const OrderTotal = styled.div`
  width: 200px;
`;

const OrderDetails = styled.div`
  width: calc(100vw - 320px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  border-top: 1px grey dashed;

  background-color: ${({ index }) => (index === 0 ? '#f1f1f1' : '')};
`;

const OrderDetail = styled.div`
  width: calc(100vw - 320px);
  display: flex;
  justify-content: left;
  padding: 15px 20px 15px;
  border-bottom: 1px grey dashed;
  align-items: center;

  &:last-child {
    border-bottom: 1px grey dashed;
  }

  background-color: ${({ index }) => (index === 0 ? '#f1f1f1' : '')};
`;

const ProductImg = styled.img`
  width: 120px;
  height: 160px;
`;
const ProductDetail = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${'' /* cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')}; */}
`;

const ProductName = styled.div`
  padding: 0 10px 10px;
`;

const ProductQty = styled.div`
  padding: 0 10px 10px;
`;

const ProductPrice = styled.div`
  padding: 20px 10px 10px;
`;

const ProductContact = styled.div`
  width: 150px;
  cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')};
`;
const ProductRate = styled.div`
  width: 80px;
  text-align: center;
  color: ${({ index }) => (index !== 0 ? 'darkred' : '')};
  ${'' /* cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')}; */}
`;

const ProductEvaluate = styled.div`
  width: 10px;
  text-align: center;
  color: darkred;
`;

const ItemQuantitySelect = styled.select`
  width: 80px;
  height: 30px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;
  font-size: 18px;
  visibility: ${({ index }) => (index === 0 ? 'hidden' : '')};
  @media screen and (max-width: 1279px) {
    margin-top: 12px;
  }
`;

const ToggleButton = styled.div`
  width: 150px;
`;

const ChatBottom = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  position: relative;
  border-bottom: 1px grey solid;
`;

const ChatTitle = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 15px;
  right: 520px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 10px;
  color: grey;

  line-height: 45px;
  background-color: #d1d1d1;
`;

const ChatInput = styled.input`
  position: absolute;
  z-index: 1;
  bottom: 15px;
  right: 145px;
  height: 45px;
  display: block;
  width: 375px;
  border-radius: 10px;
  ${'' /* width: calc(100vw - 1140px); */}
  ${'' /* margin: 5px 20px 5px 0; */}
  padding-left: 10px;
  border: none;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const GreyBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
  height: 60px;
  width: 600px;
  z-index: 0;
  border-radius: 10px;
  background-color: #d1d1d1;
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 60px;
  right: 20px;
  padding: 10px;
  background-color: #d1d1d1;
  height: ${({ detailNumber }) => {
    const height = detailNumber * 191 - 20;
    return `${height}px`;
  }};
  ${'' /* border: 1px solid black; */}
  border-radius: 10px;
  width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: grey;
`;

const ChatWindowTitle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

const ChatWindowMessages = styled.div`
  font-size: 20px;
  ${'' /* background-color: #ffffff; */}
  border: 1px solid grey;
  border-radius: 10px;
  height: 100%;
  overflow: scroll;
`;

const ChatWindowMessage = styled.div`
  padding: 10px 15px;
  font-size: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  width: fit-content;
  margin-top: 5px;

  margin-left: ${({ user }) => (user === 'admin' ? '10px' : 'auto')};
  margin-right: ${({ user }) => (user === 'admin' ? 'auto' : '10px')};
  text-align: ${({ user }) => (user === 'admin' ? 'left' : 'right')};
`;

const Submit = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 15px;
  right: 5px;
  height: 45px;
  width: 115px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;

  cursor: pointer;
  margin-right: 20px;

  background-color: #f1f1f1;
  color: grey;
`;

const ReplyNotice = styled.div`
  width: 40px;
`;

function AdminOrders() {
  const [orderList, setOrderList] = useState([]);
  // const [rankList, setRankList] = useState([]);
  const [isExpand, setIsExpand] = useState([true]);
  const { jwtToken, isLogin, login } = useContext(AuthContext);
  const [chatMessage, setChatMessage] = useState({ orderId: 0, message: '' });
  const [messages, setMessages] = useState([]);
  const [zeroDetail, setZeroDetail] = useState([]);
  const [isEvaluated, setIsEvalutated] = useState(['notEvaluated']);
  const [hasReply, setHasReply] = useState({});
  const admin_id = 99999;

  // console.log(Object.keys(hasReply).length);
  // console.log(orderList.map((order) => order.order_detail.length));
  // console.log(messages);

  useEffect(() => {
    function getOrders() {
      if (isLogin) {
        fetch(`https://side-project2023.online/api/1.0/report/order/total`)
          .then((res) => res.json())
          .then((data) => {
            // console.log('data', data.data[0]);
            const personOrders = data.data.map((order) => {
              const rearrangeOrder = {
                order_id: order.id,
                // order_detail: order.detail,
                // user_id: order.user_id,
                order_date: order.createtime,
                order_total: order.total,
              };
              return rearrangeOrder;
            });
            setOrderList(personOrders);
            setIsExpand(new Array(data.data.length).fill(false));
            // getReplys(data.data.map((order) => order.id)); // 只要一次就好吧？
          });
        fetch(`https://side-project2023.online/api/1.0/report/order/detail`)
          .then((res) => res.json())
          .then((data) => {
            // console.log('dataDetail', data.data[0]);
            let detailObj = {};
            data.data.forEach((order) => {
              // console.log(order);
              detailObj[order.order_id] = order.order_detail;
            });
            setOrderList((prev) =>
              prev.map((order) => {
                return { ...order, order_detail: detailObj[order.order_id] };
              })
            );

            //Detail
            // setRankList(
            //   data.data.map((order) => order.order_detail.map((e) => 0))
            // );
            //Detail
            setZeroDetail(
              data.data.map((order) =>
                order.order_detail.reduce(
                  (acc, cur) => (cur.qty === 0 ? acc + 1 : acc),
                  0
                )
              )
            );
            getReplys(data.data.map((order) => order.id));
          });
      }
    }
    getOrders();
  }, [isLogin]);

  function getReplys(orderIds) {
    orderIds.forEach((orderId) => {
      fetch(
        `https://side-project2023.online/api/1.0/order/getOrderchatHistory?order_id=${orderId}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(index, data);
          // TODO
          let newPair = {};
          if (data.data.length === 0) {
            newPair[orderId] = false;
          } else {
            newPair[orderId] =
              data.data[data.data.length - 1].user_id !== 99999;
          }
          setHasReply((prev) => {
            return { ...prev, ...newPair };
          });
        });
    });
  }

  function getIsEvaluated(orderId) {
    fetch(
      `https://side-project2023.online/api/1.0/report/order/getorderidevaluate?order_id=${orderId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          setIsEvalutated(['notEvaluated']);
        } else {
          setIsEvalutated(data.data.map((detail) => detail.product_rank));
        }
      });
  }

  const handleSend = (order, message) => {
    handleChat(order, message);
    setChatMessage({ ...chatMessage, message: '' });
  };

  const handleChat = (order, message) => {
    const body = {
      order_id: order.order_id,
      user_id: 99999,
      chat: message,
    };
    // console.log(body);
    fetch('https://side-project2023.online/api/1.0/order/insertOrderchat', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
      });
    setMessages([
      ...messages,
      {
        chat: message,
        order_id: order.order_id,
        user_id: 99999,
      },
    ]);
    setTimeout(() => handleGetMessages(order.order_id), 3000);
  };

  const handleGetMessages = (orderId) => {
    fetch(
      `https://side-project2023.online/api/1.0/order/getOrderchatHistory?order_id=${orderId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          setMessages(data.data);
        }
      });
    console.log('here?');
  };

  console.log('hi'); //TODO FIX   //////超級大問題

  return (
    <Wrapper>
      <SideBar />
      <Orders>
        <Title>{`| 所有訂單 (${orderList.length})`}</Title>
        <OrderTable>
          <Order index={0}>
            <OrderId>訂單編號</OrderId>
            <OrderDate>訂單日期</OrderDate>
            <OrderTotal>訂單總金額</OrderTotal>
            <ToggleButton>訂單細節</ToggleButton>
            <ReplyNotice>回覆</ReplyNotice>
          </Order>
          {orderList.length !== 0 &&
            orderList.map((order, orderIndex) => {
              const orderDate = new Date(order.order_date);
              return (
                <>
                  <Order
                    key={`${order.order_id}${orderIndex}`}
                    isExpand={isExpand[orderIndex]}
                    onClick={() => {
                      setIsExpand(
                        isExpand.map((orderIsExpand, index) =>
                          index === orderIndex ? !orderIsExpand : false
                        )
                      );
                      // console.log(chatMessage.orderId !== order.order_id);
                      if (chatMessage.orderId !== order.order_id) {
                        setChatMessage({
                          orderId: order.order_id,
                          message: '',
                        });
                        handleGetMessages(order.order_id);
                        getIsEvaluated(order.order_id);
                      }
                    }}
                  >
                    <OrderId>{order.order_id}</OrderId>
                    <OrderDate>{`${orderDate.getFullYear() - 1911} 年 ${
                      orderDate.getMonth() + 1
                    } 月 ${orderDate.getDate()} 日`}</OrderDate>
                    <OrderTotal>{`${order.order_total} 元`}</OrderTotal>
                    <ToggleButton>
                      {isExpand[orderIndex] === false ? '▼' : '▲'}
                    </ToggleButton>
                    {Object.keys(hasReply).length === 0 ? (
                      ''
                    ) : (
                      <ReplyNotice>
                        {hasReply[order.order_id] === true ? '✉' : ''}
                      </ReplyNotice>
                    )}
                  </Order>
                  {isExpand[orderIndex] === true &&
                  order.order_detail.length !== 0 ? (
                    <>
                      <OrderDetails>
                        {order.order_detail.map((detail, detailIndex) => {
                          return detail.qty === 0 ? (
                            <></>
                          ) : (
                            <OrderDetail key={detailIndex}>
                              <ProductDetail>
                                <ProductName>{detail.name}</ProductName>
                                <ProductPrice>{`單價：${detail.price} 元`}</ProductPrice>
                                <ProductQty>{`數量：${detail.qty} 件`}</ProductQty>
                                <ProductPrice>{`小計：${detail.price} 元`}</ProductPrice>
                              </ProductDetail>
                              {isEvaluated[0] === 'notEvaluated' ? (
                                <ProductRate>未評價</ProductRate>
                              ) : (
                                <>
                                  <ProductRate>評價</ProductRate>
                                  <ProductEvaluate>
                                    {isEvaluated[detailIndex]}
                                  </ProductEvaluate>
                                  <ProductRate>顆星</ProductRate>
                                </>
                              )}
                            </OrderDetail>
                          );
                        })}
                      </OrderDetails>
                      <ChatBottom>
                        <ChatTitle>聯繫客服</ChatTitle>
                        <ChatInput
                          value={chatMessage.message}
                          onChange={(e) => {
                            setChatMessage({
                              orderId: order.order_id,
                              message: e.target.value,
                            });
                          }}
                        />
                        <Submit
                          onClick={() => {
                            if (chatMessage.message !== '') {
                              handleSend(order, chatMessage.message);
                            }
                            setTimeout(
                              () => handleGetMessages(order.order_id),
                              2000
                            );
                          }}
                        >
                          {isEvaluated[0] === 'notEvaluated'
                            ? '訂單回饋'
                            : '送出'}
                        </Submit>
                        <ChatWindow
                          detailNumber={
                            order.order_detail.length - zeroDetail[orderIndex]
                          }
                        >
                          <ChatWindowTitle>{`對話紀錄`}</ChatWindowTitle>
                          <ChatWindowMessages>
                            {messages.length !== 0
                              ? messages.map((message, index) => (
                                  <ChatWindowMessage
                                    key={index}
                                    user={
                                      message.user_id &&
                                      message.user_id.toString() ===
                                        admin_id.toString()
                                        ? 'admin'
                                        : 'user'
                                    }
                                  >
                                    {message.chat}
                                  </ChatWindowMessage>
                                ))
                              : ''}
                          </ChatWindowMessages>
                        </ChatWindow>
                        <GreyBox />
                      </ChatBottom>
                    </>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
        </OrderTable>
      </Orders>

      <ChatComponet />
    </Wrapper>
  );
}

export default AdminOrders;
