import styled from 'styled-components';

const Tooltip = styled.div`
  padding: 15px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const Value = styled.p`
  color: ${({ theme }) => theme.colors.blue400};
  font-size: ${({ theme }) => theme.fontSizes.h5};
`;

export { Tooltip, Label, Value };
