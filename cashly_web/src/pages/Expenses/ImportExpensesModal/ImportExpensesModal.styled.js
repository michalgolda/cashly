import styled from 'styled-components';

import { Modal as BaseModal } from '@/components';

const Modal = styled(BaseModal)`
  text-align: center;
`;

const TextContainer = styled.div`
  margin: 16px 0 32px 0;
`;

const Form = styled.form`
  display: grid;
  row-gap: 1rem;
  margin-top: 16px;
`;

export { Modal, TextContainer, Form };
