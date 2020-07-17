import styled from 'styled-components';

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
    padding-top: 64px;
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

export const Background = styled.div`
  
`;