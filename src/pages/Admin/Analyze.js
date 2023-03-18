import styled from 'styled-components/macro';
// import SideBar from './SideBar';

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

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

  @media screen and (max-width: 1279px) {
  }
`;

const TimeButton = styled.div`
  background-color: lightgrey;
  height: 50px;
  width: 200px;
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

function Analyze() {
  //if (!product) return null;

  return (
    <>
      <Wrapper>
        <Block size={'large'}>
          <TopBar>
            <Title>總訂單金額</Title>
            <Amount>總金額：元</Amount>
            <TimeButtons>
              <TimeButton>月</TimeButton>
              <TimeButton>週</TimeButton>
              <TimeButton>日</TimeButton>
            </TimeButtons>
          </TopBar>
          <Chart size={'large'}>圖表</Chart>
        </Block>
        <Block size={'medium'}>
          <TopBar>
            <Title>流量</Title>
            <Amount>總金額：元</Amount>
            <TimeButtons>
              <TimeButton>月</TimeButton>
              <TimeButton>週</TimeButton>
              <TimeButton>日</TimeButton>
            </TimeButtons>
          </TopBar>
          <Chart size={'medium'}>圖表</Chart>
        </Block>
        <Block size={'medium'}>
          <TopBar>
            <Title>客單價</Title>
            <Amount>總金額：元</Amount>
            <TimeButtons>
              <TimeButton>月</TimeButton>
              <TimeButton>週</TimeButton>
              <TimeButton>日</TimeButton>
            </TimeButtons>
          </TopBar>
          <Chart size={'medium'}>圖表</Chart>
        </Block>
        <Block size={'medium'}>
          <TopBar>
            <Title>轉換率</Title>
            <Amount>總金額：元</Amount>
            <TimeButtons>
              <TimeButton>月</TimeButton>
              <TimeButton>週</TimeButton>
              <TimeButton>日</TimeButton>
            </TimeButtons>
          </TopBar>
          <Chart size={'medium'}>圖表</Chart>
        </Block>
        <Block size={'medium'}>
          <TopBar>
            <Title>回購率</Title>
            <Amount>總金額：元</Amount>
            <TimeButtons>
              <TimeButton>月</TimeButton>
              <TimeButton>週</TimeButton>
              <TimeButton>日</TimeButton>
            </TimeButtons>
          </TopBar>
          <Chart size={'medium'}>圖表</Chart>
        </Block>
      </Wrapper>
    </>
  );
}

export default Analyze;
