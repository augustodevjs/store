import styled, { css } from 'styled-components';

type Props = {
  isRequired?: boolean;
  error?: string;
};

export const TextAreaInputForm = styled.div<Props>`
  display: flex;
  flex-direction: column;

  ${({ error }) =>
    !error &&
    css`
      margin-top: 1rem;
      & + & {
        margin-top: 1rem;
      }
    `}


  label {
    margin-bottom: 6px;

    ${(props) => {
    if (props.isRequired) {
      return `
          &:after {
            content: '*';
            color: #F75A68;
            margin-left: 6px;
          }
        `;
    }
  }}
  }

  textarea {
    padding: 1rem;
    background-color: #121214;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    resize: none;

    ::placeholder {
      color: #7c7c8a;
      font-size: 0.9rem;
    }
  }

  span {
    margin-top: 8px;
    font-size: 0.95rem;
    color: #e63343;
  }
`;