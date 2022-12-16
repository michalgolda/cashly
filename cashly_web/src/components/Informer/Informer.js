import PropTypes from 'prop-types';

import * as S from './Informer.styled';

function Informer({
  text,
  bottomElement,
  illustrationSource,
  illustrationStyles,
  ...props
}) {
  return (
    <S.Container {...props}>
      {illustrationSource && (
        <S.Illustration src={illustrationSource} style={illustrationStyles} />
      )}
      <S.Text>{text}</S.Text>
      {bottomElement && (
        <S.BottomElementWrapper>{bottomElement}</S.BottomElementWrapper>
      )}
    </S.Container>
  );
}

Informer.propTypes = {
  bottomElement: PropTypes.element,
  text: PropTypes.string.isRequired,
  illustrationSource: PropTypes.string,
};

export default Informer;
