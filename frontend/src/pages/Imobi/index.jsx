import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Description,
  Thumb,
  Price,
  Details,
  Location,
  Card,
} from "./styles";

const Imobi = ({ imovel }) => {
  if (!imovel) {
    return <p>Carregando informações do imóvel...</p>;
  }

  const {
    titulo,
    localizacao,
    preco = 0,
    metrosQuadrados = 0,
    quartos = 0,
    suites = 0,
    banheiros = 0,
    vagas = 0,
    descricao,
    imagens,
  } = imovel;

  const imageUrl =
    imagens && imagens.length > 0
      ? imagens[0]
      : "https://via.placeholder.com/600x400?text=Sem+Imagem";

  return (
    <Container>
      <Card>
        <Thumb>
          <img src={imageUrl} alt={titulo || "Imagem do imóvel"} />
        </Thumb>
        <Description>
          <Location>{localizacao || "Localização não disponível"}</Location>
          <Price>
            {preco > 0
              ? preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Preço não disponível"}
          </Price>
          <Details>
            <div>{metrosQuadrados > 0 ? `${metrosQuadrados} m²` : "N/A"}</div>
            <div>{quartos > 0 ? `${quartos} quartos` : "N/A"}</div>
            <div>{suites > 0 ? `${suites} suíte(s)` : "N/A"}</div>
            <div>{banheiros > 0 ? `${banheiros} banheiros` : "N/A"}</div>
            <div>{vagas > 0 ? `${vagas} vaga(s)` : "N/A"}</div>
          </Details>
          {descricao ? (
            descricao.split("\n").map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))
          ) : (
            <p>Descrição não disponível.</p>
          )}
        </Description>
      </Card>
    </Container>
  );
};

Imobi.propTypes = {
  imovel: PropTypes.shape({
    titulo: PropTypes.string,
    localizacao: PropTypes.string,
    preco: PropTypes.number,
    metrosQuadrados: PropTypes.number,
    quartos: PropTypes.number,
    suites: PropTypes.number,
    banheiros: PropTypes.number,
    vagas: PropTypes.number,
    descricao: PropTypes.string,
    imagens: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Imobi;
