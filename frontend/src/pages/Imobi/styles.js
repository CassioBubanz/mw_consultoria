import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column; /* Alterado para coluna */
    align-items: center; /* Alinha os itens no centro */
    justify-content: center; /* Alinha os itens no centro */
    padding: 20px;
    padding-bottom: 50px;
    margin: 0 auto; /* Centraliza o container horizontalmente */
    max-width: 1150px; /* Define uma largura máxima para o container */
    width: 100%; /* Faz com que o container ocupe 100% da largura disponível até o máximo definido */
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1100px;
    padding: 20px;
    margin: 0 auto;
    color: var(--black);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;

    /* Garante que os elementos se ajustem dinamicamente */
    > * {
        flex: 0 0 auto;
    }
`;

export const Thumb = styled.div`
    width: 100%;
    max-height: 400px; /* Define uma altura máxima para o container da imagem */
    overflow: hidden; /* Esconde qualquer parte que ultrapasse o container */

    img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* Garante que a imagem seja exibida inteira */
        display: block;
    }
`;

export const Description = styled.div`
    font-size: 1.5rem;
    line-height: 1.8;
    margin-top: 20px; /* Espaço entre a imagem e a descrição */
`;

export const Location = styled.div`
    font-size: 1.2rem;
    color: var(--black); /* Cor para a localização */
    margin-bottom: 10px; /* Espaço abaixo da localização */
`;

export const Price = styled.h2`
    font-size: 2.5rem; /* Tamanho do valor em destaque */
    color: var(--red); /* Pode ser outra cor que você queira para o preço */
    margin: 10px 0; /* Margem em cima e embaixo */
`;

export const Details = styled.div`
    margin: 15px 0; /* Margem em cima e embaixo */
    display: flex;
    flex-direction: row; /* Torna os itens em linha */
    gap: 10px; /* Adiciona um espaçamento entre cada item */
`;

export const Info = styled.div`
    font-size: 1.2rem; /* Tamanho do texto de detalhes */
    margin-bottom: 5px; /* Espaço entre as informações */
`;

export const Right = styled.div`
    width: 40%; /* Mantém a largura do lado direito */
    padding: 20px;
    color: var(--black);
    z-index: 2;
`;
