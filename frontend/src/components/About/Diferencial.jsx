import React, { useState, useEffect, useRef } from "react";
import { Container, TextContainer, Text, Logo, TransitionLine, LogoTop } from "./DiferencialStyles";
import imagem from "../../assets/Faixa.png";
import logo from "../../assets/MarisaWebberLogo2.png";

const Diferencial = () => {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade
  const containerRef = useRef(null); // Referência ao container

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Define que o elemento está visível
        } else {
          setIsVisible(false); // Reseta o estado quando o elemento sai da tela
        }
      },
      { threshold: 0.5 } // Define que 50% do elemento deve estar visível
    );

    if (containerRef.current) {
      observer.observe(containerRef.current); // Observa o container
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current); // Limpa o observador ao desmontar
      }
    };
  }, []);

  return (
    <Container ref={containerRef} background={imagem}>
      <TextContainer>
        <LogoTop src={logo} alt="Logo da MW Consultoria" />
        <TransitionLine isVisible={isVisible} />
        <Text>
          <p>
            Nosso diferencial está no atendimento único e dedicado. Cada cliente
            tem uma história, e nós temos o compromisso de conhecê-la.
            Entendemos suas necessidades, expectativas e, mais importante, seu
            sonho. Seja compra, venda ou investimento, nós oferecemos uma
            consultoria completa para garantir que cada decisão seja a melhor
            para você.
          </p>
          <p>
            Na MW Consultoria, seu sucesso é a nossa prioridade. Estamos aqui
            para oferecer suporte e transformar o mercado imobiliário em uma
            experiência tranquila e segura. Confie em nós para fazer do seu
            sonho, uma realidade.
          </p>
          <Logo src={logo} alt="Logo da MW Consultoria" />
        </Text>
      </TextContainer>
    </Container>
  );
};

export default Diferencial;
