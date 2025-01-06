import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  gap: 2rem;
  max-width: 1200px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #f7f7f7;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 28%;
    margin-right: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const ListingsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    width: 75%;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.2rem;
    font-size: 0.9rem;
  }
`;
