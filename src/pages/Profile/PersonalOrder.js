import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

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

const Orders = styled.div`
  position: absolute;
  left: 300px;
  padding-top: 60px;
`;

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

const ProductName = styled.div`
  width: 350px;
`;

const ProductQty = styled.div`
  width: 150px;
`;

const ProductPrice = styled.div`
  width: 150px;
`;

const ProductDetail = styled.div`
  flex-grow: 150px;
`;
const ProductContact = styled.div`
  flex-grow: 150px;
`;

export default function PersonalOrder() {
  const [orderList, setOrderList] = useState([]);
  console.log(orderList);
  useEffect(() => {
    fetch('https://side-project2023.online/api/1.0/report/order/detail')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);ss
        setOrderList(data.data);
      });
  }, []);
  return (
    <Orders>
      <Title>訂單總覽</Title>
      {/* <TitleLeft>目前訂單</TitleLeft> */}
      <OrderTable>
        <Order index={0}>
          <OrderId>訂單編號</OrderId>
          <ProductName>商品名稱</ProductName>
          <ProductQty>數量</ProductQty>
          <ProductPrice>小計</ProductPrice>
          <ProductDetail>詳細資訊</ProductDetail>
          <ProductContact>聯絡客服</ProductContact>
        </Order>
        {orderList.length !== 0 &&
          orderList.map((order) => {
            return (
              <Order>
                <OrderId>{order.id}</OrderId>
                <ProductName>商品名稱</ProductName>
                <ProductQty>數量</ProductQty>
                <ProductPrice>小計</ProductPrice>
                <ProductDetail>詳細資訊</ProductDetail>
                <ProductContact>聯絡客服</ProductContact>
              </Order>
            );
          })}

        <Order>
          <OrderId>1</OrderId>
          <ProductName>女版休閒經典裙子</ProductName>
          <ProductQty>100</ProductQty>
          <ProductPrice>20220</ProductPrice>
          <ProductDetail>詳細資訊</ProductDetail>
          <ProductContact>聯絡客服</ProductContact>
        </Order>
        <Order>
          <OrderId>2</OrderId>
          <ProductName>女版休閒經典裙子</ProductName>
          <ProductQty>100</ProductQty>
          <ProductPrice>20220</ProductPrice>
          <ProductDetail>詳細資訊</ProductDetail>
          <ProductContact>聯絡客服</ProductContact>
        </Order>
      </OrderTable>
    </Orders>
  );
}
