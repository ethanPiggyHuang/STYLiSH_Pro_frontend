import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import Socket from '../Home/Socket';

import { AuthContext } from '../../context/authContext';

const Orders = styled.div`
  padding-left: 300px;
  padding-top: 60px;
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
  padding: 25px 20px 15px;

  background-color: ${({ index }) => (index === 0 ? '#f1f1f1' : '')};
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

const ProductName = styled.div`
  width: 350px;
`;

const ProductQty = styled.div`
  width: 50px;
`;

const ProductPrice = styled.div`
  width: 150px;
`;

const ProductDetail = styled.div`
  width: 150px;
  cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')};
`;
const ProductContact = styled.div`
  width: 150px;
  cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')};
`;
const ProductRate = styled.div`
  width: 200px;
  text-align: left;
  color: ${({ index }) => (index !== 0 ? 'red' : '')};
  cursor: ${({ index }) => (index !== 0 ? 'pointer' : '')};
`;

const ItemQuantitySelect = styled.select`
  width: 80px;
  height: 30px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;
  visibility: ${({ index }) => (index === 0 ? 'hidden' : '')};
  @media screen and (max-width: 1279px) {
    margin-top: 12px;
  }
`;

const ToggleButton = styled.div`
  width: 150px;
`;

export default function PersonalOrder() {
  const [orderList, setOrderList] = useState([]);
  const [rankList, setRankList] = useState(0);
  const { jwtToken, isLogin, login } = useContext(AuthContext);
  const [isExpand, setIsExpand] = useState([true]);
  console.log(isExpand);

  useEffect(() => {
    function getOrders() {
      if (isLogin) {
        fetch(`https://side-project2023.online/api/1.0/order/getorderbyid`, {
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const personOrders = data.data.map((order) => {
              const rearrangeOrder = {
                order_id: order.id,
                order_detail: order.details.list,
                user_id: order.user_id,
                order_date: order.time,
                order_total: order.total,
              };
              return rearrangeOrder;
            });
            setOrderList(personOrders);
            setIsExpand(new Array(data.data.length).fill(false));
            // console.log(data.data[0].total);
          });
      } else {
        // 要移植到 商家端
        // fetch('https://side-project2023.online/api/1.0/report/order/detail')
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setOrderList(data.data);
        //   });
      }
    }
    getOrders();
  }, [isLogin]);

  const handleRate = (order, orderDetail, rank) => {
    // console.log(rank, typeof rank);
    const body = {
      order_id: order.order_id,
      evaluate: [
        {
          product_id: orderDetail.id,
          rank: rank,
        },
      ],
      comment: '物流很爛',
    };
    // console.log(order.order_id, orderDetail.id, rank);
    fetch('https://side-project2023.online/api/1.0/report/order/evaluate', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const handleChat = (order) => {
    const body = {
      order_id: order.order_id,
      user_id: order.user_id,
      chat: 'Ethantest',
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
        console.log(res);
        alert('訂單評價已送出');
      });
  };

  return (
    <Orders>
      <Socket></Socket>
      <Title>訂單總覽</Title>
      <OrderTable>
        <Order index={0}>
          <OrderId>訂單編號</OrderId>
          <OrderDate>訂單日期</OrderDate>
          <OrderTotal>訂單總金額</OrderTotal>
          <ToggleButton>訂單細節</ToggleButton>
        </Order>
        {orderList.length !== 0 &&
          orderList.map((order, orderIndex) => {
            const orderDate = new Date(order.order_date);
            return (
              <>
                <Order key={`${order.order_id}${orderIndex}`}>
                  <OrderId>{order.order_id}</OrderId>
                  <OrderDate>{`${orderDate.getFullYear() - 1911} 年 ${
                    orderDate.getMonth() + 1
                  } 月 ${orderDate.getDate()} 日`}</OrderDate>
                  <OrderTotal>{`${order.order_total} 元`}</OrderTotal>
                  <ToggleButton
                    onClick={() =>
                      setIsExpand(
                        isExpand.map((orderIsExpand, index) =>
                          index === orderIndex ? !orderIsExpand : orderIsExpand
                        )
                      )
                    }
                  >
                    {isExpand[orderIndex] === false ? '▼' : '▲'}
                  </ToggleButton>
                </Order>
                {isExpand[orderIndex] === true ? <Order>jj</Order> : ''}
              </>
            );
          })}
        {/* order.order_detail.map((orderDetail, index) => {
              
              return orderDetail.qty ? (  ////TODO 要設限制
                
                  {isExpand[orderIndex] === true ? (
                    <Order>
                      <ProductName>{orderDetail.name}</ProductName>
                      <ProductQty>{orderDetail.qty}</ProductQty>
                      <ProductPrice>{orderDetail.price}</ProductPrice>
                      <ProductDetail
                        onClick={() => {
                          alert('功能還沒寫，別亂按～');
                        }}
                      >
                        詳細資訊
                      </ProductDetail>
                      <ProductContact onClick={() => handleChat(order)}>
                        聯絡客服
                      </ProductContact>
                      <ItemQuantitySelect
                        value={rankList}
                        onChange={(e) => setRankList(e.target.value)}
                      >
                        {[0, 1, 2, 3, 4, 5].map((_, index) => (
                          <option key={index}>{index}</option>
                        ))}
                      </ItemQuantitySelect>
                      <ProductRate
                        onClick={() => {
                          handleRate(order, orderDetail, rankList);
                        }}
                      >
                        送出評價
                      </ProductRate>
                    </Order>
                  ) : (
                    ''
                  )}

                  
                </Order>
              ) : (
                ''
              );
            }) */}
        {/* )} */}
      </OrderTable>
    </Orders>
  );
}
