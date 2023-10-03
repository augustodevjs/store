import styled from 'styled-components';
import ReactModal from 'react-modal';

type Props = {
  size: string;
};

export const Modal = styled(ReactModal)<Props>`
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
        return `max-width: 500px`;
      case 'lg':
        return `max-width: 700px`;
    }
  }}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;

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
  margin-top: 2rem;

  button {
    width: 100px;

    :last-child {
      width: 120px;
    }
  }
`;

export const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
