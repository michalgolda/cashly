import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Greeting = styled.h1`
    font-size: 5rem;
    font-weight: 500;
`;

function App() {
    return (
        <Container>
            <Greeting>Hello, World!</Greeting>
        </Container>
    ); 
}

export default App;
