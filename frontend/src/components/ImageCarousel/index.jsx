import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ media, cloudinaryBaseUrl, showDots = true }) => {
  const [currentDot, setCurrentDot] = useState(0);

  if (!media || media.length === 0) {
    return <FallbackMessage>Nenhuma mídia disponível</FallbackMessage>;
  }

  const settings = {
    dots: showDots,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    beforeChange: (_, next) => setCurrentDot(next),
    appendDots: (dots) => {
      if (!showDots) return null;
      const maxVisibleDots = 7;
      const halfVisibleDots = Math.floor(maxVisibleDots / 2);
      const totalDots = dots.length;

      let start = Math.max(0, currentDot - halfVisibleDots);
      let end = Math.min(totalDots, start + maxVisibleDots);

      if (end - start < maxVisibleDots) {
        start = Math.max(0, end - maxVisibleDots);
      }

      const visibleDots = dots.slice(start, end);

      return (
        <DotWrapper>
          <DotScroll currentDot={currentDot}>
            {visibleDots.map((dot, index) => (
              <Dot
                key={index}
                className={dot.props.className}
                isActive={dot.props.className.includes("slick-active")}
              />
            ))}
          </DotScroll>
        </DotWrapper>
      );
    },
  };

  return (
    <CarouselContainer>
      <StyledSlider
        {...settings}
        showDots={showDots}
        role="region"
        aria-label="Carrossel de mídia do imóvel"
      >
        {media.map((item, index) => (
          <SlideContainer key={index}>
            {item.type === "video" ? (
              <iframe
                width="100%"
                height="100%"
                src={item.src.replace("watch?v=", "embed/")}
                title={`Vídeo ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={
                  item.src.startsWith("http")
                    ? item.src
                    : `${cloudinaryBaseUrl}/image/upload/${item.src}`
                }
                alt={`Imagem ${index + 1}`}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/800x400?text=Imagem+Indisponível")
                }
              />
            )}
          </SlideContainer>
        ))}
      </StyledSlider>
    </CarouselContainer>
  );
};

ImageCarousel.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]).isRequired,
    })
  ).isRequired,
  cloudinaryBaseUrl: PropTypes.string.isRequired,
};

const CustomArrow = ({ direction, onClick }) => (
  <ArrowButton
    direction={direction}
    onClick={onClick || (() => {})}
    aria-label={direction === "next" ? "Próxima mídia" : "Mídia anterior"}
  >
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowButton>
);

CustomArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const CarouselContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-arrow {
    border-radius: 8px;
    overflow: hidden;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    content: "";
  }

  .slick-dots {
    display: ${({ showDots }) => (showDots ? "flex" : "none")};
    justify-content: center;
    margin-top: 10px;
    gap: 8px;
  }

    li {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(128, 128, 128, 0.6);
      transition: background-color 0.3s, transform 0.3s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        opacity: 0;
        cursor: pointer;
      }

      &.slick-active {
        background-color: var(--red);
        transform: scale(1.2);
      }
    }
  }
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  width: 120px;
`;

const DotScroll = styled.div`
  display: flex;
  gap: 8px;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentDot }) => {
    const maxVisibleDots = 7;
    const dotWidth = 16;
    const halfVisibleDots = Math.floor(maxVisibleDots / 2);

    const offset =
      currentDot > halfVisibleDots
        ? (currentDot - halfVisibleDots) * dotWidth
        : 0;

    return `translateX(calc(50% - ${offset}px))`;
  }};
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? "var(--red)" : "rgba(128, 128, 128, 0.6)"};
  transition: background-color 0.3s, transform 0.3s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    `
    transform: scale(1.2);
  `}
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "next" ? "right: 15px;" : "left: 15px;")}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 4 / 3;
    border-radius: 8px;
  }

  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    img,
    iframe {
      height: auto;
      max-height: 300px;
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: var(--black);
  text-align: center;
  padding: 20px;
`;

export default ImageCarousel;
