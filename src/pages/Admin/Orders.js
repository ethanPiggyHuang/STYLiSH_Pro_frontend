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
import SideBar from './SideBar';
import Product from '../Product/Product';
const Wrapper = styled.div`
  display: flex;
`;

const OrdersWrap = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Split = styled.hr`
  margin-bottom: 20px;
`;

const OrderByCustomer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const OrderWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OrderNumber = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const OrderName = styled.div`
  font-size: 14px;
`;

const OrderDate = styled.div`
  font-size: 14px;
`;

const TotalAmount = styled.div`
  font-size: 14px;
`;

const ProductDetail = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 10px;
`;

const DetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ProductQuantity = styled.div`
  font-size: 14px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
`;

const ProductTotal = styled.div`
  font-size: 14px;
`;

const OrderDetail = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const Comments = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const ReplyComments = styled.div`
  margin-left: 20px;
  color: gray;
`;

function Order() {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [comments, setComments] = useState([]);

  const handleChatToggle = () => {
    setComments('order.comments');
    setShowChat(!showChat);
  };

  const orders = [
    {
      id: 1,
      orderNumber: '12345',
      customerName: '谷哥',
      orderDate: '2022-03-18',
      totalAmount: '$500',
      products: [
        {
          id: 1,
          name: 'Product A',
          quantity: 2,
          price: '$20.00',
          total: '$40.00',
        },
        {
          id: 2,
          name: 'Product B',
          quantity: 1,
          price: '$30.00',
          total: '$30.00',
        },
      ],
      comments: '訂錯顏色了,請幫忙修改成白的',
      adminComments: '已修正咯',
    },
    {
      id: 2,
      orderNumber: '67890',
      customerName: '张三',
      orderDate: '2022-03-19',
      totalAmount: '$750',
      products: [
        {
          id: 3,
          name: 'Product C',
          quantity: 3,
          price: '$15.00',
          total: '$45.00',
        },
        {
          id: 4,
          name: 'Product D',
          quantity: 2,
          price: '$15.00',
          total: '$30.00',
        },
      ],
      comments: '訂錯尺寸了,請幫忙修改成L的',
      adminComments: '沒有貨了, 不好意思',
    },
  ];

  return (
    <Wrapper>
      <SideBar />

      <OrdersWrap>
        <Title>| 所有訂單</Title>
        <Split />
        {orders.map((order) => (
          <OrderByCustomer key={order.id}>
            <OrderDetail>
              <OrderWrap>
                <OrderNumber>訂單編號: {order.orderNumber}</OrderNumber>
                <OrderName>購買人:{order.customerName}</OrderName>
                <OrderDate>{order.orderDate}</OrderDate>
                <TotalAmount>{order.totalAmount}</TotalAmount>
                {order.products.map((product) => (
                  <ProductDetail key={product.id}>
                    <DetailWrap>
                      <ProductName>{product.name}</ProductName>
                      <ProductQuantity>
                        數量: {product.quantity}
                      </ProductQuantity>
                      <ProductPrice>單價: {product.price}</ProductPrice>
                      <ProductTotal>總價: {product.total}</ProductTotal>
                    </DetailWrap>
                  </ProductDetail>
                ))}
              </OrderWrap>

              <Comments>買家訊息:{order.comments}</Comments>
              <ReplyComments>回覆:{order.adminComments}</ReplyComments>
            </OrderDetail>
            <button onClick={handleChatToggle}>有新訊息</button>
          </OrderByCustomer>
        ))}
      </OrdersWrap>

      <ChatComponet />
    </Wrapper>
  );
}

export default Order;
