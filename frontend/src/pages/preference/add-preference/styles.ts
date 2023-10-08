import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;

export const Tasks = styled.main`
  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    li {
      display: flex;
      padding: 1.5rem;
      border-radius: 0.25rem;
      align-items: center;
      gap: 2rem;
      justify-content: space-between;
      background: #29292E;

      div {
        p {
          font-size: 1.3rem;
          font-weight: bold;
        }
      }
    }
  }
`

export const Search = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;

  .filter {
    display: flex;
    gap: 1rem;
  }

  button {
    width: 100px;
  }
`;

export const NoData = styled.div`
  background-color: #29292e;
  padding: 1.5rem;
  text-align: center;
  color: #e1e1e6;
  width: 100%;
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media(max-width: 550px) {
    margin-top: 1rem;
  }

  button {
    padding: 0.9rem 1.75rem;
    width: max-content;
  }
`;

export const SaveButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-top: 1rem;

  button {
    width: 150px;
  }

  button:first-child {
    background-color: #F75A68;
  }
`;

export const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
