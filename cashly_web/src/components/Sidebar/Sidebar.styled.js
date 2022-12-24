import styled from 'styled-components';

const Nav = styled.nav`
  max-width: 80px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition-duration: 0.5s;
  border-right: 2px solid ${({ theme }) => theme.colors.gray400};
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  justify-content: center;
`;

const Menu = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 8px;
  list-style: none;
  padding: 32px 16px 32px 16px;
  text-align: center;
`;

const MenuItem = styled.li``;

const Separator = styled.span`
  height: 2px;
  width: 100%;
  display: block;
  background-color: ${({ theme }) => theme.colors.gray400};
`;

export { Nav, Header, Menu, MenuItem, Separator };
