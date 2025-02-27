// src/components/inventarios/InventoryForm.tsx
import { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { createInventario } from "../../services/inventario.service";
import { getEmpresas } from "../../services/empresa.service";
import { Inventario, Empresa } from "../../types/types";

interface InventoryFormProps {
  onSuccess: () => void;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Inventario>>({});
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const data = await getEmpresas();
      setEmpresas(data);
    };
    fetchEmpresas();
  }, []);

  const onSubmit = async (data: Partial<Inventario>) => {
    try {
      await createInventario(data);
      onSuccess();
    } catch (error) {
      console.error("Error al crear inventario:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.id_empresa}>
          <FormLabel>Empresa</FormLabel>
          <Select {...register("id_empresa", { required: "Empresa es obligatoria" })}>
            <option value="">Selecciona una empresa</option>
            {empresas.map((emp) => (
              <option key={emp.id_empresa} value={emp.id_empresa}>
                {emp.nombre}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.id_empresa?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Crear Inventario
        </Button>
      </VStack>
    </Box>
  );
};