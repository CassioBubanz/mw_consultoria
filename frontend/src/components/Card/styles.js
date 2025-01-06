import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  height: auto;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 8px;
  }
`;

export const ImageContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-right: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    border-right: none;
    height: auto;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 8px 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 8px 15px;
    gap: 8px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MainPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--red);
`;

export const SecondaryPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: var(--black);

  p {
    margin: 0;
  }

  strong {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;

    img,
    iframe {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${({ status }) =>
    status === "Disponível"
      ? "rgba(76, 175, 80, 0.2)"
      : status === "Indisponível"
      ? "rgba(244, 67, 54, 0.2)"
      : "rgba(158, 158, 158, 0.2)"};
  color: ${({ status }) =>
    status === "Disponível"
      ? "green"
      : status === "Indisponível"
      ? "red"
      : "gray"};
  font-weight: bold;
  font-size: 0.8rem;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: var(--black);
  text-transform: uppercase;
  border-bottom: 2px solid var(--red);
  padding-bottom: 3px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Address = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--black);

  svg {
    margin-right: 6px;
    color: var(--red);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--black);

  span {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      color: var(--red);
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--red);
  margin-bottom: 5px;

  p {
    margin: 5px;
    font-size: 16px;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    p {
      font-size: 16px;
    }
  }
`;

export const Description = styled.p`
  font-size: 13px;
  color: var(--black);
  line-height: 1.2;
  margin-bottom: 6px;
  height: 3.6em;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 12px;
    height: 2.8em;
  }
`;

export const Button = styled.button`
  background-color: var(--red);
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: var(--dark-red);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
    padding: 6px;
  }
`;
