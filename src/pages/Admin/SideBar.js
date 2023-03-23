import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 200px;
  min-height: calc(100vh - 255px);
  margin: 0 0;

  background-color: #313538;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const PageLinks = styled.div`
  width: 200px;
  position: fixed;
  color: #f5f5f5;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const PageLink = styled.div`
  padding: 20px 20px;
  font-size: 30px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  color: #f5f5f5;

  &:link {
    text-decoration: none;
  }

  &:hover {
    background-color: #666666;
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

function SideBar() {
  return (
    <Wrapper>
      <PageLinks>
        <Link to="../admin/messages">
          <PageLink>訊息管理</PageLink>
        </Link>
        <Link to="../admin/promote">
          <PageLink>促銷設定</PageLink>
        </Link>
        <Link to="../admin/orders">
          <PageLink>訂單管理</PageLink>
        </Link>
        <Link to="../admin/analyze">
          <PageLink>分析報表</PageLink>
        </Link>
      </PageLinks>
    </Wrapper>
  );
}

export default SideBar;
