import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 5px;
    
    &:nth-child(n) {
        flex-basis: 1;
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
`

export const StyledInput = styled.input`
    width: 100%;
`