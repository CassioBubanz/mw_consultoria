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
} from "./styles";

const Filters = ({ filters, onFilterChange, filterOptions }) => {
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [tempPriceRange, setTempPriceRange] = useState([0, Infinity]);
  const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false); // Controle do foco

  useEffect(() => {
    setPriceRange([0, Infinity]);
    setTempPriceRange([0, Infinity]);
    onFilterChange({
      ...filters,
      precoMinimo: 0,
      precoMaximo: Infinity,
      ordenacaoVenda: "",
      ordenacaoLocacao: "",
      ordenacaoOutros: "",
    });
  }, []);

  const formatToReais = (value) => {
    if (value === Infinity) return "R$ ∞"; // Exibe "R$ ∞" quando o valor é infinito
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
      precoMaximo: range[1] === Infinity ? undefined : range[1],
    });
  };

  const handleTempInputChange = (index, value) => {
    const updatedTempRange = [...tempPriceRange];
    updatedTempRange[index] = value === "" ? "" : Number(value);
    if (updatedTempRange[index] === Infinity) updatedTempRange[index] = "";
    setTempPriceRange(updatedTempRange);
  };

  const applyInputChange = (index) => {
    const updatedRange = [...tempPriceRange];
    if (updatedRange[0] === "" || updatedRange[1] === "") {
      updatedRange[0] = priceRange[0];
      updatedRange[1] = priceRange[1];
    }

    updatedRange[0] = Math.max(0, updatedRange[0]);
    updatedRange[1] = updatedRange[1] === "" ? Infinity : updatedRange[1];
    updatedRange[1] = Math.max(updatedRange[0], updatedRange[1]);

    setPriceRange(updatedRange);
    setTempPriceRange(updatedRange);
    onFilterChange({
      ...filters,
      precoMinimo: updatedRange[0],
      precoMaximo: updatedRange[1] === Infinity ? undefined : updatedRange[1],
    });
  };

  const handleSortChange = (e, type) => {
    const key = `ordenacao${type}`;
    onFilterChange({
      ...filters,
      [key]: e.target.value,
    });
  };

  const handleMaxPriceFocus = () => {
    setIsMaxPriceFocused(true);
    if (tempPriceRange[1] === "") {
      setTempPriceRange([tempPriceRange[0], 1000000000]); // Preenche com 1 bilhão quando clicar
    }
  };

  const handleMaxPriceBlur = () => {
    if (tempPriceRange[1] === 1000000000) {
      setTempPriceRange([tempPriceRange[0], ""]); // Deixa vazio se o usuário sair
    }
    setIsMaxPriceFocused(false);
    applyInputChange(1); // Aplica a alteração
  };

  return (
    <FiltersContainer>
      {/* Filtro de Preço */}
      <FieldContainer>
        <Label>Preço (R$)</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <PriceInput
            type="text"
            value={formatToReais(tempPriceRange[0])}
            onChange={(e) =>
              handleTempInputChange(0, e.target.value.replace(/[^\d]/g, ""))
            }
            onBlur={() => applyInputChange(0)}
            onKeyDown={(e) => e.key === "Enter" && applyInputChange(0)}
          />
          <span style={{ fontWeight: "bold", color: "#333" }}>até</span>
          <PriceInput
            type="text"
            value={formatToReais(tempPriceRange[1])}
            onChange={(e) =>
              handleTempInputChange(1, e.target.value.replace(/[^\d]/g, ""))
            }
            onFocus={handleMaxPriceFocus} // Quando clicar, mostra 1 bilhão
            onBlur={handleMaxPriceBlur}  // Deixa vazio se sair sem alterar
            onKeyDown={(e) => e.key === "Enter" && applyInputChange(1)}
          />
        </div>
        <SliderWrapper>
          <Slider
            range
            min={0}
            max={1000000000} // Ajuste para 1 bilhão
            step={10000}
            value={priceRange}
            onChange={handleRangeChange}
            trackStyle={{ backgroundColor: "var(--red)", height: 8 }}
            handleStyle={{
              borderColor: "var(--red)",
              backgroundColor: "#fff",
              height: 20,
              width: 20,
              marginTop: -6,
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
            railStyle={{ backgroundColor: "#ddd", height: 8 }}
          />
        </SliderWrapper>
      </FieldContainer>

      {/* Filtro de Ordenação */}
      <FieldContainer>
        <Label>Ordenar por Venda</Label>
        <StyledSelect
          value={filters.ordenacaoVenda || ""}
          onChange={(e) => handleSortChange(e, "Venda")}
        >
          <option value="">Selecione</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </StyledSelect>
      </FieldContainer>

      {/* Filtro de Ordenação por Locação */}
      <FieldContainer>
        <Label>Ordenar por Locação</Label>
        <StyledSelect
          value={filters.ordenacaoLocacao || ""}
          onChange={(e) => handleSortChange(e, "Locacao")}
        >
          <option value="">Selecione</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </StyledSelect>
      </FieldContainer>

      {/* Filtro de Ordenação por Condomínio */}
      <FieldContainer>
        <Label>Ordenar por Condomínio</Label>
        <StyledSelect
          value={filters.ordenacaoOutros || ""}
          onChange={(e) => handleSortChange(e, "Outros")}
        >
          <option value="">Selecione</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </StyledSelect>
      </FieldContainer>

      {/* Outros filtros */}
      {filterOptions.map(({ id, label, key, options }) => (
        <FieldContainer key={id}>
          <Label htmlFor={id}>{label}</Label>
          <StyledSelect
            id={id}
            value={filters[key] || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, [key]: e.target.value })
            }
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
};

export default Filters;
