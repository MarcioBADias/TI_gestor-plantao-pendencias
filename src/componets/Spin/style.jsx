import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const SpinningImage = styled.img`
  width: 80px;
  height: 80px;
  animation: ${rotate} 1s linear infinite;
`;
