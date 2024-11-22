import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap; /* Para garantir boa exibição em telas pequenas */
  gap: 8px; /* Adiciona espaço entre os botões */

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const PageButton = styled.button`
  margin: 0;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? "#555" : "#ddd")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#333")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (!disabled ? "#aaa" : "#ddd")};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
  }
`;
