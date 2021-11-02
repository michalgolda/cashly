import styled from "styled-components";

const StyledCategoryListItem = styled.div`
    height: 40px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.gray300};
`;

export default function CategoryListItemLoader() {
    const elements = [];

    for (let i = 0; i < 3; i++)
        elements.push(<StyledCategoryListItem key={i}/>);
    
    return elements;
}