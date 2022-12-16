import styled from 'styled-components';

const Wrapper = styled.div`
  top: 0;
  width: 100%;
  z-index: 999;
  height: 100vh;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgb(47, 50, 55, 0.75);
`;

const Modal = styled.div`
  width: 100%;
  height: auto;
  max-width: 512px;
  border-radius: 2px;
  background-color: white;
  margin: -128px 32px 32px 32px;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: right;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const HideButton = styled.span`
  border: none;
  outline: none;
  cursor: pointer;
  display: inherit;
  user-select: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  transition: ${({ theme }) => theme.defaultTransition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }
  &:active {
    color: ${({ theme }) => theme.colors.primary300};
  }
`;

const Body = styled.div`
  padding: 15px;
`;

export { Wrapper, Modal, Header, HideButton, Body };
