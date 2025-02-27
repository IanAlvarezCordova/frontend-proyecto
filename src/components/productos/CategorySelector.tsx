// src/components/productos/CategorySelector.tsx
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/select";
import { getCategorias } from "../../services/categoria.service";
import { Categoria } from "../../types/types";

interface CategorySelectorProps {
  onSelect: (id: number) => void;
  selectedCategoria?: number | null;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect, selectedCategoria }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  return (
    <Select
      placeholder="Selecciona una categoría"
      value={selectedCategoria || ""}
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      {categorias.map((cat) => (
        <option key={cat.id_categoria} value={cat.id_categoria}>
          {cat.nombre}
        </option>
      ))}
    </Select>
  );
};