import React from "react";
import imagem from "../../assets/MarisaWebberFotoNova.jpg";
import seta from "../../assets/Seta.png";
import Diferencial from "./Diferencial";
import { Arrow, Container, Image, Text } from "./styles";
const About = () => {
  return (
    <div>
      <Container>
        <Image src={imagem} alt="Imagem" />
        <Text>
          <h1>QUEM SOMOS</h1>
          <h3>Transformando Sonhos em Realidade</h3>
          <p>
            Na MW Consultoria, mais do que oferecer serviços imobiliários, somos
            parceiros na realização dos seus sonhos. Com anos de experiência e
            uma abordagem personalizada, nossa missão é conectar você às
            melhores oportunidades no mercado imobiliário, sempre com segurança
            e confiança.
          </p>
        </Text>
        <Arrow src={seta} alt="Seta" />
      </Container>
      <Diferencial />
    </div>
  );
};

export default About;
