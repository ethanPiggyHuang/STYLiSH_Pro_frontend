import { useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from '../../context/cartContext';

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 10px 0;
  background-color: #f1f1f1;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
    border-bottom: 1px solid #3f3a3a;
  }
`;

const Header = styled.div`
  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
    border-bottom: 1px solid #3f3a3a;
  }
`;

const Title = styled.div`
  flex-grow: 1;
`;

const Items = styled.div`
  padding: 0 15px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 0;
    margin-top: 10px;
    border: none;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;

  @media screen and (max-width: 1279px) {
    align-items: flex-start;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #3f3a3a;
    font-size: 14px;
    line-height: 17px;
  }

  & + & {
    margin-left: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

const ItemImage = styled.img`
  width: 114px;

  @media screen and (max-width: 1279px) {
    order: 1;
  }
`;

const ItemDetails = styled.div`
  margin-left: 20px;
  flex-grow: 1;
  align-self: flex-start;
  height: 152px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1279px) {
    width: calc(100% - 174px);
    order: 1;
  }
`;

const ItemName = styled.div`
  width: 120px;
  height: 3rem;
`;

const ItemUnitPrice = styled.div`
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    text-align: center;
    width: calc(100% / 3);
    order: 2;
  }
`;

const ItemUnitPriceName = styled.div`
  ${(props) => props.hideOnDesktop && 'display: none;'}

  @media screen and (max-width: 1279px) {
    display: block;
  }
`;

const ItemUnitPriceValue = styled.div`
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;

const AddToCartButton = styled.div`
  background-size: contain;
  cursor: pointer;
  margin-top: auto;
  border: solid 1px grey;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 2px 2px 5px grey;

  @media screen and (max-width: 1279px) {
    order: 1;
    background-position: center -10px;
  }
`;

function Recommend() {
  const { cartItems, setCartItems } = useContext(CartContext);

  // function chooseStyleAndAddCart() {
  //   const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
  //   setCartItems(newCartItems);
  //   window.alert('已刪除商品');
  // }

  return (
    <Wrapper>
      <Header>
        <Title>其他購買這些商品的人，還買了...</Title>
      </Header>
      <Items>
        {cartItems.map((item, index) => (
          <Item key={`${item.id}-${item.color.code}-${item.size}`}>
            {/* <Link  */}
            <ItemImage src={item.image} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemUnitPrice>
                <ItemUnitPriceName hideOnDesktop>單價</ItemUnitPriceName>
                <ItemUnitPriceValue>NT.{item.price}</ItemUnitPriceValue>
              </ItemUnitPrice>
              <AddToCartButton onClick={() => null}>加入購物車</AddToCartButton>
            </ItemDetails>
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
}

export default Recommend;