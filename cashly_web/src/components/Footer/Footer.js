import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: auto;
  text-align: center;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.h6};
`;

export default function Footer() {
  return (
    <StyledFooter>
      <span>
        <strong>© 2022 Cashly app</strong> <br /> by Michał Gołda
      </span>
    </StyledFooter>
  );
}
