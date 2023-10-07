import styled from "styled-components"

export const Container = styled.li`
  div {
    .name {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }

    .email, .cpf {
      color: #b4b4bd;
      font-size: 1rem;
    }
    
    .cpf {
      margin-bottom: 0.1rem;
    }
  }
`;

export const IconGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  svg {
      fill: #F75A68;
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
    cursor: pointer;
  }
`
