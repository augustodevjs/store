import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input, textarea {
    transition: box-shadow 0.3s;
    :focus {
      outline: 0;
      box-shadow: 0 0 2px 2px #015F43;
    }
  }

  a {
    text-decoration: none;
    :focus {
      outline: none;
      box-shadow: none;
    }
  }

  body {
    background-color: #202024;
    color: #E1E1E6;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }

  body, input, textarea, button {
    font: 400 1rem;
  }

  ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 14px 14px transparent;
      border: solid 4px transparent;
      border-radius: 0.5rem;
      background: #202024;
    }

    ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 10px #323238;
      border-radius: 6px;
    }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom:0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-sweet-alert-background {
    background: #202024;
  }

  .title-sweet-alert {
    color: #E1E1E6;
  }

  .html-sweet-alert {
    color: #C4C4CC;
  }

  .confirm-button-sweet-alert {
    background: #02966a !important;
    padding: 0.75rem 1.75rem;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    transition: filter 0.3s linear;
    outline: none;

    &:focus {
      box-shadow: none !important;
    }

    &:hover {
      filter: brightness(1.2)
    }
  }
`;