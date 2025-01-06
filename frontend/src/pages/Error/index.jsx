import React from "react";
import { Container, ErrorCode, ErrorMessage, BackButton } from "./styles";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Página não encontrada</ErrorMessage>
      <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>
      <BackButton onClick={() => navigate("/")}>Voltar para a Página Inicial</BackButton>
    </Container>
  );
};

export default Error;
