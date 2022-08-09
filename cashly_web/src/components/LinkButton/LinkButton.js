import PropTypes from "prop-types";
import * as S from "./LinkButton.styles";
import { Button } from "@/components";

function LinkButton({ to, children, ...props }) {
  return (
    <S.Link to={to}>
      <Button {...props}>{children}</Button>
    </S.Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LinkButton;
