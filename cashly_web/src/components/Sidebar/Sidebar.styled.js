import styled from 'styled-components';

const Nav = styled.nav`
  max-width: ${({ isExpanded }) => (isExpanded ? '256px' : '80px')};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 2px solid ${({ theme }) => theme.colors.gray400};
  transition-duration: 0.5s;

  .header {
    justify-content: ${({ isExpanded }) =>
      isExpanded ? 'space-between' : 'center'};
  }

  .appName {
    display: ${({ isExpanded }) => (isExpanded ? 'inherit' : 'none')};
  }

  .leftExpandBtn {
    display: ${({ isExpanded }) => (isExpanded ? 'inherit' : 'none')};
  }

  .rightExpandBtn {
    display: ${({ isExpanded }) => (isExpanded ? 'none' : 'inherit')};
  }

  .navLinkBtn {
    display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
  }

  .navLinkIconBtn {
    display: ${({ isExpanded }) => (isExpanded ? 'none' : 'flex')};
  }

  .menu {
    align-items: ${({ isExpanded }) => (isExpanded ? 'inherit' : 'center')};
  }

  .currentUserDetails {
    row-gap: 16px;
    flex-direction: ${({ isExpanded }) => (isExpanded ? 'row' : 'column')};
  }

  .currentUserEmail {
    display: ${({ isExpanded }) => (isExpanded ? 'unset' : 'none')};
  }
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
`;

const Menu = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 8px;
  list-style: none;
  padding: 32px 16px 32px 16px;
`;

const MenuItem = styled.li``;

const Separator = styled.span`
  height: 2px;
  width: 100%;
  display: block;
  background-color: ${({ theme }) => theme.colors.gray400};
`;

export { Nav, Header, Menu, MenuItem, Separator };
