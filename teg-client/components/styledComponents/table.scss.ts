import styled from 'styled-components';


interface ThProps {
    light?: boolean,
    center?: boolean
}
export const StyledTh = styled.th<ThProps>`
    ${({ light }) => light && 'color: #c2c2c2' };
`
export const StyledTd = styled.td<ThProps>`
    ${({ light }) => light && 'color: #c2c2c2' };
    display: flex;
    ${({ center }) => center && `
        justify-content: center;
    `};
`
export const ResponsiveTh = styled(StyledTh)`   
    @media (max-width: 600px) {
        display: none
    }
`
export const ResponsiveTd = styled(StyledTd)`
    @media (max-width: 600px) {
        display: none
    }
`