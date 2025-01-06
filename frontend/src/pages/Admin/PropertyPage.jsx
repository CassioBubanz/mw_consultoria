import React, { useState, useEffect } from "react";
import PropertyList from "../Admin/components/PropertyList";
import PropertyForm from "../Admin/components/PropertyForm";
import {
  getImoveis,
  addProperty,
  updateImovel,
  deleteImovel,
} from "../Admin/services/propertyService";
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: var(--red);
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: var(--red);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--black);
`;

function PropertyPage() {
  const [imoveis, setImoveis] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const data = await getImoveis();
      setImoveis(data);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (newProperty) => {
    try {
      await addProperty(newProperty);
      toast.success("Imóvel cadastrado com sucesso!", { autoClose: 8000 });

      setTimeout(() => {
        fetchProperties();
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar imóvel:", error);
      toast.error("Erro ao cadastrar o imóvel. Tente novamente.", {
        autoClose: 10000,
      });
    }
  };

  const handleEdit = async (updatedProperty) => {
    try {
      await updateImovel(selectedProperty.id, updatedProperty);
      fetchProperties();
      setSelectedProperty(null);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao editar imóvel:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImovel(id);
      fetchProperties();
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
    }
  };

  return (
    <Container>
      <Header>Gerenciamento de Imóveis</Header>
      <Button onClick={() => setShowForm(true)}>Adicionar Imóvel</Button>
      {showForm && (
        <PropertyForm
          existingProperty={selectedProperty}
          onSave={(updatedProperty) => {
            selectedProperty
              ? handleEdit(updatedProperty)
              : handleAdd(updatedProperty);
          }}
          onCancel={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
        />
      )}
      {isLoading ? (
        <Message>Carregando imóveis...</Message>
      ) : imoveis.length > 0 ? (
        <PropertyList
          properties={imoveis.map((property) => ({
            ...property,
            vlCondominio: property.vlCondominio || 0,
            vlIptu: property.vlIptu || 0,
            valorVenda: property.valorVenda || 0,
            valorLocacao: property.valorLocacao || 0,
          }))}
          onEdit={(property) => {
            setSelectedProperty(property);
            setShowForm(true);
            
            setTimeout(() => {
              const formElement = document.querySelector("form");
              if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }, 100);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <Message>Nenhum imóvel encontrado.</Message>
      )}
    </Container>
  );
}

export default PropertyPage;
