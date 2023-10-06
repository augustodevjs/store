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
    grid-template-columns: 1fr 1fr 1fr;
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
  margin-bottom: 2rem;

  .select__control {
    width: 280px !important;
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