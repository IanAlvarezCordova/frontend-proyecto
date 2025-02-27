// src/components/productos/CategorySelector.tsx
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { getCategorias } from "../../services/categoria.service";
import { Categoria } from "../../types/types";
import { Select } from "@chakra-ui/select";

interface CategorySelectorProps {
  selectedCategoryId: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategoryId, onCategoryChange }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las categorías.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchCategorias();
  }, []);

  return (
    <Box>
      <Text fontWeight="bold" mb={2}>Seleccionar Categoría</Text>
      <Select
        placeholder="Selecciona una categoría"
        value={selectedCategoryId || ""}
        onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
      >
        {categorias.map((cat) => (
          <option key={cat.id_categoria} value={cat.id_categoria}>
            {cat.nombre}
          </option>
        ))}
      </Select>
    </Box>
  );
};