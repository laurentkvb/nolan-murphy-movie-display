import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray overlay */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 80%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;
