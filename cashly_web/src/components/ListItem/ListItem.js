import PropTypes from "prop-types";
import * as S from "./ListItem.styles";

function ListItem({ children, ...props }) {
  return <S.ListItem {...props}>{children}</S.ListItem>;
}

ListItem.propTypes = { children: PropTypes.node };

export default ListItem;
