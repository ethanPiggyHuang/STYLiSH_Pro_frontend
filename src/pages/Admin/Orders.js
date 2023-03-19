import styled from 'styled-components/macro';
import SideBar from './SideBar';

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: left;
  min-height: calc(100vh - 255px);

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

function Orders() {
  //if (!product) return null;

  return (
    <Wrapper>
      <SideBar />
      orders
    </Wrapper>
  );
}

export default Orders;
