import styled from 'styled-components';

type Props = {
  variant: string;
};

export const ButtonWrapper = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid transparent;
  background-color: #323238;
  color: ${(props) => (props.variant === 'edit' ? '#FFC10E' : '#dc3545')};
  border-radius: 4px;
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`;
