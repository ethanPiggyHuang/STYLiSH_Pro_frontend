import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 65px 0 49px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

function Analyze() {
  //if (!product) return null;

  return <Wrapper>Analyze</Wrapper>;
}

export default Analyze;
