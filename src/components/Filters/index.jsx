import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FiltersContainer,
  FieldContainer,
  Label,
  PriceInput,
  StyledSelect,
  SliderWrapper,
  FilterButton,
  ModalWrapper,
  ModalContent,
  CloseButton,
} from "./styles";

const Filters = ({ filters, onFilterChange, filterOptions }) => {
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 20000000]);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPriceRange([0, 20000000]);
    setTempPriceRange([0, 20000000]);
    onFilterChange({
      ...filters,
      precoMinimo: 0,
      precoMaximo: 20000000,
      ordenacaoVenda: "",
      ordenacaoLocacao: "",
      ordenacaoOutros: "",
    });
  }, []);

  const formatToReais = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    });
  };

  const handleRangeChange = (range) => {
    setPriceRange(range);
    setTempPriceRange(range);
    onFilterChange({
      ...filters,
      precoMinimo: range[0],
      precoMaximo: range[1],
    });
  };

  const handleTempInputChange = (index, value) => {
    const updatedTempRange = [...tempPriceRange];
    updatedTempRange[index] = value === "" ? "" : Number(value);
    setTempPriceRange(updatedTempRange);
  };

  const applyInputChange = (index) => {
    const updatedRange = [...tempPriceRange];
    if (updatedRange[0] === "" || updatedRange[1] === "") {
      updatedRange[0] = priceRange[0];
      updatedRange[1] = priceRange[1];
    }

    updatedRange[0] = Math.max(0, Math.min(20000000, updatedRange[0]));
    updatedRange[1] = Math.max(0, Math.min(20000000, updatedRange[1]));

    if (updatedRange[0] > updatedRange[1]) {
      if (index === 0) updatedRange[1] = updatedRange[0];
      if (index === 1) updatedRange[0] = updatedRange[1];
    }

    setPriceRange(updatedRange);
    setTempPriceRange(updatedRange);
    onFilterChange({
      ...filters,
      precoMinimo: updatedRange[0],
      precoMaximo: updatedRange[1],
    });
  };

  const handleSortChange = (e, type) => {
    const key = `ordenacao${type}`;
    onFilterChange({
      ...filters,
      [key]: e.target.value,
    });
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  const renderFilters = () => (
    <FiltersContainer>
      <FieldContainer>
        <Label>Preço (R$)</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <PriceInput
            type="text"
            value={formatToReais(tempPriceRange[0])}
            onChange={(e) =>
              setTempPriceRange([
                e.target.value.replace(/[^\d]/g, ""),
                tempPriceRange[1],
              ])
            }
          />
          <span style={{ fontWeight: "bold", color: "#333" }}>até</span>
          <PriceInput
            type="text"
            value={formatToReais(tempPriceRange[1])}
            onChange={(e) =>
              setTempPriceRange([
                tempPriceRange[0],
                e.target.value.replace(/[^\d]/g, ""),
              ])
            }
          />
        </div>
        <SliderWrapper>
          <Slider
            range
            min={0}
            max={20000000}
            step={10000}
            value={priceRange}
            onChange={(range) => setPriceRange(range)}
          />
        </SliderWrapper>
      </FieldContainer>

      {filterOptions.map(({ id, label, key, options }) => (
        <FieldContainer key={id}>
          <Label>{label}</Label>
          <StyledSelect
            value={filters[key] || ""}
            onChange={(e) => onFilterChange({ ...filters, [key]: e.target.value })}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </StyledSelect>
        </FieldContainer>
      ))}
    </FiltersContainer>
  );

  return (
    <>
      {isMobile ? (
        <>
          <FilterButton onClick={toggleModal}>Filtros</FilterButton>
          {isModalOpen && (
            <ModalWrapper>
              <ModalContent>
                <CloseButton onClick={toggleModal}>×</CloseButton>
                {renderFilters()}
              </ModalContent>
            </ModalWrapper>
          )}
        </>
      ) : (
        renderFilters()
      )}
    </>
  );
};

export default Filters;