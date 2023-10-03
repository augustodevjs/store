import styled, { css } from 'styled-components';

type Props = {
  variant?: string;
  isRequired?: boolean;
  error?: string;
};

export const TextInputForm = styled.div<Props>`
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

    ${({ isRequired }) =>
    isRequired &&
    css`
        &:after {
          content: '*';
          color: #f75a68;
          margin-left: 6px;
        }
      `}

    ${({ isRequired }) => {
    if (isRequired) {
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

  input {
    padding: 1rem;
    background-color: #121214;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;

    ::placeholder {
      color: #7c7c8a;
      font-size: 0.95rem;
    }

    ${(props) => {
    switch (props.variant) {
      case 'gray':
        return `
          background-color: #29292E
        `;
    }
  }}
  }

  span {
    margin-top: 8px;
    font-size: 0.95rem;
    color: #e63343;
  }
`;
