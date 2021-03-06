import React from 'react';
import styled from 'styled-components';

interface PlayerRowProps {
    userActionRequired: boolean
}

export const PlayerRow = styled.div<PlayerRowProps>`
    display: flex;
    align-items: center;
    gap: 5px;
    padding-left: 5px;
    padding-block: 5px;
    color: #231f20;
    transition: all 500ms;
    
    ${({ userActionRequired }) => userActionRequired &&`
    background-color: #c2c2c2;
    opacity: 0.8; 
    p {
        color: #231f20;
    }
    `};  
`;

export const PanelText = styled.p`
    margin: 0
`