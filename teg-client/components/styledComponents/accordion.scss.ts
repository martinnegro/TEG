import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 5px;
    width: 100%;
    

    &:nth-child(n) {
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        flex-direction: column;
    }

`

export const StyledSubmitButton = styled.button`
    width: 100%;
`
export const StyledLabel = styled.label`
    width: 100%;
    color:#231f20;
`

export const StyledInput = styled.input`
    width: 100%;
`

export const ColorSelectContainer = styled.div`
    height: calc(1.5em + .5rem + 2px);
    width: 100%;
    display: flex;
    justify-content: center;
`