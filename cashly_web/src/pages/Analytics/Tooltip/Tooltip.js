import styled from "styled-components";

const StyledTooltip = styled.div`
  padding: 15px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledValue = styled.p`
  color: ${({ theme }) => theme.colors.blue400};
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

export default function Tooltip({ label, value }) {
  return (
    <StyledTooltip>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledTooltip>
  );
}
