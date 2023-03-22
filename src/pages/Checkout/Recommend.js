import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';

import api from '../../utils/api';
import { CartContext } from '../../context/cartContext';

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 10px 0;
  background-color: #f1f1f1;
  overflow-x: scroll;

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
  ${'' /* flex-wrap: wrap; */}

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
    margin-left: 20px;

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
  text-align: center;

  @media screen and (max-width: 1279px) {
    order: 1;
    background-position: center -10px;
  }
`;

function Recommend({ cartLength }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  // console.log(cartItems); //TODO: 根據 cart item 名稱去抓 fuzzies

  // console.log(newKeywords);

  const [recommentItems, setRecommentItems] = useState([]);
  // console.log(recommentItems);

  useEffect(() => {
    const words =
      cartItems.length === 0 ? [''] : cartItems.map((item) => item.name[0]);
    const defaultWord = ['洋', '西', '童', '襯', '褲'];
    const newKeywords = defaultWord.map((word, index) =>
      words.length < index + 1 ? word : words[index]
    );
    newKeywords.forEach((keyword) => getFuzzys(keyword));
    async function getFuzzys(keyword) {
      const { data } = await api.getFuzzys(keyword); //TODO:
      console.log(data);
      if (data.length !== 0) {
        setRecommentItems((prev) => [...prev, data[0]]);
      }
    }
  }, []);

  // const fuzzys = () => {
  //   setRecommentItems([
  //     ...recommentItems,
  //     {
  //       id: 201807242222,
  //       category: 'men',
  //       title: '經典商務西裝',
  //       description: '厚薄：薄\r\n彈性：無',
  //       price: 3999,
  //       texture: '棉 100%',
  //       wash: '手洗，溫水',
  //       place: '中國',
  //       node: '實品顏色依單品照為主',
  //       story:
  //         'O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',
  //       main_image:
  //         'https://api.appworks-school.tw/assets/201807202140/main.jpg',
  //       variants: [
  //         {
  //           color_code: '334455',
  //           size: 'S',
  //           stock: 9,
  //         },
  //       ],
  //       colors: [
  //         {
  //           code: '334455',
  //           name: '深藍',
  //         },
  //       ],
  //       sizes: ['S'],
  //     },
  //   ]);
  // };

  function addToCart(index) {
    // if (!selectedSize) {
    //   window.alert('請選擇尺寸');
    //   return;
    // }
    console.log(index);
    // console.log(recommentItems);
    const product = recommentItems[index];
    console.log(recommentItems[index]);
    const randomQty = Math.floor(Math.random() * 6) + 1;
    const newCartItems = [
      ...cartItems,
      {
        color: product.colors[0],
        id: product.id,
        image: product.main_image,
        name: product.title,
        price: product.price,
        qty: randomQty,
        size: product.sizes[0],
        stock: product.variants[0].stock - randomQty,
      },
    ];
    setCartItems(newCartItems);
    const newRecomment = [...recommentItems];
    newRecomment.splice(index, 1);
    setRecommentItems(newRecomment);
    window.alert('已加入商品');
  }

  return (
    <Wrapper>
      <Header>
        <Title>其他購買這些商品的人，還買了...</Title>
      </Header>
      {recommentItems.length && (
        <Items>
          {recommentItems.map((item, index) => (
            <Item key={index}>
              <ItemImage src={item.main_image} />
              <ItemDetails>
                <ItemName>{item.title}</ItemName>
                <ItemUnitPrice>
                  <ItemUnitPriceName hideOnDesktop>單價</ItemUnitPriceName>
                  <ItemUnitPriceValue>NT.{item.price}</ItemUnitPriceValue>
                </ItemUnitPrice>
                <AddToCartButton onClick={(e) => addToCart(index)}>
                  加入購物車
                </AddToCartButton>
              </ItemDetails>
            </Item>
          ))}
        </Items>
      )}
      {/* <button onClick={() => fuzzys()}>測試</button> */}
    </Wrapper>
  );
}

export default Recommend;
