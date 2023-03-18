import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createdGlobalStyle } from 'styled-components/macro';
import api from '../../utils/api';
import Products from '../Home/Products';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';
import Table from './Table';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowUp,
//   faArrowDown,
//   faMinus,
// } from '@fortawesome/free-solid-svg-icons';
//import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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

// const Header = styled.div`
//   padding: 22px 30px;
//   margin-top: 26px;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   line-height: 19px;
//   font-size: 16px;
//   flex-direction: row;
//   justify-content: space-between;

//   @media screen and (max-width: 1279px) {
//     padding: 10px 10px 20px;
//     align-items: flex-start;
//     font-size: 14px;
//     line-height: 17px;
//   }
// `;

// const Item = styled.div`
//   padding: 22px 30px;
//   background-color: #e8e8e8;
//   display: flex;
//   align-items: center;
//   line-height: 19px;
//   font-size: 16px;
//   flex-direction: row;
//   justify-content: space-between;

//   @media screen and (max-width: 1279px) {
//     padding: 10px 10px 20px;
//     align-items: flex-start;
//     font-size: 14px;
//     line-height: 17px;
//   }
// `;

// const Items = styled.div`
//   flex-grow: 1;
//   align-self: flex-start;

//   @media screen and (max-width: 1279px) {
//     width: calc(100% - 174px);
//     order: 1;
//   }
// `;

const UpIcon = styled(FaArrowUp)`
  color: green;
`;

const DownIcon = styled(FaArrowDown)`
  color: red;
`;

const NoChangeIcon = styled(FaExchangeAlt)`
  color: gray;
`;

//nested data is ok, see accessorKeys in ColumnDef below

function Promote() {
  const [itemState, setItemState] = useState('UP');
  // const [product, setProduct] = useState();
  // const { id } = useParams();

  // useEffect(() => {
  //   async function getProduct() {
  //     const { data } = await api.getProduct(id);
  //     setProduct(data);
  //   }
  //   getProduct();
  // }, [id]);

  //if (!product) return null;

  return (
    <Wrapper>
      <Rank>
        <RankTitle>
          <Title>| 暢銷排名</Title>
          <Split></Split>
        </RankTitle>

        <Table></Table>

        {/* <Header>
          <Label column="1">排名</Label>
          <Label column="2">產品名稱</Label>
          <Label column="3">ID</Label>
          <Label column="4">數量</Label>
          <Label column="5">金額</Label>
          <Label column="6">狀態</Label>
          <Label column="7">加強推廣</Label>
          <abel column="8">輸入折扣</abel>
        </Header>
        <Items>
          <Item>
            <ItemRank>1</ItemRank>
            <ItemName>牛仔帽</ItemName>
            <ItemID>20934823</ItemID>
            <ItemAmount>30</ItemAmount>
            <ItemTotal>20000</ItemTotal>
            <ItemState>
              {itemState === 'UP' && <UpIcon />}
              {itemState === 'DOWN' && <DownIcon />}
              {itemState === 'NO_CHANGE' && <NoChangeIcon />}
            </ItemState>
            <PromoteBtn>加強推廣</PromoteBtn>
            <Discount>
              <option value="">選擇折扣</option>
              <option value="0.9">9折優惠</option>
              <option value="0.8">8折優惠</option>
              <option value="0.7">7折優惠</option>
              <option value="0.6">6折優惠</option>
            </Discount>
          </Item>
          <Item>
            <ItemRank>2</ItemRank>
            <ItemName>牛仔帽</ItemName>
            <ItemID>20934823</ItemID>
            <ItemAmount>30</ItemAmount>
            <ItemTotal>20000</ItemTotal>
            <ItemState>
              {itemState === 'UP' && <UpIcon />}
              {itemState === 'DOWN' && <DownIcon />}
              {itemState === 'NO_CHANGE' && <NoChangeIcon />}
            </ItemState>
            <PromoteBtn>加強推廣</PromoteBtn>
            <Discount>
              <option value="">選擇折扣</option>
              <option value="0.9">9折優惠</option>
              <option value="0.8">8折優惠</option>
              <option value="0.7">7折優惠</option>
              <option value="0.6">6折優惠</option>
            </Discount>
          </Item>
          <Item>
            <ItemRank>3</ItemRank>
            <ItemName>牛仔帽</ItemName>
            <ItemID>20934823</ItemID>
            <ItemAmount>30</ItemAmount>
            <ItemTotal>20000</ItemTotal>
            <ItemState>
              {itemState === 'UP' && <UpIcon />}
              {itemState === 'DOWN' && <DownIcon />}
              {itemState === 'NO_CHANGE' && <NoChangeIcon />}
            </ItemState>
            <PromoteBtn>加強推廣</PromoteBtn>
            <Discount>
              <option value="">選擇折扣</option>
              <option value="0.9">9折優惠</option>
              <option value="0.8">8折優惠</option>
              <option value="0.7">7折優惠</option>
              <option value="0.6">6折優惠</option>
            </Discount>
          </Item>
          <Item>
            <ItemRank>4</ItemRank>
            <ItemName>牛仔帽</ItemName>
            <ItemID>20934823</ItemID>
            <ItemAmount>30</ItemAmount>
            <ItemTotal>20000</ItemTotal>
            <ItemState>
              {itemState === 'UP' && <UpIcon />}
              {itemState === 'DOWN' && <DownIcon />}
              {itemState === 'NO_CHANGE' && <NoChangeIcon />}
            </ItemState>
            <PromoteBtn>加強推廣</PromoteBtn>
            <Discount>
              <option value="">選擇折扣</option>
              <option value="0.9">9折優惠</option>
              <option value="0.8">8折優惠</option>
              <option value="0.7">7折優惠</option>
              <option value="0.6">6折優惠</option>
            </Discount>
          </Item>
          <Item>
            <ItemRank>5</ItemRank>
            <ItemName>牛仔帽</ItemName>
            <ItemID>20934823</ItemID>
            <ItemAmount>30</ItemAmount>
            <ItemTotal>20000</ItemTotal>
            <ItemState>
              {itemState === 'UP' && <UpIcon />}
              {itemState === 'DOWN' && <DownIcon />}
              {itemState === 'NO_CHANGE' && <NoChangeIcon />}
            </ItemState>
            <PromoteBtn>加強推廣</PromoteBtn>
            <Discount>
              <option value="">選擇折扣</option>
              <option value="0.9">9折優惠</option>
              <option value="0.8">8折優惠</option>
              <option value="0.7">7折優惠</option>
              <option value="0.6">6折優惠</option>
            </Discount>
          </Item>
        </Items> */}
      </Rank>
    </Wrapper>
  );
}

export default Promote;
