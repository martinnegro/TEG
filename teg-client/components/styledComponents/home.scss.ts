import styled from 'styled-components';

interface MainStyledProps {
    home?: boolean
}
export const MainStyled = styled.main<MainStyledProps>`
    width: 100vw;
    min-height: ${({ home }) => home ? '100vh' : 'calc(100vh - 50px)'};

    background-color: #231f20;
    color: #c2c2c2;

    padding-top: 50px;
`

export const HomeTitle = styled.h1`
    font-family: 'Tiro Tamil', serif;
    width: max-content;
    margin-inline: auto;
    margin-block: 10px;
`

export const ProvidersContainer = styled.div`
    width: max-content;
    margin-inline: auto;
    margin-block: 10px;
`