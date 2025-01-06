import React, { useState } from "react";
import {
  Container,
  Section,
  SectionTitle,
  LinkList,
  SocialMedia,
  FooterBar,
  WhatsAppButtonRedondo,
  RedLine,
  QRButton,
  QRModal,
  QRCodeContainer,
  QRCodeImage,
} from "./styles";
import {
  FaFacebookSquare,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaQrcode,
} from "react-icons/fa";
import QRCode from "../../assets/QrCodeMarisaWeber.jpeg";
import { useNavigate } from "react-router-dom";

const Footer = ({ id }) => {
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const toggleQR = () => {
    setShowQR((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <>
      <RedLine />
      <Container id="footer">
        <Section>
          <SectionTitle>Redes Sociais</SectionTitle>
          <SocialMedia>
            <a
              href="https://www.instagram.com/consultoramarisawebber?igsh=MThsY29nYmhqbXgybA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/Marisa.Webber"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5511973738808"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/in/marisa-webber-377980329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </SocialMedia>
          <div className="footer-logo-container">
            <span className="footer-logo-text">ASSOCIADA</span>{" "}
            <img
              src={require("../../assets/LOGOKW_LETREIRO.png")}
              alt="Logo no footer"
              className="footer-social-logo"
            />
          </div>
        </Section>

        <Section>
          <SectionTitle>Contatos</SectionTitle>
          <LinkList>
            <span onClick={() => scrollToSection("inicio")}>INÍCIO</span>
            <span onClick={() => scrollToSection("sobre-nos")}>QUEM SOMOS</span>
            <span onClick={() => scrollToSection("servicos")}>SERVIÇOS</span>
            <span onClick={() => navigate("/imoveis")}>IMÓVEIS</span>
          </LinkList>
        </Section>

        <Section>
          <LinkList>
            <span className="phone-number">11 97373-8808</span>
            <a href="mailto:marisawebbersp@gmail.com">
              marisawebbersp@gmail.com
            </a>
            <QRButton onClick={toggleQR}>
              <FaQrcode size={20} />
              Ver QR Code
            </QRButton>
          </LinkList>
        </Section>
      </Container>

      <WhatsAppButtonRedondo
        href="https://api.whatsapp.com/send?phone=5511973738808"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={30} />
      </WhatsAppButtonRedondo>

      <FooterBar>
        <span>2024 - Criado e desenvolvido por Inovação Marketing</span>
      </FooterBar>

      {showQR && (
        <QRModal onClick={toggleQR}>
          <QRCodeContainer onClick={(e) => e.stopPropagation()}>
            <h3>Contato via QR Code</h3>
            <QRCodeImage src={QRCode} alt="QR Code para redes sociais" />



            {/* Alteração de Código do Vini aqui */}
            <div>
              <button 
                onClick={() => window.open("https://beacons.ai/marisawebber", "_blank", "noopener,noreferrer")}
              >
                Acesse agora
              </button>
            </div>

            {/* Alteração de Código do Vini aqui */}

            
                
            <button onClick={toggleQR}>Fechar</button>
          </QRCodeContainer>
        </QRModal>
      )}
    </>
  );
};

export default Footer;
