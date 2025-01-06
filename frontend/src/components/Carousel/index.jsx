import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentDotGroup, setCurrentDotGroup] = useState(0); // Grupo das bolas 🌚
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dotsPerPage = 10; // Número das bolas 🌚

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || images.length === 0) {
    return <FallbackMessage>Nenhuma imagem disponível</FallbackMessage>;
  }

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    autoplay: false,
    lazyLoad: "ondemand",
    beforeChange: (_, next) => {
      setCurrentSlide(next + 1);

      // Atualizar grupo de bolinhas quando atingir um novo conjunto
      const nextGroup = Math.floor(next / dotsPerPage);
      if (nextGroup !== currentDotGroup) {
        setCurrentDotGroup(nextGroup);
      }
    },
  };

  const renderDots = () => {
    const start = currentDotGroup * dotsPerPage;
    const end = Math.min(start + dotsPerPage, images.length);
    const visibleDots = images.slice(start, end);

    return (
      <DotContainer>
        {visibleDots.map((_, index) => {
          const dotIndex = start + index;
          return (
            <Dot
              key={dotIndex}
              active={dotIndex + 1 === currentSlide}
              onClick={() => setCurrentSlide(dotIndex + 1)}
            />
          );
        })}
      </DotContainer>
    );
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {images.map((item, index) => (
          <SlideContainer key={index}>
            {item.type === "video" ? (
              <iframe
                src={item.src}
                title={`Vídeo ${index + 1}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={item.src}
                alt={`Imagem ${index + 1}`}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/800x400?text=Imagem+Indisponível")
                }
              />
            )}
          </SlideContainer>
        ))}
      </Slider>

      {/* Para dispositivos móveis, renderizar o contador */}
      {isMobile && (
        <SlideCounter>
          {currentSlide} / {images.length}
        </SlideCounter>
      )}

      {/* Para desktop, renderizar a navegação com bolinhas */}
      {!isMobile && renderDots()}
    </CarouselWrapper>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]),
    })
  ).isRequired,
};

const CustomArrow = ({ direction, onClick }) => (
  <ArrowButton
    direction={direction}
    onClick={onClick}
    aria-label={direction === "next" ? "Próxima imagem" : "Imagem anterior"}
  >
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 8px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
   background-color: ${(props) => (props.active ? "#9c192b" : "#ccc")};
  border: none;
  cursor: pointer;
`;

const SlideCounter = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "next" ? "right: 15px;" : "left: 15px;")}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 2;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: var(--black);
  padding: 20px;
`;

export default Carousel;
