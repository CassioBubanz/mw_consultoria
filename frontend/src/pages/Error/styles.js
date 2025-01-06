import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--white);
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ErrorCode = styled.h1`
  font-size: 8rem;
  color: var(--red);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

export const ErrorMessage = styled.h2`
  font-size: 2rem;
  color: var(--black);
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: var(--red);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;
