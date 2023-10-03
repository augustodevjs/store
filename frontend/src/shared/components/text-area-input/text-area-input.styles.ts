import styled from 'styled-components';

type Props = {
  isRequired?: boolean;
};

export const TextAreaInputForm = styled.div<Props>`
  display: flex;
  flex-direction: column;

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
    background-color: #29292e;
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
`;