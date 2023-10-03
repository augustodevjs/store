import styled, { css } from 'styled-components';

type Props = {
  transparent: boolean;
  variant?: string;
  disabled?: boolean;
};

export const Button = styled.button<Props>`
  width: 100%;
  padding: 0.75rem 1.75rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #047453;
      cursor: not-allowed;

      &:hover {
        background-color: none;
      }
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      background-color: #02966a;
      cursor: pointer;
      transition: filter 0.3s linear;

      &:hover {
        filter: brightness(1.2);
      }
    `}

  ${({ transparent }) =>
    transparent &&
    css`
      background-color: transparent;
      border: 1px solid #02966a;
      transition: background-color 0.3s linear;

      &:hover {
        background-color: #02966a;
      }
    `}

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
            background-color: #02966a
          `;
      case 'danger':
        return `
          background-color: #F75A68
          `;
    }
  }}
`;
