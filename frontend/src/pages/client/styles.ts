import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media(max-width: 550px) {
    text-align: center;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  img {
    width: 6.5rem;
  }

  h1 {
    font-size: 1.75rem;
  }

  p {
    font-size: 1rem;
  }
`;

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

export const Tasks = styled.main`
  ul {
    display: flex;
    flex-direction: column;
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

export const NoData = styled.div`
  background-color: #29292e;
  padding: 1.5rem;
  text-align: center;
  color: #e1e1e6;
  width: 100%;
`