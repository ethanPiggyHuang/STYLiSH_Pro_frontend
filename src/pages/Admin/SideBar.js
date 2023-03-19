import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200px;
  height: 500px;
  margin: 0 0;
  background-color: #313538;
  color: #f5f5f5;
  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

function SideBar() {
  return <Wrapper>S</Wrapper>;
}

export default SideBar;
