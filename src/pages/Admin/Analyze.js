import styled from 'styled-components/macro';
import { useState, useRef, useEffect } from 'react';
import { Chart1 } from './svg/Chart1';
import { C3Pie } from './svg/C3Pie';
import SideBar from './SideBar';

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: left;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const Blocks = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  padding-top: 30px;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const Block = styled.div`
  padding: 0 30px;
  width: ${({ size }) => (size === 'large' ? '100%' : '50%')};
  font-size: 20px;
  margin-bottom: 30px;

  @media screen and (max-width: 1279px) {
  }
`;

const TopBar = styled.div`
  display: flex;

  @media screen and (max-width: 1279px) {
  }
`;

const Title = styled.div`
  margin-right: auto;
  height: 50px;
  width: 200px;
  line-height: 50px;
  font-size: 25px;

  @media screen and (max-width: 1279px) {
  }
`;

const Amount = styled.div`
  line-height: 50px;
  height: 50px;
  width: 200px;

  @media screen and (max-width: 1279px) {
  }
`;

const TimeButtons = styled.div`
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1279px) {
  }
`;

const TimeButton = styled.div`
  background-color: #f1f1f1;
  height: 50px;
  display: flex;
  width: calc(100% / 3);
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1279px) {
  }
`;

const Resize = styled.div`
  background-color: lightgrey;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1279px) {
  }
`;

const Chart = styled.div`
  border: solid 1px black;
  height: ${({ size }) => (size === 'large' ? '400px' : '300px')};

  @media screen and (max-width: 1279px) {
  }
`;

function Analyze({ data }) {
  //if (!product) return null;
  const [blockSize, setBlockSize] = useState(
    new Array(5)
      .fill('')
      .map((element, index) => (index === 0 ? 'large' : 'medium'))
  );
  const blockData = [0, 1, 2, 3, 4];
  const titles = ['交易總額', '流量', '客單價', '轉換率', '回購率'];
  const handleResize = (blockIndex) => {
    setBlockSize(
      blockSize.map((size, index) =>
        index === blockIndex ? (size === 'large' ? 'medium' : 'large') : size
      )
    );
  };
  const [productList, setProductList] = useState([]);
  const [nextpaging, setNextpaging] = useState(0);
  // console.log(productList);

  useEffect(() => {
    if (nextpaging > -1)
      fetch(
        `https://side-project2023.online/api/1.0/products/all?paging=${nextpaging}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newArr = data.data.map((item) => {
            return { category: item.category, productId: item.id };
          });
          setNextpaging(data.next_paging === null ? -1 : data.next_paging);
          setProductList([...productList, ...newArr]);
        });
  }, [nextpaging]);

  return (
    <Wrapper>
      <SideBar />
      <Blocks>
        {blockData.map((element, index) => (
          <Block size={blockSize[index]} key={index}>
            <TopBar>
              <Title>{titles[index]}</Title>
              <Amount>總金額：元</Amount>
              <TimeButtons>
                <TimeButton>月</TimeButton>
                <TimeButton>週</TimeButton>
                <TimeButton>日</TimeButton>
              </TimeButtons>
              {/* <Resize
                size={blockSize[index]}
                onClick={() => {
                  handleResize(index);
                }}
              >
                {blockSize[index] === 'large' ? '縮' : '展'}
              </Resize> */}
            </TopBar>
            <Chart size={blockSize[index]}>
              {index === 0 ? <Chart1 size={blockSize[0]} /> : ''}
              {index === 2 ? <C3Pie productList={productList} /> : ''}
            </Chart>
          </Block>
        ))}
      </Blocks>
    </Wrapper>
  );
}

export default Analyze;
