import styled from 'styled-components';
import ReactModal from 'react-modal';

type Props = {
  size: string;
};

export const Modal = styled(ReactModal) <Props>`
  width: 100%;
  background: #202024;
  padding: 1.75rem;
  position: relative;
  border-radius: 0.25rem;
  max-width: 700px;
  margin: 1rem;

  ${(props) => {
    switch (props.size) {
      case 'sm':
        return `max-width: 450px`;
      case 'lg':
        return `max-width: 700px`;
    }
  }}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
    font-size: 2rem;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s linear;
    padding: 0.25rem;
    :hover {
      background-color: #323238;
      border-radius: 50%;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;

  button {
    max-width: 100%;
    width: 100px;
  }
`;
