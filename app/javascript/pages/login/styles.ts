import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  a {
    padding-top: 32px;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    transition: opacity 0.2s;
    & + a {
      margin-left: 32px;
    }
    &:hover {
      text-decoration: underline #ff872c;
    }
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Background = styled.div`
  
`;