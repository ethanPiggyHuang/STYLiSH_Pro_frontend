import { useContext } from 'react';
import styled from 'styled-components/macro';
import ReactLoading from 'react-loading';

import { AuthContext } from '../../context/authContext';

const Wrapper = styled.div`
  padding: 0ss 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const MemberInfo = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${({ isLogin }) => (isLogin ? 'position: fixed; left: 30px;' : '')}

  ${'' /* transition: width 2s ease-out 2s; */}
  ${'' /* animation: move 5s 1; */}
  ${
    '' /* @keyframes move {
    from {
      left: 0;
    }
    to {
      left: 50px;
    }
  } */
  }
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const TitleLeft = styled.div`
  font-size: 24px;
  padding: 20px 0 16px;
  text-align: center;
  width: 150px;
  font-weight: normal;
`;

const Photo = styled.img`
  margin-top: 24px;
`;

const Content = styled.div`
  margin-top: 24px;
`;

const LogoutButton = styled.button`
  margin-top: 24px;
`;

const Loading = styled(ReactLoading)`
  margin-top: 50px;
`;

const Orders = styled.div`
  position: absolute;
  left: 300px;
  padding-top: 60px;
`;

const OrderTable = styled.div`
  ${'' /* margin-top: 24px; */}
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

function Profile() {
  const { user, isLogin, login, logout, loading } = useContext(AuthContext);

  const renderContent = () => {
    if (loading) return <Loading type="spinningBubbles" color="#313538" />;
    if (isLogin)
      return (
        <>
          <Photo src={user.picture} />
          <Content>{user.name}</Content>
          <Content>{user.email}</Content>
          <LogoutButton onClick={logout}>登出</LogoutButton>
        </>
      );
    return <LogoutButton onClick={login}>登入</LogoutButton>;
  };
  return (
    <Wrapper>
      <MemberInfo isLogin={isLogin}>
        <Title>會員基本資訊</Title>
        {renderContent()}
      </MemberInfo>
      {isLogin && (
        <Orders>
          <Title>訂單總覽</Title>
          <TitleLeft>目前訂單</TitleLeft>
          <OrderTable>
            <Order index={0}>
              <OrderId>訂單編號</OrderId>
              <ProductName>商品名稱</ProductName>
              <ProductQty>數量</ProductQty>
              <ProductPrice>小計</ProductPrice>
              <ProductDetail>詳細資訊</ProductDetail>
              <ProductContact>聯絡客服</ProductContact>
            </Order>
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
          <TitleLeft>已完成訂單</TitleLeft>
          <OrderTable>
            <Order index={0}>
              <OrderId>訂單編號</OrderId>
              <ProductName>商品名稱</ProductName>
              <ProductQty>數量</ProductQty>
              <ProductPrice>小計</ProductPrice>
              <ProductDetail>詳細資訊</ProductDetail>
              <ProductContact>給予評價</ProductContact>
            </Order>
            <Order>
              <OrderId>1</OrderId>
              <ProductName>女版休閒經典裙子</ProductName>
              <ProductQty>100</ProductQty>
              <ProductPrice>20220</ProductPrice>
              <ProductDetail>詳細資訊</ProductDetail>
              <ProductContact>給予評價</ProductContact>
            </Order>
            <Order>
              <OrderId>2</OrderId>
              <ProductName>女版休閒經典裙子</ProductName>
              <ProductQty>100</ProductQty>
              <ProductPrice>20220</ProductPrice>
              <ProductDetail>詳細資訊</ProductDetail>
              <ProductContact>給予評價</ProductContact>
            </Order>
          </OrderTable>
        </Orders>
      )}
    </Wrapper>
  );
}

export default Profile;
