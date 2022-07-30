import styled, { css } from 'styled-components'

const baseFormElementStyle = css`
    width: '100%';
    max-width: 320px;
    padding: 15px;
    font-size: 20px;
    border-radius: 10px;
`

export const Input = styled.input`
    ${baseFormElementStyle}
`

export const ErrorSpan = styled.span`
    ${baseFormElementStyle}
    margin-top: 20px;
`

export const SubmitButton = styled.button`
    ${baseFormElementStyle}
    margin-top: 20px;
`