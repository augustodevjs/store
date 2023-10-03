import styled from 'styled-components';

export const Container = styled.div`
  background-color: #29292e;
  width: 100%;
  padding: 1.25rem;
  border-radius: 4px;

  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #ab222e;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #7c7c8a;
  }
`;

export const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;

  svg {
    cursor: pointer;
  }
`;

export const Text = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: bold;
  }

  p {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #c4c4cc;
  }
`;

export const Group = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const Content = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  font-size: 0.75rem;
`;
