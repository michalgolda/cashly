import PropTypes from "prop-types";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
    text-align: center;
    border-radius: 2px;
    padding: 1.5rem 1rem 1.5rem 1rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.red300};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

function Error({ message }) {
    return <StyledErrorMessage>{message}</StyledErrorMessage>;
}

Error.propTypes = { message: PropTypes.string };

Error.defaultProps = { message: "Wystąpił nieoczekiwany błąd." };

export default Error;