import PropTypes from 'prop-types';

import * as S from './List.styled';

function List({ children, ...props }) {
  return <S.List {...props}>{children}</S.List>;
}

List.propTypes = { children: PropTypes.element };

export default List;
