import styled from 'styled-components';


export const ArmiesCountryContainer = styled.div`
    position: absolute;
    top: ${({ top }) => top };
    left: ${({ left }) => left };

    display: flex;
    gap: 2px;

    ${({ canAttack, selected }) => canAttack &&
        `
        transition: transform 50ms;
        cursor: pointer;
        &:hover {
             transform: scale(1.5);
            
        }
        ${ selected && 
        `
            transform: scale(1.5);
        `}
        `
    }
    ${({selected}) => selected && 'transform: scale(1.5);'}
`

export const ArmiesChip = styled.div`
    height: 25px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    text-align: center;

    background-color: ${({ bgColor }) => bgColor};
`

export const QtyArmiesButton = styled.button`
    border: none;
    background-color: grey;
`