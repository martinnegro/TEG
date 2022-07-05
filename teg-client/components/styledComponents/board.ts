import styled from 'styled-components';


interface ArmiesCountryContainerProps {
    top: string,
    left: string,
    canAttack?: boolean,
    selected?: boolean,
    canBeAttacked?: boolean,
}
export const ArmiesCountryContainer = styled.div<ArmiesCountryContainerProps>`
    position: absolute;
    top: ${({ top }) => top };
    left: ${({ left }) => left };

    display: flex;
    align-items: center;
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
    ${({ canBeAttacked }) => canBeAttacked && `
        transform: scale(1.5);
        cursor: pointer;
    `}
    ${({selected}) => selected && 'transform: scale(1.5);'}
`

interface ArmiesChipInterface {
    bgColor: string
}
export const ArmiesChip = styled.div<ArmiesChipInterface>`
    height: 25px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ bgColor }) => bgColor};
`
export const QtyArmiesButton = styled.button`
    border: none;
    height: 20px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    border-radius: 50%;
    background-color: grey;
`