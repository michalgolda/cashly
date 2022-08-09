import styled from "styled-components";
import { Modal as BaseModal, Input as BaseInput } from "@/components";

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

const ColorInput = styled(BaseInput)`
  padding: 0;
  height: 40px;

  &::-webkit-color-swatch {
    border: none;
  }
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
`;

export { Modal, TextContainer, Form, ColorInput };
