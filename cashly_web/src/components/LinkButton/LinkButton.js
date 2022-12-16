import PropTypes from 'prop-types';

import { Button } from '@/components';

import * as S from './LinkButton.styled';

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
